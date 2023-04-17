// from https://github.com/kumavis/gtor/

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const defer = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

export const makeQueue = () => {
  const ends = defer();
  return {
    put(value) {
      const next = defer();
      const promise = next.promise;
      ends.resolve({ value, promise });
      ends.resolve = next.resolve;
    },
    get() {
      const promise = ends.promise.then(next => next.value);
      ends.promise = ends.promise.then(next => next.promise);
      return promise;
    },
    async * [Symbol.asyncIterator] () {
      while (true) {
        yield await this.get();
      }
    }
  };
};

// new!

export const queueWithCancel = (cancelPromise, baseQueue = makeQueue()) => {
  return {
    put(value) {
      return Promise.race([
        baseQueue.put(value),
        cancelPromise,
      ]);
    },
    get() {
      return Promise.race([
        baseQueue.get(),
        cancelPromise,
      ]);
    },
  }
};

export function makeStore (initialValue) {
  let currentValue = initialValue;
  const subscribers = [];
  return {
    get: () => currentValue,
    put: (newValue) => {
      currentValue = newValue;
      subscribers.forEach(handler => handler(currentValue));
    },
    subscribe (handler) {
      subscribers.push(handler);
      return () => {
        const index = subscribers.indexOf(handler);
        if (index !== -1) {
          subscribers.splice(index, 1);
        }
      };
    },
    subscribeByQueue () {
      const queue = makeQueue();
      const unsub = this.subscribe((value) => {
        queue.put(value);
      });
      queue.put(currentValue);
      return Object.freeze({ queue, unsub });
    },
    [Symbol.asyncIterator] () {
      const { queue } = this.subscribeByQueue();
      return queue[Symbol.asyncIterator]();
    },
  }
}

export function asyncIterWithCancel (asyncIter, cancelPromise) {
  const iterator = asyncIter[Symbol.asyncIterator]();
  return {
    async next() {
      const { value, done } = await Promise.race([
        iterator.next(),
        cancelPromise.then(() => ({ done: true })),
      ]);
      return { value, done };
    },
    async return() {
      await cancelPromise;
      return iterator.return();
    },
    async throw(error) {
      await cancelPromise;
      return iterator.throw(error);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};
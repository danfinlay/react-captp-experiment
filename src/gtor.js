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

export const queue = () => {
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
  };
};

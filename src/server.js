import { makeStore } from './gtor';
import { makeSubscriptionKit, makePublishKit } from '@agoric/notifier';

// Server
// A bootstrap should be an object with only functions on it.
const store = makeStore('Anon');

const serverApi = harden({

  async getNameStore () {
    return store;
  },

  // removing the wrapper object around the queue, bc captp doesnt like it
  // this means we lose the ability to unsubscribe and get a memory leak
  async subscribeByQueue () {
    return store.subscribeByQueue().queue;
  },

  async subscriptionByAgoric () {
    const { publication, subscription } = makeSubscriptionKit();

    publication.updateState(store.get());
    store.subscribe((value) => {
      publication.updateState(value);
    });

    return subscription;
  },

  async subscriberByAgoric () {
    const { publisher, subscriber } = makePublishKit();

    publisher.publish(store.get());
    store.subscribe((value) => {
      publisher.publish(value);
    });

    return subscriber;
  },

});

export { serverApi };

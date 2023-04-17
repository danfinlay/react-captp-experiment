import { makeStore } from './gtor';
import { makeSubscriptionKit } from '@agoric/notifier';

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

  async subscribeByAgoric () {
    const { publication, subscription } = makeSubscriptionKit();

    publication.updateState(store.get());
    store.subscribe((value) => {
      publication.updateState(value);
    });

    return subscription;
  },

});

export { serverApi };

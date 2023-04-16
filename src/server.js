import { makeStore } from './gtor';

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

});

export { serverApi };

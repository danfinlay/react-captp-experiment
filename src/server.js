const { queue, delay } = require('./gtor');

// Server
// A bootstrap should be an object with only functions on it.

const nameQueue = queue();
nameQueue.put('Anon');

const serverApi = harden({
  getName: async () => {
    return nameQueue.get();
  },

  getNameQueue: async () => {
    return nameQueue;
  },

  setName: async (newName) => {
    await delay(200);
    return nameQueue.put(newName);
  },
});

export { serverApi };

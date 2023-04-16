// Server
// A bootstrap should be an object with only functions on it.
let name = 'Anon';
let nextNameUpdate;
let nextNamePromise;
const serverApi = harden({
  getName: async () => {
    console.log('name requested');
    return new Promise((res) => {
      setTimeout(() => res(name), 500);
    });
  },

  // getLatestName is a promise queue
  // Each result returns a promise for the next-updated result.
  // Concept borrowed from GTOR: https://github.com/kriskowal/gtor/
  getLatestName: async () => {
    if (!nextNameUpdate) {
      nextNamePromise = new Promise((res) => {
        nextNameUpdate = res;
      });
    }
    return [name, nextNamePromise];
  },

  setName: async (newName) => {
    name = newName;

    if (nextNameUpdate) {
      const updateFunc = nextNameUpdate;

      nextNamePromise = new Promise((res) => {
        nextNameUpdate = res;
      });

      updateFunc([ newName, nextNamePromise ]);
    }
  },
});

export { serverApi };
import './lockdown';
import makeCapTpFromStream from 'captp-stream';
import './App.css';
import { useState } from 'react';
import NameComponent from './NameComponent';

const makeDuplexPair = require('./duplex-socket');
const pumpify = require('pumpify');

// Assume two duplex streams connected to each other:
const { clientSide, serverSide } = makeDuplexPair();

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

const { captpStream: serverStream }= makeCapTpFromStream('server', serverApi);
pumpify(serverStream, serverSide, serverStream);

// Client
const { getBootstrap, E, captpStream: clientStream } = makeCapTpFromStream('client', harden({}));
pumpify(clientStream, clientSide, clientStream);

function App() {

  const [bootstrap, setBootstrap] = useState(undefined);
  const [error, setError] = useState(undefined);
  getBootstrap()
  .then((bootstrap) => {
    setBootstrap(bootstrap);
  })
  .catch((reason) => {
    setError(reason);
  });

  let body = error || bootstrap ? <NameComponent bootstrap={bootstrap} E={E}/> : 'Loading'
  return (
    <div className="App">
      <h1>CapTP React Test</h1>
      { body }
    </div>
  );
}

export default App;

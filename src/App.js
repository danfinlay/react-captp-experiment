import makeCapTpFromStream from 'captp-stream';
import './App.css';
import { useState } from 'react';
import NameComponent from './NameComponent';

const makeDuplexPair = require('./duplex-socket');
const pumpify = require('pumpify');
console.dir(harden);

// Assume two duplex streams connected to each other:
const { clientSide, serverSide } = makeDuplexPair();

// Server
// A bootstrap should be an object with only functions on it.
let name = 'Anon';
const serverApi = harden({
  getName: async () => name,
  setName: async (newName) => { name = newName },
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

  return (
    <div className="App">
      <h1>CapTP React Test</h1>
      error || bootstrap ?
      <NameComponent value={bootstrap} E={E}/> : 'Loading'
    </div>
  );
}

export default App;

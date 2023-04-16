import './lockdown';
import makeCapTpFromStream from 'captp-stream';
import './App.css';
import { useState } from 'react';
import NameComponent from './NameComponent';
import { serverApi } from './server';

const makeDuplexPair = require('./duplex-socket');
const pumpify = require('pumpify');

// Assume two duplex streams connected to each other:
const { clientSide, serverSide } = makeDuplexPair();

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

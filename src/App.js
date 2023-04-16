import './lockdown';
import makeCapTpFromStream from 'captp-stream';
import './App.css';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    getBootstrap()
    .then((bootstrap) => {
      setBootstrap(bootstrap);
    })
    .catch((reason) => {
      setError(reason);
    });
  }, [])

  return (
    <div className="App">
      <h1>CapTP React Test</h1>
      <Body bootstrap={bootstrap} E={E} error={error}/>
    </div>
  );
}

function Body ({ bootstrap, E, error }) {
  const [showName, setShowName] = useState(true);

  if (error) {
    return (
      <div>
        <p>Failed to load bootstrap</p>
        <p>{error}</p>
      </div>
    )
  }
  if (!bootstrap) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      show name:
      <input type="checkbox" checked={showName} onChange={() => {
        setShowName(!showName);
      }}/>
      {showName ? <NameComponent bootstrap={bootstrap} E={E}/> : null}
    </div>
  )
}

export default App;

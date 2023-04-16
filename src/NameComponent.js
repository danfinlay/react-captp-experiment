import { useState, useEffect } from 'react';

export default function NameComponent (props) {

  const [ name, setNameLocal ] = useState('Loading name...');
  const [ draftName, setDraftName ] = useState(name);

  const { E, bootstrap } = props;

  useEffect(() => {
    const debugId = Math.random();
    console.log(debugId, 'useEffect');
    let canceled = false;
    (async () => {
      // captp does not like the wrapper object over the queue
      // const nameStore = E(await E(bootstrap).getNameStore());
      // const { queue: nameUpdateQueue } = E(await nameStore.subscribeByQueue())
      const nameUpdateQueue = E(await E(bootstrap).subscribeByQueue())
      // this is a memory leak since we are unable to unsubscribe
      while (true) {
        const name = await nameUpdateQueue.get();
        console.log(debugId, 'got name by get', name);
        if (canceled) return;
        setNameLocal(name);
      }
    })();
    return () => {
      console.log(debugId, 'canceling')
      canceled = true;
    }
  }, []);


  return (
    <div>
      <p>{name}</p>
      <input type="text" placeholder={name}
        onChange={(event) => {
          setDraftName(event.target.value);
        }}
      >
      </input>
      <button onClick={async () => {
        const nameStore = E(await E(bootstrap).getNameStore());
        nameStore.put(draftName)
        .then((ret) => {
          console.log('name updated successfully!');
        })
        .catch((reason) => {
          console.error(`name update failed: ${reason}`);
        });
      }}>Change</button>
    </div>
  );

}

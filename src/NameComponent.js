import { useState, useEffect } from 'react';
import { makeSubscriptionKit, observeIteration } from '@agoric/notifier';

export default function NameComponent (props) {

  const [ name, setNameLocal ] = useState('Loading name...');
  const [ draftName, setDraftName ] = useState(name);

  const { E, bootstrap } = props;

  useEffect(() => {
    let cleanupFn;
    (async () => {
      const subscription = await E(bootstrap).subscribeByAgoric();

      const {
        publication: adapterPublication,
        subscription: adapterSubscription
      } = makeSubscriptionKit();
      observeIteration(subscription, adapterPublication)
      .catch((_reason) => {
        // ignore error from writing to finished adapterPublication
      });
      cleanupFn = () => {
        adapterPublication.finish();
      };

      for await (const name of adapterSubscription) {
        setNameLocal(name);
      }
    })();

    return () => {
      if (cleanupFn) {
        cleanupFn();
      }
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

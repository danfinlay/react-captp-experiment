import { useState } from 'react';
import { useAgoricSubscriptionGetter, useAgoricSubscriberGetter } from './util';

export default function NameComponent (props) {
  const { E, bootstrap } = props;

  // const [ name, subError ] = useAgoricSubscriptionGetter(
  //   () => E(bootstrap).subscriptionByAgoric(),
  //   []
  // )
  const [ name, subError ] = useAgoricSubscriberGetter(
    () => E(bootstrap).subscriberByAgoric(),
    []
  )
  const [ draftName, setDraftName ] = useState(name);

  return (
    <div>
      <p>{name}</p>
      <input type="text" placeholder={name}
        onChange={(event) => {
          setDraftName(event.target.value);
        }}
      >
      </input>
      {subError ? <p>failed to subscribe: {subError.message}</p> : null}
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

import { useState } from 'react';

export default function NameComponent (props) {

  const [ name, setNameSync ] = useState('Loading name...');
  const [ draftName, setDraftName ] = useState(name);

  const { E, bootstrap } = props;
  E(bootstrap).getLatestName()
  .then(([name, latestNamePromise]) => {
    console.log('name returned');
    setNameSync(name);
    updateLatestName(latestNamePromise);
  });

  function updateLatestName (latestNamePromise) {
    latestNamePromise.then(([ latestName, nextNamePromise ]) => {
      setNameSync(latestName);
      updateLatestName(nextNamePromise);
    });
  }


  return <div>
    <p>{name}</p>
    <input type="text" placeholder={name}
      onChange={(event) => {
        setDraftName(event.target.value);
      }}
    >
    </input>
    <button onClick={() => {
      E(bootstrap).setName(draftName)
      .then((ret) => {
        console.log('name updated successfully!');
      })
      .catch((reason) => {
        console.error(`name update failed: ${reason}`);
      });
    }}>Change</button>
  </div>;

}

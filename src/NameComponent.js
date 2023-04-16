import { useState, useEffect } from 'react';

export default function NameComponent (props) {

  const [ name, setNameSync ] = useState('Loading name...');
  const [ draftName, setDraftName ] = useState(name);

  const { E, bootstrap } = props;

  useEffect(() => {
    E(bootstrap).getNameQueue()
    .then(async (nameQueue) => {
      while (true) {
        const name = await E(nameQueue).get();
        setNameSync(name);
      }
    });
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
      <button onClick={() => {
        E(bootstrap).setName(draftName)
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

import { useState } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import { Edit_Author, ALL_Authors } from '../queries';
import Notify from './Notify';

const EditAuthor = ({ authors }) => {
  const [editAuthor] = useMutation(Edit_Author, {
    refetchQueries: [{ query: ALL_Authors }],
  }) 

  const [name, setName] = useState()
  const [born, setBorn] = useState()
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
    await editAuthor({
      variables: {name, setBornTo: parseInt(born)},
    });
    }
    catch(error) {
      notify(error.message);  
    }

    setName("");
    setBorn("");
  }


  return (
    <div>
        <Notify errorMessage={errorMessage} />
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authors &&
              authors.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type="submit">edit author</button>
      </form>
    </div>
  )
}

export default EditAuthor
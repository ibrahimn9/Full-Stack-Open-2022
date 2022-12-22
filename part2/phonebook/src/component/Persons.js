import React from "react";
import phoneBook from "../services/phoneBook";

const Person = ({ persons, setPersons, setMessage }) => {
  const handleDelete = (person) => {
    const result = window.confirm(`Do you want to delete ${person.name} ?`);
    if (result) {
      phoneBook
        .deletePhone(person.id)
        .then((res) => {
          setPersons(persons.filter((p) => p !== person))
          setMessage({
            text: `${person.name} has been removed successfully`,
            type: "success",
          });
          setTimeout(() => setMessage(null), 3000);
        })
        .catch((error) => 
          setMessage({
            text: `${person.name} was already removed from the server`,
            type: "error",
        }));
        setTimeout(() => setMessage(null), 3000);
    }
  };
  return (
    <div>
      {persons.map((person) => (
        <p key={`${person.number}`}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Person;

import React from "react";
import { useState, useEffect } from "react";
import Persons from "./component/Persons";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import axios from "axios";
import phoneBook from "./services/phoneBook";
import Notification from "./component/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phoneBook.getAll().then((response) => setPersons(response.data));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currPersons = persons.map((person) => person.name);

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (currPersons.includes(`${newPerson.name}`)) {
      const result = window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with the new number ?`
      );
      if (result) {
        const person = persons.find((p) => p.name === newPerson.name);
        phoneBook
          .update(person, newPerson.number)
          .then((res) =>
            setPersons(
              persons.map((p) =>
                p === person ? { ...p, number: newNumber } : p
              )
            )
          );
        setMessage({
          text: `${newPerson.name}'s has been updated`,
          type: "success",
        });
        setTimeout(() => setMessage(null), 3000);
      }
    } else {
      currPersons.push(`${newPerson.name}`);

      phoneBook
        .add(newPerson)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName("");
          setNewNumber("");
      });
      setMessage({ text: `Added ${newPerson.name}`, type: "success" });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setFilterPersons(
      persons.filter(
        (person) =>
          person.name
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
      )
    );
  };

  const newPersonObject = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} />
      
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={handleSubmit} data={newPersonObject} />

      <h2>Numbers</h2>
      {filter === "" ? (
        <Persons persons={persons} setPersons={setPersons} setMessage={setMessage} />
      ) : (
        <Persons persons={filterPersons} />
      )}
    </div>
  );
};

export default App;

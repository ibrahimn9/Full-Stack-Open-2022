import React from "react";

const PersonForm = ({ onSubmit, data }) => {
  const {name, number, handleNameChange, handleNumberChange} = data;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;

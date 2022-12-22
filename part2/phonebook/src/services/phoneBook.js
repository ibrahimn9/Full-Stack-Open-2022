import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePhone = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (person, newNumber) => {
  const changedNumber = { ...person, number: newNumber };
  return axios.put(`${baseUrl}/${person.id}`, changedNumber);
};

export default {
  getAll,
  add,
  deletePhone,
  update,
};

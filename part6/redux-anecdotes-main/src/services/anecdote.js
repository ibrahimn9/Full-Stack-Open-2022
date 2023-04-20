import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnec = async (anecdote) => {
  const obj = { anecdote, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const vote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

export default { getAll, createAnec, vote };

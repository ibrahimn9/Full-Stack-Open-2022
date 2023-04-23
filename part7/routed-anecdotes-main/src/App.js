import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useMatch } from "react-router-dom";
import { About, Menu, AnecDoteList, CreateNew, Footer, AnecDote, Notification } from './components'
import { useNavigate } from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate('/');
    setNotification("A new anecdote " + anecdote.content + " created!");
    setTimeout(() => setNotification(null), 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecDoteList anecdotes={anecdotes} />}></Route>
        <Route path="/create" element={<CreateNew addNew={addNew} />}></Route>
        <Route path="/anecdotes/:id" element={<AnecDote anecdote={anecdote} />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

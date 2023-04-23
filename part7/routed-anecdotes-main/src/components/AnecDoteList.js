import React from "react";
import { Link } from "react-router-dom";

const AnecDoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <Link to={`/anecdotes/${anecdote.id}`} key={anecdote.id}>
            <li key={anecdote.id}>{anecdote.content}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AnecDoteList;

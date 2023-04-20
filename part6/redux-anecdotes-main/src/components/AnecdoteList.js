import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { useEffect, useState } from "react"
import anecdoteService from "../services/anecdote"

const AnecdoteList = () => {
  const [anecdotes, setAnecdotes] = useState()
  const getAnecDotes = async() => {
    const anec = await anecdoteService.getAll();
    setAnecdotes(anec)
  }

  useEffect(() => {
    getAnecDotes();
  })
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }
  return (
    <div>
        
        {anecdotes.sort((a,b) => b.votes - a.votes) && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
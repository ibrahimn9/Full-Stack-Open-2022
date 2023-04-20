const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: id
  }
}

export const createAnecdote = (content) => {
  return {
    type: "NEW",
    payload: content
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE": {
      const andecote = state.find(andecote => andecote.id === action.payload)
      const changedAndecote = { ...andecote, votes: andecote.votes + 1}
      return state.map(andecote => andecote.id === action.payload ? changedAndecote : andecote)
    }

    case "NEW": {
      const newAnecdote = asObject(action.payload)
      return state.concat(newAnecdote)
    }
    default: return state
  }
}

export default reducer
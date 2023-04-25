import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import {useApolloClient, useQuery, useSubscription} from "@apollo/client";
import {ALL_Books, Book_Added} from "./queries";


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id);

    const dataInStore = client.readQuery({query: ALL_Books});
    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_Books,
        data: {allBooks: dataInStore.allBooks.concat(bookAdded)},
      });
    }
  };


  useSubscription(Book_Added, {
    onSubscriptionData: ({subscriptionData}) => {
      const bookAdded = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${bookAdded.title}`);
      updateCacheWith(bookAdded);
    },
  });

  useEffect(() => {
    if (!token) setToken(localStorage.getItem("fullstack-user-token"));
  }, [token]);


  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} />

      <Recommend show={page === "recommend"} />

    </div>
  )
}

export default App

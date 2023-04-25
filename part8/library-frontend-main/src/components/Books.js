import { gql, useQuery } from "@apollo/client";
import { ALL_Books } from "../queries";
import { useState, useEffect } from "react";
import Genres from "./Genres";
import BookList from "./BookList";

const Books = (props) => {
  const [genres, setGenres] = useState("");
  const [booksByGenre, setBooksByGenre] = useState(books);
  const [genre, setGenre] = useState("");

  const result = useQuery(ALL_Books, {
    onCompleted: (data) => {
      setBooksByGenre(booksByGenre);
    },
  });
  const books = result.data.allBooks;

  useEffect(() => {
    const genres = [];
    books.forEach((book) => {
      if (book.genres) {
        book.genres.forEach((genre) => {
          genres[genre] = genre;
        });
      }
    });
    setGenres(Object.keys(genres));
  }, [books]);

  useEffect(() => {
    const booksByGenre = !genre
      ? books
      : books.filter((book) => book.genres.includes(genre));
    setBooksByGenre(booksByGenre);
  }, [genre, books]);

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>loading ...</div>;

  return (
    <div>
      <Genres genres={genres} setGenre={setGenre} />
      <BookList books={booksByGenre} />
    </div>
  );
};

export default Books;

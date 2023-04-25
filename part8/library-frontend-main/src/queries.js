import { gql, useQuery } from '@apollo/client'

export const ALL_Authors = gql`
 query {
    allAuthors {
        name
        born
        bookCount
    }
 }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
`;

export const ALL_Books = gql`
  query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;


export const ADD_Book = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const Edit_Author = gql`
 mutation editAuthor(
    $name: String!
    $setBornTo: Int!
 ){
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
    }
 }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`

export const Book_Added = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
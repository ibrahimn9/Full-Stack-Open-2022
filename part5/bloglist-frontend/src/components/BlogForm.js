import { useState } from "react";
import blogService from "../services/blogService";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");


  const handleTitleChange = (e) => {
    const title = e.target.value;
    setTitle(title)   
  };

  const handleAuthorChange = (e) => {
    const author = e.target.value;
    setAuthor(author)   
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrl(url)   
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <label>title: </label>
      <input type="text" value={title} onChange={handleTitleChange}/>
      <br />
      <label>author: </label>
      <input type="text" value={author} onChange={handleAuthorChange}/>
      <br />
      <label>url: </label>
      <input type="text" value={url} onChange={handleUrlChange}/>
      <br />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;

import { useState } from "react";
import blogService from "../services/blogService";

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);
  const { id } = JSON.parse(window.localStorage.getItem('loggedUser'))
  const removeAuth = blog.user === id;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeClick = async () => {
    const { data } = await blogService.updateBlog({
      ...updatedBlog,
      likes: updatedBlog.likes + 1,
    });
    setUpdatedBlog(data);
  };


  const handleRemoveClick = async () => {
    const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
    await blogService.deleteBlog(blog.id, {token})
  }

  return (
    <div style={blogStyle}>
      <div>{updatedBlog.title}</div>
      {!showDetail && <button onClick={() => setShowDetail(true)}>view</button>}
      {showDetail && (
        <>
          <div>{updatedBlog.author}</div>
          <div>{updatedBlog.url}</div>
          <label>likes : {updatedBlog.likes}</label>
          <button onClick={handleLikeClick}>like</button>
          <br />
        </>
      )}
      {showDetail && 
          <button onClick={() => setShowDetail(false)}>hide</button>
        }
      {removeAuth && <button onClick={handleRemoveClick}>remove</button> }
    </div>
  );
};

export default Blog;

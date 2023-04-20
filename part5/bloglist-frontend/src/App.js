import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import loginService from "./services/loginService";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({
        text: "logged in successfully",
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: "wrong username or password",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async (blogObj) => {
    try {
      blogRef.current.toggleVisibility();
      const { token } = JSON.parse(window.localStorage.getItem("loggedUser"));
      const { data } = await blogService.createBlog(blogObj, token);
      console.log(data)
      setBlogs(blogs.concat(data));
      setMessage({
        text: `a new blog ${data.title} by ${data.author} added`,
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: "wrong username or password",
        type: "error",
      });
    }
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const verifyToken = async () => {
    const { token } = JSON.parse(window.localStorage.getItem("loggedUser"));
    const {
      data: { username, id },
    } = await loginService.sendToken(token);
    if (username) {
      const user = {
        token,
        id,
        username,
      };
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2> User: {user.username}</h2>
      <button onClick={handleLogout}>logout</button>
      <Notification message={message} />
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createBlog = async (blog, token) => {
  return await axios.post(`${baseUrl}`, blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteBlog = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`)
}

const updateBlog = async (blog) => {
  return await axios.put(`${baseUrl}/${blog.id}`, blog)
}

export default { getAll, createBlog, updateBlog, deleteBlog };

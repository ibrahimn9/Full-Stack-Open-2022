const _ = require('lodash')

const dummy = (blogs) => {
    return Number(blogs + 1);
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)  return {}; 

    return blogs.reduce((favBlog, currBlog) => 
      currBlog.likes > favBlog.likes ? currBlog : favBlog
    )
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {};

    const authorBlogs = _.groupBy(blogs, (blog) => blog.author)
    const nbrOfBlogsByAuthor = _.mapValues(authorBlogs, (e) => e.length)
    const mostBlogs = Object.entries(nbrOfBlogsByAuthor).reduce((max, curr) => 
        curr[1] > max[1] ? curr : max
    )
    return {
        author: mostBlogs[0],
        blogs: mostBlogs[1],
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {};

    const authorBlogs = _.groupBy(blogs, (blog) => blog.author)
    const nbrOfLikesByAuthor = _.mapValues(authorBlogs, totalLikes)
    const mostLikes = Object.entries(nbrOfLikesByAuthor).reduce((max, curr) => 
        curr[1] > max[1] ? curr: max
    )
    return {
        author: mostLikes[0],
        likes: mostLikes[1],
    }
}





module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
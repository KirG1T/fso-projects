import Togglable from './Togglable';
import blogService from '../services/blogs';
import { useState } from 'react';
const blogStyles = {
  display: 'flex',
  padding: '10px',
  border: '1px solid black',
  borderRadius: '5px',
  margin: '10px 0',
};

const Blog = ({ blog, handleRefresh, handleBlogError }) => {
  const [likes, setLikes] = useState(blog.likes || 0);

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: likes + 1, user: blog.user.id };

    const data = await blogService.update(blog.id, updatedBlog);
    setLikes(data.likes);
  };

  const handleRemove = async () => {
    const confirmedResult = window.confirm(`Remove blog "${blog.title}"?`);
    if (confirmedResult) {
      try {
        await blogService.remove(blog.id);
        handleRefresh();
        console.log('removeDD with blog id', blog.id);
      } catch (error) {
        handleBlogError(error.response.data.error);
        setTimeout(() => {
          handleBlogError(null);
        }, 5000);
      }
    }
  };

  return (
    <div className="blog" style={blogStyles}>
      <div data-testid="blogTitle" style={{ marginRight: '10px' }}>
        {blog.title}
      </div>
      <Togglable buttonLabel="view">
        <div className="togglableChildren">
          <p>{blog.url}</p>
          <div style={{ display: 'flex', height: '18px', alignItems: 'center' }}>
            <p data-testid="likeNum">{likes}</p>
            <button onClick={handleLike}>like</button>
          </div>
          <p>{blog.author}</p>
          <button onClick={handleRemove} style={{ backgroundColor: 'red' }}>
            remove
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;

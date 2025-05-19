import { useState } from 'react';
import blogService from '../services/blogs';

const CreateForm = ({ user, handleRefresh, handleBlogError, handleBlogMessage }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    const newBlog = { title, author: user.username, url };

    try {
      const createdBlog = await blogService.create(newBlog);

      handleRefresh();
      handleBlogError(null);
      handleBlogMessage(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`);
      setTitle('');
      setUrl('');

      setTimeout(() => {
        handleBlogMessage(null);
      }, 5000);
    } catch (error) {
      handleBlogMessage('');
      handleBlogError(error.response.data.error);
      setTimeout(() => {
        handleBlogError(null);
      }, 5000);
    }
  };

  return (
    <div style={{ margin: '20px 0 0 0' }}>
      <h2>create new</h2>
      <form onSubmit={handleCreate} id="form">
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input data-testid="url" type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button data-testid="createBtn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateForm;

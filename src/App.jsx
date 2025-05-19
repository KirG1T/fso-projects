import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import LoggedInUser from './components/LoggedInUser';
import CreateForm from './components/CreateForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [blogError, setBlogError] = useState(null);
  const [blogMessage, setBlogMessage] = useState('');
  const [refresh, setRefresh] = useState(0);

  const handleUser = (user) => {
    if (!user) {
      window.localStorage.removeItem('loggedBlogAppUser');
    }
    setUser(user);
  };

  const handleLoginError = (errorMessage) => {
    setLoginError(errorMessage);
  };

  const handleBlogError = (errorMessage) => {
    setBlogError(errorMessage);
  };

  const handleBlogMessage = (message) => {
    setBlogMessage(message);
  };

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, [refresh]);

  return (
    <div>
      <Notification errorMessage={loginError} />
      {!user && (
        <div>
          <h2>log in to application</h2>
          <LoginForm handleUser={handleUser} handleLoginError={handleLoginError} />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification errorMessage={blogError} message={blogMessage} />
          <LoggedInUser user={user} handleUser={handleUser} />
          <Togglable buttonLabel="new blog">
            <CreateForm
              user={user}
              handleRefresh={handleRefresh}
              handleBlogError={handleBlogError}
              handleBlogMessage={handleBlogMessage}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} handleRefresh={handleRefresh} handleBlogError={handleBlogError} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

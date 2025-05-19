import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ handleUser, handleLoginError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token);
      handleUser(user);
      handleLoginError(null);
      setUsername('');
      setPassword('');
    } catch (exception) {
      handleLoginError('Wrong username or password');
      setTimeout(() => {
        handleLoginError(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

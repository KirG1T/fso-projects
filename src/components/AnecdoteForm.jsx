import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../utils/notificationTimer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(anecdote));

    setNotificationWithTimeout(dispatch, `you created '${anecdote}'`, 2000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

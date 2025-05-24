import { useSelector, useDispatch } from 'react-redux';
import { updateVotesAnecdote } from '../reducers/anecdoteReducer';
import Notification from './Notification';
import { setNotificationWithTimeout } from '../utils/notificationTimer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    }

    const filtered = state.anecdotes.filter(
      (anecdote) => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1,
    );

    return filtered;
  });

  const notification = useSelector((state) => state.notification);

  const vote = (anecdote) => {
    setNotificationWithTimeout(dispatch, `you voted '${anecdote.content}'`, 2000);
    dispatch(updateVotesAnecdote(anecdote.id, anecdote.votes));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

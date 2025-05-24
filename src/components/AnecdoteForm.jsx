import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMessageDispatch } from '../AnecdotesContext';
import { createAnecdote } from '../requests';
import { setNotificationWithTimeout } from '../utils/notificationTimer';

const AnecdoteForm = () => {
  const dispatch = useMessageDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: (error) => {
      setNotificationWithTimeout(dispatch, 'ERROR', error.response.data.error, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });

    setNotificationWithTimeout(dispatch, 'CREATE', content, 3000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

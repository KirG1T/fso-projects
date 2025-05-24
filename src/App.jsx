import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useMessageDispatch } from './AnecdotesContext';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { setNotificationWithTimeout } from './utils/notificationTimer';

const App = () => {
  const dispatch = useMessageDispatch();
  const queryClient = useQueryClient();

  const anecdotesQuery = useQuery({ queryKey: ['anecdotes'], queryFn: getAnecdotes, refetchOnWindowFocus: false });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      // ручное обновление кеша без запроса на сервер
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) => (anecdote.id === updated.id ? updated : anecdote)),
      );

      // автоматическое обновление кеша с запросом на сервер
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote);

    setNotificationWithTimeout(dispatch, 'VOTE', anecdote.content, 3000);
  };

  if (anecdotesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotesQuery.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

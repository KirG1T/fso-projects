import ReactDOM from 'react-dom/client';
import App from './App';
import { AnecdotesContextProvider } from './AnecdotesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AnecdotesContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AnecdotesContextProvider>,
);

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `you created '${action.payload.message}'`;
    case 'VOTE':
      return `you voted '${action.payload.message}'`;
    case 'ERROR':
      return action.payload.message;
    case 'TIMER':
      return '';
    default:
      return state;
  }
};

const AnecdotesContext = createContext();

export const AnecdotesContextProvider = ({ children }) => {
  const [message, messageDispatch] = useReducer(anecdoteReducer, '');

  return <AnecdotesContext.Provider value={[message, messageDispatch]}>{children}</AnecdotesContext.Provider>;
};

export const useMessage = () => {
  const messageAndDispatch = useContext(AnecdotesContext);
  return messageAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(AnecdotesContext);
  return messageAndDispatch[1];
};

export default AnecdotesContext;

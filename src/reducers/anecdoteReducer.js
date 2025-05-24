import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdotes(state, action) {
      const updated = state.map((anecdote) => (anecdote.id === action.payload.id ? action.payload : anecdote));
      return updated.sort((a, b) => b.votes - a.votes);
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(state, action) {
      const anecdotes = action.payload;
      const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
      return sortedAnecdotes;
    },
  },
});

export const { voteAnecdotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateVotesAnecdote = (id, anecdoteVotes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(id, anecdoteVotes);
    dispatch(voteAnecdotes(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;

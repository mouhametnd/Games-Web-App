import { createSlice } from '@reduxjs/toolkit';


// The games slice is used to store the current games. 
const gamesSlice = createSlice({
  name: 'games',
  initialState: { games: [], loader: null, error: null },
  reducers: {
    setGames: (state, { payload }) => ({ ...state, games: payload }),
    addGames: (state, { payload }) => ({ games: [...state.games, ...payload] }),
    setGamesLoader: (state, { payload }) => ({ ...state, loader: payload }),
    setGamesError: (state, { payload }) => ({ ...state, error: payload }),
  },
});

const gamesActions = gamesSlice.actions;
const gamesReducer = gamesSlice.reducer;
export { gamesActions, gamesReducer };

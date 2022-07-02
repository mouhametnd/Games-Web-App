import { createSlice } from '@reduxjs/toolkit';

const numOfGamesSlice = createSlice({
  name: 'numOfGames',
  initialState: { numOfGames: 0 },
  reducers: {
    setNumOfGames: (_, { payload }) => ({ numOfGames: payload }),
  },
});

const numOfGamesActions = numOfGamesSlice.actions;
const numOfGamesReducer = numOfGamesSlice.reducer;
export { numOfGamesActions, numOfGamesReducer };

import { createSlice } from '@reduxjs/toolkit';
import API_KEY from '../../constants/API_KEY';
API_KEY;

const initialState = { nextPage: `https://api.rawg.io/api/games?key=${API_KEY}&page=1`, hasNextPage: true };

// The requestPage slice is used to store the current pages that the API give us.
const requestPageSlice = createSlice({
  name: 'requestPage',
  initialState: initialState,
  reducers: {
    setNextPage: (state, { payload }) => ({ ...state, nextPage: payload }),
    resetNextPage: state => ({ ...state, ...initialState }),
    setHasNextPage: (state, { payload }) => ({ ...state, hasNextPage: payload }),
  },
});

const requestPageActions = requestPageSlice.actions;
const requestPageReducer = requestPageSlice.reducer;
export { requestPageActions, requestPageReducer };

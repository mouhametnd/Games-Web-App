import { createSlice } from '@reduxjs/toolkit';

const initialState = { shouldScrollBack: false };

// The scrollBack slice is used to store the current state of the scrollBack. This is used to scroll back to when the user was when he clicked to open the modal.
const scrollBackSlice = createSlice({
  name: 'scrollBackState',
  initialState,
  reducers: {
    setShouldScrollBack: (_, { payload }) => ({ shouldScrollBack: payload }),
  },
});

const scrollBackActions = scrollBackSlice.actions;
const scrollBackReducer = scrollBackSlice.reducer;
export { scrollBackActions, scrollBackReducer };

import { createSlice } from '@reduxjs/toolkit';

const initialState = location.hash.split('/')[1];

const activePageSlice = createSlice({
  name: 'activePage',
  initialState: { activePage: initialState },
  reducers: {
    setActivePage: (_, { payload }) => payload,
  },
});

const activePageActions = activePageSlice.actions;
const activePageReducer = activePageSlice.reducer;

export { activePageActions, activePageReducer };

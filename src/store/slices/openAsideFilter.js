import { createSlice } from '@reduxjs/toolkit';

const openAsideFilterSlice = createSlice({
  name: 'OpenAsideFilter',
  initialState: { isAsideFilterOpen: false },
  reducers: {
    setOpenAsideFilter: (_, { payload }) => ({ isAsideFilterOpen: payload }),
  },
});

const OpenAsideFilterActions = openAsideFilterSlice.actions;
const OpenAsideFilterReducer = openAsideFilterSlice.reducer;
export { OpenAsideFilterActions, OpenAsideFilterReducer };

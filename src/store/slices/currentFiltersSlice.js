import { createSlice } from '@reduxjs/toolkit';
import filterStrings from '../../constants/filterStrings';

const { GENRES, PLATFORMS, PUBLISHERS, STORES, TAGS, ORDERING, SEARCH } = filterStrings;

const initialState = {
  [SEARCH]: { propName: SEARCH, value: '' },
  [ORDERING]: { propName: ORDERING, value: '' },
  [GENRES]: { propName: GENRES, value: [] },
  [PLATFORMS]: { propName: PLATFORMS, value: [] },
  [PUBLISHERS]: { propName: PUBLISHERS, value: [] },
  [STORES]: { propName: STORES, value: [] },
  [TAGS]: { propName: TAGS, value: [] },
};

// The filters slice is used to store the current filters.
const currentFiltersSlice = createSlice({
  name: 'currentFilters',
  initialState,
  reducers: {
    setCurrentFilters: (state, { payload }) => {
      const { value, filterName, prop } = payload;

      if (prop === SEARCH || prop === ORDERING) return { ...state, [prop]: { propName: prop, value } };

      const filterArray = [...state[prop].value];
      const filterObjRef = filterArray.find(({ id }) => id === value);

      filterObjRef
        ? filterArray.splice(filterArray.indexOf(filterObjRef), 1)
        : filterArray.push({ name: filterName, id: value });

      return { ...state, [prop]: { propName: prop, value: filterArray } };
    },
  },
});

/*
  setCurrentFilters: (state, action) => {
      const { filterSlug, filterName, prop } = action.payload;

      if (prop === SEARCH || prop === ORDERING) return { ...state, [prop]: { propName: prop, value: filterSlug } };

      const filterArray = [...state[prop].value];
      const filterSlugRef = filterArray.find(({ slug }) => slug === filterSlug);

      filterSlugRef
        ? filterArray.splice(filterArray.indexOf(filterSlugRef), 1)
        : filterArray.push({ name: filterName, slug: filterSlug });

      return { ...state, [prop]: { propName: prop, value: filterArray } };
    },
  },
*/

const currentFiltersActions = currentFiltersSlice.actions;
const currentFiltersReducer = currentFiltersSlice.reducer;
export { currentFiltersActions, currentFiltersReducer };

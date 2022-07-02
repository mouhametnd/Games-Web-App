import { currentFiltersActions } from '../store/slices/currentFiltersSlice';
import store from '../store/store';
import filterStrings from '../constants/filterStrings';

const { setCurrentFilters } = currentFiltersActions;
const { SEARCH, ORDERING } = filterStrings;
const dispatch = store.dispatch;

// This function is used to set the filters of the current page during the user interaction.
const setFilter = ({ event, prop, query }) => {
  if (prop === SEARCH || prop === ORDERING) return dispatch(setCurrentFilters({ prop, value: query }));

  const { target } = event;

  const filterId = +target.getAttribute('data-filter-id');
  const filterName = target.textContent;
  prop ??= target.getAttribute('data-filter-prop');

  dispatch(setCurrentFilters({ prop, value: filterId, filterName }));
};

export default setFilter;

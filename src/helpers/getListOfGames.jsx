import axios from 'axios';
import { gamesActions } from '../store/slices/gamesSlice';
import { requestPageActions } from '../store/slices/requestPageSlice';
import store from '../store/store';
import getRequestParams from './getParams';
import { numOfGamesActions } from '../store/slices/numOfGamesSlice';

const { setNumOfGames } = numOfGamesActions;
const { setNextPage, resetNextPage, setHasNextPage } = requestPageActions;
const { setGames, setGamesLoader, addGames, setGamesError } = gamesActions;

// This function is used to fetch the next page of results from the API, and then set or append the results to the list of games depending on the shouldSetGames prop.

const getListOfGames = async shouldSetGames => {
  const dispatch = store.dispatch;
  try {
    const { currentFilters, requestPage } = store.getState();
    const searchParams = getRequestParams(currentFilters);

    if (shouldSetGames) {
      dispatch(resetNextPage());
      dispatch(setGamesLoader(true));
    }

    const {
      data: { results, next, count },
    } = await axios.get(`${requestPage.nextPage}${searchParams && `&${searchParams}`}`);

    shouldSetGames ? dispatch(setGames(results)) : dispatch(addGames(results));
    next ? dispatch(setNextPage(next)) : dispatch(setHasNextPage(false));

    dispatch(setGamesError(false));
    dispatch(setGamesLoader(false));
    dispatch(setNumOfGames(count));
  } catch (error) {
    dispatch(setGamesLoader(false));
    error.response?.data?.detail === 'Invalid page.' ? dispatch(setGames([])) : dispatch(setGamesError(error));
  }
};

export default getListOfGames;

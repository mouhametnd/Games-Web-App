import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getUserGames from '../helpers/getUserGames';
import { gamesActions } from '../store/slices/gamesSlice';
import { numOfGamesActions } from '../store/slices/numOfGamesSlice';
import filterUserGames from '../helpers/filterUserGames';

const { setGames: setGamesOfStore, setGamesLoader, setGamesError } = gamesActions;
const { setNumOfGames } = numOfGamesActions;


// This custom hook is used to fetch the user games for the pages like favorites, play later, played.

const useUserGames = prop => {
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const { currentFilters, userGames } = useSelector(state => state);
  const gamesIds = userGames[prop];

  useEffect(() => {
    if (!gamesIds.length) {
      dispatch(setGamesOfStore([]));
      dispatch(setGamesLoader(false));
      dispatch(setGamesError(null));
      dispatch(setNumOfGames(0));
      return;
    }

    dispatch(setGamesError(null));
    dispatch(setGamesLoader(true));
    getUserGames(gamesIds, setGames);
  }, [gamesIds]);

  useEffect(() => {
    if (!games.length) return;

    const gamesFiltered = filterUserGames(currentFilters, games);
    dispatch(setGamesOfStore(gamesFiltered));
    dispatch(setNumOfGames(gamesFiltered.length));
  }, [currentFilters, games]);
};

export default useUserGames;

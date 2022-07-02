import axios from 'axios';
import { gamesActions } from '../store/slices/gamesSlice';
import API_KEY from '../constants/API_KEY';
import store from '../store/store';

const { setGamesLoader, setGamesError } = gamesActions;
const baseUrl = 'https://api.rawg.io/api/games';
const dispatch = store.dispatch;

// This function is used to fetch some games pasing their ids in an array, it gonna use the setGames param to set the result.
const getUserGames = async (gamesIds, setGames) => {
  try {
    dispatch(setGamesLoader(false));

    const promises = gamesIds.map(id => axios.get(`${baseUrl}/${id}?key=${API_KEY}`));
    const responses = await Promise.allSettled(promises);
    const successResponses = responses.filter(({ status }) => status === 'fulfilled').map(({ value }) => value.data);

    setGames(successResponses);
    dispatch(setGamesError(false));
    dispatch(setGamesLoader(false));
  } catch (error) {
    setGames([]);
    dispatch(setGamesLoader(false));
    dispatch(setGamesError(error));
  }
};

export default getUserGames;

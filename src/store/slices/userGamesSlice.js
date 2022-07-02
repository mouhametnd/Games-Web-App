import { createSlice } from '@reduxjs/toolkit';
import gameActionsStr from '../../constants/gameActionStrings';
const { FAVOURITE, PLAYED, PLAY_LATER } = gameActionsStr;

JSON.parse(localStorage.getItem('userGames')) ??
  localStorage.setItem(
    'userGames',
    JSON.stringify({
      [FAVOURITE]: [],
      [PLAYED]: [],
      [PLAY_LATER]: [],
    })
  );

const initialUserGames = JSON.parse(localStorage.getItem('userGames'));


// The userGames slice is used to store the current user's games.
const userGamesSlice = createSlice({
  name: 'userGames',
  initialState: initialUserGames,
  reducers: {
    setUserGames: (state, {payload}) => {
      const { gameId, prop } = payload;
      const game = state[prop].find(id => id === gameId);
      const games = [...state[prop]];

      game ? games.splice(games.indexOf(game), 1) : games.push(gameId);

      const newState = { ...state, [prop]: games };
      localStorage.setItem('userGames', JSON.stringify(newState));
      return newState;
    },
  },
});

const userGamesActions = userGamesSlice.actions;
const userGamesReducer = userGamesSlice.reducer;
export { userGamesActions, userGamesReducer };

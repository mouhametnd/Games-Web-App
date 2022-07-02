import { userGamesActions } from '../store/slices/userGamesSlice';
import store from '../store/store';
const dispatch = store.dispatch;

// This function is used to dispatch the action that is gonna set to localStiarge the id passed.
const setUserGameClosure = id => prop => dispatch(userGamesActions.setUserGames({ gameId: id, prop }));

export default setUserGameClosure;

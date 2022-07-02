import { configureStore } from '@reduxjs/toolkit';
import { activePageReducer } from './slices/activePageSlice';
import { currentFiltersReducer } from './slices/currentFiltersSlice';
import { gamesReducer } from './slices/gamesSlice';
import { requestPageReducer } from './slices/requestPageSlice';
import { numOfGamesReducer } from './slices/numOfGamesSlice';
import { OpenAsideFilterReducer } from './slices/OpenAsideFilter';
import { userGamesReducer } from './slices/userGamesSlice';
import { modalGameReducer } from './slices/modalGameSlice';
import { scrollBackReducer } from './slices/scrollBackSlice';

const store = configureStore({
  reducer: {
    activePage: activePageReducer,
    userGames: userGamesReducer,
    games: gamesReducer,
    OpenAsideFilter: OpenAsideFilterReducer,
    currentFilters: currentFiltersReducer,
    requestPage: requestPageReducer,
    modalGame: modalGameReducer,
    numOfGames: numOfGamesReducer,
    scrollBackState: scrollBackReducer,
  },
});

export default store;

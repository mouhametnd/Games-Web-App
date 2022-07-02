import { createSlice } from '@reduxjs/toolkit';
import { userGamesActions } from './userGamesSlice';

const { setUserGames } = userGamesActions;
const initialState = {
  isModalOpen: false,
  gameId: null,
  game: {},
};

// The modalGame slice is used to store the current state of the modal.
const modalGameSlice = createSlice({
  name: 'modalGame',
  initialState,
  reducers: {
    closeModal: () => ({ ...initialState }),
    setGameId: (state, { payload }) => {
      return payload === state.gameId || typeof state.gameId === 'undefined'
        ? state
        : { ...initialState, isModalOpen: true, gameId: payload };
    },
    setGame: (_, { payload }) => ({
      ...initialState,
      game: payload,
      isModalOpen: true,
      gameId: payload.gameDetails.id,
    }),
  },

  extraReducers: ({ addCase }) => {
    addCase(setUserGames, state => ({ ...state }));
  },
});

const modalGameActions = modalGameSlice.actions;
const modalGameReducer = modalGameSlice.reducer;
export { modalGameActions, modalGameReducer };

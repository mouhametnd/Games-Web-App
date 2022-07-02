import React from 'react';
import GamesWrapper from '../components/GamesWrapper';
import gameActionStrings from '../constants/gameActionStrings';
import useUserGames from '../hooks/useUserGames';

const { PLAY_LATER } = gameActionStrings;
const PlayLater = () => {
  useUserGames(PLAY_LATER);

  return <GamesWrapper />;
};

export default PlayLater;

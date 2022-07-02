import React from 'react';
import GamesWrapper from '../components/GamesWrapper';
import pagesStrings from '../constants/pagesStrings';
import useUserGames from '../hooks/useUserGames';
const { PLAYED } = pagesStrings;

const Played = () => {
  useUserGames(PLAYED);
  return <GamesWrapper />;
};

export default Played;

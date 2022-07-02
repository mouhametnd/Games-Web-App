import React from 'react';
import GamesWrapper from '../components/GamesWrapper';
import pagesStrings from '../constants/pagesStrings';
import useUserGames from '../hooks/useUserGames';
const { FAVOURITE } = pagesStrings;

const Favourite = () => {
  useUserGames(FAVOURITE);
  return <GamesWrapper />;
};

export default Favourite;

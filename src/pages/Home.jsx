import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GamesWrapper from '../components/GamesWrapper';
import PresentalGame from '../components/PresentalGame/PresentalGame';
import getListOfGames from '../helpers/getListOfGames';

const Home = () => {
  const { currentFilters } = useSelector(state => state);

  useEffect(() => {
    getListOfGames(true);
  }, [currentFilters]);

  return (
    <RootWrapper>
      <PresentalGame />
      <GamesWrapper />
    </RootWrapper>
  );
};

const RootWrapper = styled.main`
  display: flex;
  flex-flow: column;
  gap: 40px;
`;

export default Home;

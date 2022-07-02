import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import formatNumber from '../../helpers/formatNumber';

const NumOfGames = () => {
  const numOfGames = +formatNumber(useSelector(({ numOfGames }) => numOfGames.numOfGames));
  return (
    <Span>
      {numOfGames} {numOfGames === 1 ? 'Game' : 'Games'}
    </Span>
  );
};

const Span = styled.span`
  align-self: center;
  min-width: max-content;
  width: 100%;
  padding-top: 6px;
  color: var(--special);
  font-weight: 500;
  font-size: 1rem;
`;

export default NumOfGames;

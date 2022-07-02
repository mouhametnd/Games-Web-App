import React from 'react'
import styled from 'styled-components';
import FavouriteSvg from '../assets/svgs/FavouriteSvg';
import PlayedSvg from '../assets/svgs/PlayedSvg';
import ClockSvg from '../assets/svgs/ClockSvg';
import gameActionStrings from '../constants/gameActionStrings';
import isGameAddedAsClosure from '../helpers/isGameAddedAsClosure';
import setUserGameClosure from '../helpers/setUserGameClosure';
import ButtonIcon from './ButtonIcon';

const { FAVOURITE, PLAYED, PLAY_LATER } = gameActionStrings;

const ContainerActions = ({ id }) => {
  const isGameAddedAs = isGameAddedAsClosure(id);
  const setUserGame = setUserGameClosure(id);

  return (
    <Wrapper>
      <ButtonIcon
        children={<ClockSvg />}
        isActive={isGameAddedAs(PLAY_LATER)}
        onClick={() => setUserGame(PLAY_LATER)}
      />

      <ButtonIcon children={<PlayedSvg />} isActive={isGameAddedAs(PLAYED)} onClick={() => setUserGame(PLAYED)} />

      <ButtonIcon
        children={<FavouriteSvg />}
        isActive={isGameAddedAs(FAVOURITE)}
        onClick={() => setUserGame(FAVOURITE)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 20px;
  margin-block: 15px;
  & button {
    cursor: pointer;
    padding: 0px;
    background-color: transparent;
    padding-inline: 10px;
  }

  & svg {
    width: 27px;
    height: 27px;
  }
`;

export default ContainerActions;

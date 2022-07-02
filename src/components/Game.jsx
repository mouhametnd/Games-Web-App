import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { noBackgroundSrc } from '../constants/no-backgroundSrc';
import { modalGameActions } from '../store/slices/modalGameSlice';
setUserGameClosure;
import setUserGameClosure from '../helpers/setUserGameClosure';
import ContainerActions from './ContainerActions';
import noDetailText from '../constants/noDetailText';

const { setGameId } = modalGameActions;

const Game = ({ game }) => {
  const { background_image, name, released, id } = game;
  const dispatch = useDispatch();
  const year = released?.split('-')[0] || noDetailText + 'year';

  const handleClick = ({ target }) => {
    if (target.tagName === 'BUTTON') return;
    dispatch(setGameId(id));
  };

  return (
    <Article onClick={handleClick}>
      <img src={background_image || noBackgroundSrc} alt={name || noDetailText + 'name'} />
      <ContainerActions id={id} />
      <ContainerText>
        <h4 children={name || noDetailText + 'name'} />
        <time dateTime={year} children={year} />
      </ContainerText>
    </Article>
  );
};

const Article = styled.article`
  display: flex;
  flex-flow: column;
  padding: 13px;
  border-radius: 15px;
  margin-inline: auto;
  box-shadow: 2px 2px 30px var(--secondaryBlack);
  cursor: pointer;

  & img,
  & h4,
  & time {
    pointer-events: none;
  }

  & img {
    min-height: 400px;
    height: 100%;
    max-width: 500px;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.15s linear transform;
  }

  @media screen and (hover: hover) {
    &:hover {
      & img {
        transform: scale(1.02);
      }
    }
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  padding-inline: 20px;

  & * {
    color: var(--primaryText);
    font-weight: 600;
  }

  & h4 {
    letter-spacing: 1px;
    color: var(--primaryText);
    margin: 0px;
    padding: 0px;
    height: max-content;
    align-self: center;
  }
`;

export default Game;

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { noBackgroundSrc } from '../../constants/no-backgroundSrc';
import { modalGameActions } from '../../store/slices/modalGameSlice';

const { setGameId } = modalGameActions;

const RecommendedGame = ({ recommendedGame }) => {
  const dispatch = useDispatch();
  const { id, name, background_image } = recommendedGame;
  const handleClick = () => dispatch(setGameId(id));

  return (
    <RootWrapper onClick={handleClick}>
      <ImageWrapper>
        <img src={background_image || noBackgroundSrc} alt={name} />
      </ImageWrapper>
      <h4>{name}</h4>
    </RootWrapper>
  );
};

const RootWrapper = styled.article`
  position: relative;
  width: 220px;
  min-width: 200px;
  height: 300px;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;

  & * {
    pointer-events: none;
  }

  &:last-of-type {
    margin-right: 510px;
  }

  @media screen and (hover: hover) {
    &:hover {
      & .recommended__container-img::before {
        opacity: 0.7;
      }
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.2s linear opacity;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0% 60%, var(--primaryBlack));
  }
`;
export default RecommendedGame;

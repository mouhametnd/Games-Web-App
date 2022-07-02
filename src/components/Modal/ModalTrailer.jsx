import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { noBackgroundSrc } from '../../constants/no-backgroundSrc';

const ModalTrailer = () => {
  const { game } = useSelector(({ modalGame }) => modalGame);
  const { background_image } = game.gameDetails;
  const trailer = game.gameTrailers[0]?.data?.max;
  return (
    <>
      {trailer && (
        <RootWrapper>
          <h3>Game Trailer </h3>
          <VideoWrapper>
            <video src={trailer} controls poster={background_image || noBackgroundSrc}></video>
          </VideoWrapper>
        </RootWrapper>
      )}
    </>
  );
};

const RootWrapper = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;
  & h3 {
    color: var(--primaryText);
    padding: 0px;
    margin: 0px;
  }
  & video {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
`;

const VideoWrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  margin-inline: auto;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    margin-inline: 0px;
    max-height: 320px;
  }
`;

export default ModalTrailer;

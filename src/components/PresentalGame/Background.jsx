import React from 'react';
import styled from 'styled-components';
import getBackground from '../../helpers/getBackground';

const Background = ({ imgSrc, videoSrc }) => (
  <RootWrapper>
    {getBackground({ imgSrc, videoSrc, videoProps: { autoPlay: true, loop: true, muted: true, playsInline: true } })}
  </RootWrapper>
);

const RootWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: -20px;
  width: 100%;
  height: 100%;
  min-height: 450px;
  min-width: 100vw;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    opacity: 0.4;
  }

  & video,
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

export default Background;

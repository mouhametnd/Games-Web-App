import React from 'react';
import styled from 'styled-components';

const Loader = () => (
  <Div className="loader-ring ">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Div>
);

// change the color of the loader.

const Div = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-inline: auto;
  
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: loader-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes loader-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Loader;

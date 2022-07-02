import React from 'react';
import styled from 'styled-components';

const NoPageFound = () => {
  return (
    <RootWrapper>
      <h1> 404 NoPageFound</h1>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  & h1 {
    margin: auto;
    color: var(--special);
  }
`;

export default NoPageFound;

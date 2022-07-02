import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import ListOfFilters from './ListOfFilters';
import Select from './Select';
import styled from 'styled-components';
import NumOfGames from './NumOfGames';

const Header = () => {
  return (
    <RootWrapper>
      <NavBar />
      <SearchBar />
      <SecondWrapper>
        <NumOfGames />
        <Select />
      </SecondWrapper>
      <ListOfFilters />
    </RootWrapper>
  );
};

const RootWrapper = styled.header`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

const SecondWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export default Header;

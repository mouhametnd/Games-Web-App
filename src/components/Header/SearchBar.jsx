import React from 'react';
import styled from 'styled-components';
import SearchSvg from '../../assets/svgs/SearchSvg';
import filterStrings from '../../constants/filterStrings';
import setFilter from '../../helpers/setFilter';

const { SEARCH } = filterStrings;
const handleChange = ({ target: { value } }) => setFilter({ prop: SEARCH, query: value || ' ' });

const SearchBar = () => (
  <Container>
    <Label htmlFor="searchInput" children={<SearchSvg />} />
    <Input type="search" id="searchInput" placeholder="Search Game..." onChange={handleChange} />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-flow: row;
`;

const Label = styled.label`
  display: flex;
  padding-right: 5px;

  & svg {
    fill: var(--primaryText);
    margin: auto;
    width: 25px;
    height: 25px;
  }
`;

const Input = styled.input`
  width: min(100%, 350px);
  border: none;
  outline: none;
  font-size: 15px;
  background-color: transparent;
  color: var(--primaryText);

  &::placeholder {
    font-size: 15px;
    color: var(--primaryText);
  }
  &::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

export default SearchBar;

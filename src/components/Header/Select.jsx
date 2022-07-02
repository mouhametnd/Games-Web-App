import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import filterStrings from '../../constants/filterStrings';
import pagesStrings from '../../constants/pagesStrings';
import setFilter from '../../helpers/setFilter';


// The API allows sorting the list of games by a given property, but they don't provide a way to fetch some of the keywords. That's why I've created a list of keywords that can be used to sort the list of games.

const sorters = ['random', 'name', 'released', 'added', 'created', 'updated', 'rating', 'metacritic'];
const { ORDERING } = filterStrings;
const { HOME } = pagesStrings;
const changeHandle = e => setFilter({ prop: ORDERING, query: e.target.value });

const Select = () => {
  const activePage = useSelector(({ activePage }) => activePage.activePage);

  return (
    <RootWrapper className={activePage !== HOME && activePage !== '' ? 'select--hide' : ''}>
      <span>Sort by</span>
      <SelectWrapper>
        <SelectElement onChange={changeHandle}>
          {sorters.map(sorter => (
            <option key={sorter} value={sorter} children={sorter} />
          ))}
        </SelectElement>
      </SelectWrapper>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;
  justify-self: center;
  gap: 10px;
  height: max-content;
  width: 500px;
  padding-top: 3px;

  & span {
    color: var(--primaryText);
    margin: 0px;
    padding: 1px 0px 0px 0px;
    align-self: center;
    font-size: 0.9rem;
  }
`;

const SelectWrapper = styled.div`
  align-self: start;
  justify-self: center;
  max-height: 42px;
  padding: 10px 10px;
  border-radius: 40px;
  background-color: var(--secondaryBlack);
  box-shadow: 2px 2px 10px 0px #262d3f;
`;

const SelectElement = styled.select`
  align-self: start;
  height: 100%;
  width: max-content;
  padding: 0px 30px;
  border: none;
  outline: none;
  color: var(--primaryText);
  background-color: var(--secondaryBlack);
  cursor: pointer;

  & option {
    text-transform: capitalize;
  }
`;
export default Select;

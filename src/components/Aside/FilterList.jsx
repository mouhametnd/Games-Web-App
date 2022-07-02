import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CheckSvg from '../../assets/svgs/CheckSvg';
import setFilter from '../../helpers/setFilter';

const FilterList = ({ filters, prop }) => {
  const filterArray = useSelector(({ currentFilters }) => currentFilters[prop].value);
  const handleClick = event => event.target.getAttribute('data-filter-id') && setFilter({ event, prop });

  return (
    <RootWrapper>
      <h4 className="filter-list__h4">{prop}</h4>

      <FiltersWrapper onClick={handleClick}>
        {filters.map(({ id, name }) => {
          const isFilterActive = filterArray.find(activeFilter => activeFilter.id === id);

          return (
            <li className={isFilterActive && 'filter-element-active'} key={id} data-filter-id={id}>
              {name}
              <CheckSvg />
            </li>
          );
        })}
      </FiltersWrapper>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  .filter-list {
    &__h4 {
      width: max-content;
      height: max-content;
      margin: 0px;
      padding: 0px 0px 10px 00px;
      border-bottom: 1px solid var(--special);
      color: var(--special);
      letter-spacing: 1px;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
`;

const FiltersWrapper = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 10px;
  width: 100%;
  margin: 0px;
  padding: 15px 0px 0px 0px;

  & li {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 5px;
    color: var(--primaryText);
    letter-spacing: 0.5px;
    transition: 0.1s linear background-color;
    cursor: pointer;
    @media screen and (hover: hover) {
      &:hover {
        background-color: var(--special);
      }
    }
    & * {
      pointer-events: none;
    }

    & span {
      height: max-content;
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 600;
      color: var(--white);
      align-self: center;
    }

    & svg {
      width: 20px;
      height: 20px;
      fill: var(--primaryText);
      opacity: 0;
    }
  }
  .filter-element-active {
    background-color: var(--special);
    & svg {
      opacity: 1;
    }
  }
`;

export default FilterList;

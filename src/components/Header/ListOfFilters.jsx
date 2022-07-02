import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CloseSvg from '../../assets/svgs/CloseSvg';
import setFilter from '../../helpers/setFilter';

const removeFilter = event => event.target.getAttribute('data-filter-id') && setFilter({ event });

const ListOfFilters = () => {
  const currentFiltersArrays = useSelector(({ currentFilters }) =>
    Object.values(currentFilters).filter(({ value }) => value instanceof Array)
  );

  return (
    <Ul onClick={removeFilter}>
      {currentFiltersArrays.length > 0 &&
        currentFiltersArrays
          .map(({ propName, value }) => {
            return value.map(({ name, id }) => {
              return (
                <li key={id + name} data-filter-id={id} data-filter-prop={propName}>
                  <span children={name} />
                  <CloseSvg />
                </li>
              );
            });
          })
          .flat(1)}
    </Ul>
  );
};

const Ul = styled.ul`
  align-self: start;
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  width: 100%;
  height: max-content;
  border-radius: 40px;
  margin: 0px;
  padding: 0px;

  @media screen and (min-width: 768px) {
    position: static;
    width: 100%;
  }

  & li {
    cursor: pointer;
    background-color: var(--secondaryBlack);
    padding: 8px 15px;
    border-radius: 30px;
    transition: 0.1s linear color;
    color: var(--primaryText);
    box-shadow: 2px 2px 10px 0px #262d3f;
    @media screen and (min-width: 768px) {
      padding-inline: 20px;
    }
    & * {
      pointer-events: none;
    }

    & span {
      letter-spacing: 1px;
      pointer-events: none;
      font-size: 1rem;
      color: var(--white);
      transition: 0.1s linear color;
      padding-right: 7px;
    }

    & svg {
      width: 12px;
      height: 12px;
      pointer-events: none;
      fill: var(--white);
      transition: 0.1s linear fill;
    }

    & path {
      fill: var(--primaryText);
      pointer-events: none;
    }

    @media screen and (hover: hover) {
      &:hover {
        & span {
          color: var(--special);
        }
        & path {
          fill: var(--special);
        }
      }
    }
  }
`;

export default ListOfFilters;

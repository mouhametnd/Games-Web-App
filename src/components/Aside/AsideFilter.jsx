import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CloseSvg from '../../assets/svgs/CloseSvg';
import Loader from '../../assets/svgs/Loader';
import { OpenAsideFilterActions } from '../../store/slices/OpenAsideFilter';
import FilterList from './FilterList';
import API_KEY from '../../constants/API_KEY';
import filterStrings from '../../constants/filterStrings';

const { GENRES, PLATFORMS, PUBLISHERS, STORES, TAGS } = filterStrings;
const { setOpenAsideFilter } = OpenAsideFilterActions;

const initialState = { [GENRES]: null, [PLATFORMS]: null, [TAGS]: null, [PUBLISHERS]: null, [STORES]: null };
const AsideFilter = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(initialState);
  const [loader, setLoader] = useState(false);
  const { genres, platforms, publishers, tags, stores } = filters;
  const isAsideFilterOpen = useSelector(({ OpenAsideFilter }) => OpenAsideFilter.isAsideFilterOpen);
  const closeAsideFilter = () => dispatch(setOpenAsideFilter(false));

  // When the component is mounted we're gonna fetch some filter keywords and they could be used to set the search params and filter the user Games
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const responses = await Promise.allSettled([
          axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`),
          axios.get(` https://api.rawg.io/api/platforms?key=${API_KEY}&page_size=20`),
          axios.get(`https://api.rawg.io/api/publishers?key=${API_KEY}&page_size=20`),
          axios.get(`https://api.rawg.io/api/tags?key=${API_KEY}&page_size=20`),
          axios.get(`https://api.rawg.io/api/stores?key=${API_KEY}&page_size=20`),
        ]);

        const [genresResponse, platformsResponse, publishersResponse, tagsResponse, storesResponse] = responses;

        setFilters({
          [GENRES]: genresResponse?.value?.data?.results,
          [PLATFORMS]: platformsResponse?.value?.data?.results,
          [PUBLISHERS]: publishersResponse?.value?.data?.results,
          [TAGS]: tagsResponse?.value?.data?.results,
          [STORES]: storesResponse?.value?.data?.results,
        });

        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    })();
  }, []);

  return (
    <Modal className={isAsideFilterOpen && 'modal-open'}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <RootWrapper>
            <WrapperTop>
              <h3 className="filter__h3">Games Filter</h3>
              <button className="filter__close-btn" onClick={closeAsideFilter} children={<CloseSvg />} />
            </WrapperTop>

            <WrapperBottom>
              {genres && <FilterList filters={genres} prop={GENRES} />}

              {platforms && <FilterList filters={platforms} prop={PLATFORMS} />}

              {tags && <FilterList filters={tags} prop={TAGS} />}

              {stores && <FilterList filters={stores} prop={STORES} />}

              {publishers && <FilterList filters={publishers} prop={PUBLISHERS} />}
            </WrapperBottom>
          </RootWrapper>

          <div className="rightElement" onClick={closeAsideFilter} />
        </>
      )}
    </Modal>
  );
};

const Modal = styled.aside`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  transition: 0.6s linear transform;
  transform: translateX(-200%);
  display: flex;
  flex-flow: row nowrap;

  & .rightElement {
    @media (min-width: 1024px) {
      opacity: 0.7;
      background-color: var(--secondaryBlack);
      flex-basis: 50%;
      cursor: pointer;
    }
  }

  .filter {
    &__h3 {
      color: var(--primaryText);
      letter-spacing: 0.8px;
      font-size: clamp(1.1rem, 2vw, 1.5rem);
    }
  }

  .filter__close-btn {
    background-color: transparent;
    padding-top: 5px;

    @media screen and (hover: hover) {
      &:hover {
        & svg {
          fill: var(--special);
        }
      }
    }

    & svg {
      transition: 0.1s linear fill;
      width: 15px;
      fill: var(--primaryText);
    }
  }
`;
const RootWrapper = styled.div`
  flex-basis: 1;
  opacity: 1;
  padding: 10px 20px;
  flex-basis: 100%;
  background-color: var(--primaryBlack);
`;
const WrapperTop = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;

const WrapperBottom = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  justify-content: space-between;
  row-gap: 30px;
  padding: 30px 10px 70px 0px;
  width: 100%;
  height: 83vh;
  max-width: 98vw;
  max-height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--primaryBlack);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--special);
    border-radius: 50px;
  }
`;

export default AsideFilter;

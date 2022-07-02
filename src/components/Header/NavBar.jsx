import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { activePageActions,  } from '../../store/slices/activePageSlice';
import { OpenAsideFilterActions } from '../../store/slices/OpenAsideFilter';
import ButtonIcon from '../ButtonIcon';
import pagesStrings from '../../constants/pagesStrings';
import HomeSvg from '../../assets/svgs/HomeSvg';
import ClockSvg from '../../assets/svgs/ClockSvg';
import FilterSvg from '../../assets/svgs/FilterSvg';
import PlayedSvg from '../../assets/svgs/PlayedSvg';
import FavouriteSvg from '../../assets/svgs/FavouriteSvg';

const { HOME, FAVOURITE, PLAYED, PLAY_LATER } = pagesStrings;
const { setActivePage } = activePageActions;
const { setOpenAsideFilter } = OpenAsideFilterActions;

const NavBar = () => {
  const dispatch = useDispatch();
  const setPage = page => dispatch(setActivePage({ activePage: page }));
  const activePage = useSelector(({ activePage }) => activePage.activePage);
  const OpenAsideFilter = () => dispatch(setOpenAsideFilter(true));

  return (
    <Container>
      <Link to="/">
        <ButtonIcon
          isActive={activePage === HOME || activePage === ''}
          children={<HomeSvg />}
          onClick={() => setPage(HOME)}
        />
      </Link>

      <ButtonIcon children={<FilterSvg />} onClick={OpenAsideFilter} />

      <Link to={`/${PLAY_LATER}`}>
        <ButtonIcon isActive={activePage === PLAY_LATER} children={<ClockSvg />} onClick={() => setPage(PLAY_LATER)} />
      </Link>

      <Link to={`/${PLAYED}`}>
        <ButtonIcon isActive={activePage === PLAYED} children={<PlayedSvg />} onClick={() => setPage(PLAYED)} />
      </Link>

      <Link to={`${FAVOURITE}`}>
        <ButtonIcon
          isActive={activePage === FAVOURITE}
          children={<FavouriteSvg />}
          onClick={() => setPage(FAVOURITE)}
        />
      </Link>
    </Container>
  );
};

const Container = styled.nav`
  position: fixed;
  z-index: 998;
  top: 20px;
  left: 15px;
  display: flex;
  gap: 15px;
  flex-flow: row wrap;
  align-content: center;
  justify-content: center;
  width: calc(100vw - 30px);
  padding: 10px;
  border-radius: 15px;

  &::before,
  &::after {
    content: '';
    position: fixed;
    z-index: -10;
  }

  &::before {
    left: 0;
    top: 0;
    width: 100%;
    height: 86px;
    background-color: var(--primaryBlack);
    opacity: 0.99;
  }

  &::after {
    top: 15px;
    left: 15px;
    height: 70px;
    width: calc(100vw - 30px);
    background-color: var(--secondaryBlack);
    border-radius: 15px;
    @media screen and (min-width: 448px) {
      width: calc(100vw - 50px);
    }
  }

  @media screen and (min-width: 1024px) {
    gap: 20px;
  }
`;
export default NavBar;

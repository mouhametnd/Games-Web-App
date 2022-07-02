import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Game from './Game';
import Loader from '../assets/svgs/Loader';
import pagesStrings from '../constants/pagesStrings';
import observeElement from '../helpers/oberveElement';
import getListOfGames from '../helpers/getListOfGames';
import { scrollBackActions } from '../store/slices/scrollBackSlice';
import SpanMessage from '../components/SpanMessage';

const { setShouldScrollBack } = scrollBackActions;
const { HOME } = pagesStrings;

const GamesWrapper = () => {
  const dispatch = useDispatch();
  const $containerGamesRef = useRef(null);
  const { games: gamesState, activePage: activePageState, requestPage, modalGame } = useSelector(state => state);

  const { games, loader, error } = gamesState;
  const { activePage } = activePageState;
  const { hasNextPage } = requestPage;

  useEffect(() => {
    if (loader || !games.length || !hasNextPage || (activePage !== HOME && activePage)) return;

    const $lastElementRef = $containerGamesRef.current.querySelector('article:last-child');
    observeElement($lastElementRef, () => getListOfGames(false));
  }, [gamesState]);

  useEffect(() => {
    if (!modalGame.isModalOpen) dispatch(setShouldScrollBack(true));
  }, [modalGame.isModalOpen]);

  const renderGames = () => {
    if (loader) return <Loader />;
    if (error) return <SpanMessage>{error.message}</SpanMessage>;
    if (!games.length) return <SpanMessage>No Games Found</SpanMessage>;

    const gamesArray = games.map(game => <Game key={game.id + game.slug} game={game} />);
    if (!hasNextPage) gamesArray.push(<SpanMessage key="no-more-games">No more games</SpanMessage>);
    return gamesArray;
  };

  return <Wrapper ref={$containerGamesRef} activePage={activePage} children={renderGames()} />;
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 60px;
  margin-top: ${({ activePage }) => (activePage === HOME || !activePage ? '700px' : '0px')};

  @media (min-width: 548px) {
    margin-top: ${({ activePage }) => (activePage === HOME || !activePage ? '580px' : '0px')};
  }
  @media screen and (min-width: 768px) {
    margin-top: ${({ activePage }) => (activePage === HOME || !activePage ? '520px' : '0px')};
  }
`;

export default GamesWrapper;
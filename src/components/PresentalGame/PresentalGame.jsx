import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Loader from '../../assets/svgs/Loader';
import API_KEY from '../../constants/API_KEY';
import Background from './Background';
import pagesStrings from '../../constants/pagesStrings';
import store from '../../store/store';
import { modalGameActions } from '../../store/slices/modalGameSlice';
import removeTagsFromText from '../../helpers/removeTagsFromText';
import SpanMessage from '../SpanMessage';

const { HOME } = pagesStrings;
const { setGame } = modalGameActions;
let refInterval = null;

const PresentalGame = () => {
  const dispatch = useDispatch();
  const [presentalGame, setPresentalGame] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [presentalGameTrailers, setPresentalGameTrailers] = useState([]);

  const handleClick = ({ target }) => {
    if (target.tagName === 'SECTION' || target.tagName === 'P')
      dispatch(setGame({ gameDetails: presentalGame, gameTrailers: presentalGameTrailers }));
  };

  const {
    games: { games },
    modalGame: { gameId },
  } = useSelector(state => state);

  const { name, rating, rating_top, playTime, description, esrb_rating, released, background_image, genres } =
    presentalGame;

  const videoSrc = presentalGameTrailers[0]?.data?.max;
  const year = released && released?.split('-')[0];
  const esrbRating = esrb_rating && esrb_rating.name;
  const genresStr =
    genres &&
    genres
      .reduce((acc, { name }) => {
        acc.push(name);
        return acc;
      }, [])
      .join(', ');

  const setRandomGame = async () => {
    try {
      const {
        activePage: { activePage },
        modalGame: { gameId },
      } = store.getState();

      if ((activePage !== HOME && activePage) || gameId) {
        clearTimeout(refInterval);
        refInterval = null;
        return;
      }

      setLoader(true);
      const games = store.getState().games.games;
      const randomNum = Math.floor(Math.random() * games.length);
      const randomId = games[randomNum].id;
      const response = await Promise.allSettled([
        axios.get(`https://api.rawg.io/api/games/${randomId}?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/games/${randomId}/movies?key=${API_KEY}`),
      ]);

      const [gameResponse, trailersResponse] = response;
      if (gameResponse.status === 'rejected') throw gameResponse;

      setPresentalGame(gameResponse.value.data);
      setPresentalGameTrailers(trailersResponse?.value?.data?.results || []);
      setLoader(false);
      setError(null);
      refInterval = setTimeout(() => setRandomGame(), 15000);
    } catch (error) {
      setError(error);
      setLoader(false);
      setPresentalGame({});
      setPresentalGameTrailers([]);
    }
  };

  useEffect(() => {
    if (!games.length || gameId || refInterval) return;

    refInterval = true;
    setRandomGame();
  }, [games, gameId]);

  const render = () => {
    if (loader) return <Loader />;
    if (error) return <SpanMessage>{error.message}</SpanMessage>;
    if (Object.keys(presentalGame).length < 2) return;

    return (
      <>
        <Background imgSrc={background_image} videoSrc={videoSrc} />
        <h4 className="presental-game__title">{name}</h4>
        <div className="presental-game__details-list">
          <span children={year || 'Unknown year'} />
          <span children="|" />
          <span children={rating + ' / ' + rating_top} />
          <span children="|" />
          <span className="span-box"> {esrbRating || 'Unknown ESRB rating'}</span>
          <span children="|" />
          <span> {playTime ? `${playTime}h` : 'Unknown playtime'}</span>
        </div>
        <p className="presental-game__description">{removeTagsFromText(description) || 'Unkown Description'}</p>
        <div className="presental-game__genres">
          <h4>Genres:</h4> <span>{genresStr || 'Unknown genres'}</span>
        </div>
      </>
    );
  };

  return <RootWrapper onClick={handleClick}>{render()}</RootWrapper>;
};

const RootWrapper = styled.section`
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  padding-block: 30px;
  margin-bottom: 20px;
  min-width: 80vw;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 100%;
    max-height: 600px;
  }

  & * {
    color: var(--primaryText);
  }
  & *:not(.presental-game__description) {
    pointer-events: none;
  }

  .presental-game {
    &__title {
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0px;
      padding: 0px;
    }

    &__details-list {
      display: flex;
      flex-flow: row wrap;
      gap: 10px;
      margin: 0px;
      padding: 0px;

      & span {
        font-size: 1rem;
        font-weight: 600;
        padding: 3px 3px;
        color: var(--special);
      }

      & .span-box {
        border: 1.6px solid var(--special);
        padding: 3px 3px;
      }

      @media screen and (min-width: 768px) {
        padding-inline: 10px;
      }
    }

    &__description {
      line-height: 140%;
      font-size: 0.9rem;
      max-width: 700px;
      max-height: 380px;
      height: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: transparent;
      }
    }

    &__genres {
      & h4 {
        margin: 0px;
        padding: 0px;
        color: var(--special);
        display: inline-block;
      }
      & span {
        font-size: 0.95rem;
        font-weight: 100;
        color: var(--special);
      }
    }
  }
`;

export default PresentalGame;

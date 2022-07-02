import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import filterStrings from '../../constants/filterStrings';
import getValuesFrom from '../../helpers/getValuesFromClosure';
import API_KEY from '../../constants/API_KEY';
import Loader from '../../assets/svgs/Loader';
import SpanMessage from '../SpanMessage';
import RecommendedGame from './RecommendedGame';

const { PLATFORMS, GENRES, PUBLISHERS, STORES, TAGS } = filterStrings;
const getValuesFromId = getValuesFrom('id');

const RecommendedGames = () => {
  const { platforms, publishers, genres, tags, stores } = useSelector(({ modalGame }) => modalGame.game.gameDetails);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);

        const gamePlatformsStr = getValuesFromId({ array: platforms, propName: PLATFORMS })
          .values.slice(0, 3)
          .join(',');
        const gamePublishersStr = getValuesFromId({ array: publishers, propName: PUBLISHERS })
          .values.slice(0, 3)
          .join(',');
        const gameGenresStr = getValuesFromId({ array: genres, propName: GENRES }).values.slice(0, 3).join(',');
        const gameTagsStr = getValuesFromId({ array: tags, propName: TAGS }).values.slice(0, 3).join(',');
        const gameStoresStr = getValuesFromId({ array: stores, propName: STORES }).values.slice(0, 3).join(',');

        const platformsSearch = gamePlatformsStr && `${PLATFORMS}=${gamePlatformsStr}`;
        const publishersSearch = gamePublishersStr && `${PUBLISHERS}=${gamePublishersStr}`;
        const genresSearch = gameGenresStr && `${GENRES}=${gameGenresStr}`;
        const tagsSearch = gameTagsStr && `${TAGS}=${gameTagsStr}`;
        const storesSearch = gameStoresStr && `${STORES}=${gameStoresStr}`;

        const responses = await axios(
          `https://api.rawg.io/api/games?key=${API_KEY}&${platformsSearch}&${publishersSearch}&${genresSearch}&${tagsSearch}&${storesSearch}`
        );

        setLoader(false);
        setRecommendedGames(responses.data.results);
        setError(null);
      } catch (error) {
        setError(error);
        setRecommendedGames([]);
        setLoader(false);
      }
    })();
  }, []);

  const render = () => {
    if (loader) return <Loader />;
    if (error) return <SpanMessage>{error.message}</SpanMessage>;
    if (!recommendedGames.length) return;

    return (
      <RootWrapper>
        <h3>Recommended Games</h3>
        <GameRecommendedWrapper>
          {recommendedGames.map(recommendedGame => (
            <RecommendedGame key={recommendedGame.id + recommendedGame.name} recommendedGame={recommendedGame} />
          ))}
        </GameRecommendedWrapper>
      </RootWrapper>
    );
  };

  return render();
};

const RootWrapper = styled.section`
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-bottom: 100px;
  & h3 {
    color: var(--primaryText);
    padding: 0px;
    margin: 0px;
  }

  & h4 {
    position: absolute;
    bottom: 20px;
    width: 100%;
    padding: 0px;
    margin: 0px;
    color: var(--primaryText);
    text-align: center;
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }
`;

const GameRecommendedWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  height: max-content;
  width: 100%;
  margin: 0px;
  padding: 0px;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  @media screen and (min-width: 1024px) {
    max-width: 97vw;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

export default RecommendedGames;

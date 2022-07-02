import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CloseSvg from '../../assets/svgs/CloseSvg';
import ButtonIcon from '../ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import { modalGameActions } from '../../store/slices/modalGameSlice';
import RecomendedGames from './RecommendedGames';
import ModalListDetails from './ModalListDetails';
import ModalTrailer from './ModalTrailer';
import ModalBasicDetails from './ModalBasicDetails';
import SpanMessage from '../SpanMessage';
import Loader from '../../assets/svgs/Loader';
import API_KEY from '../../constants/API_KEY';

const { closeModal, setGame } = modalGameActions;

const Modal = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { gameId, game, isModalOpen } = useSelector(({ modalGame }) => modalGame);
  const closeModalClick = () => dispatch(closeModal());

  useEffect(() => {
    if (!isModalOpen || Object.keys(game).length) return;

    (async () => {
      try {
        setLoader(true);
        const responses = await Promise.allSettled([
          axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`),
          axios.get(`https://api.rawg.io/api/games/${gameId}/movies?key=${API_KEY}`),
        ]);

        if (responses[0].status === 'rejected') throw { message: 'Game not found' };

        const gameDetails = responses[0].value.data;
        const gameTrailers = responses[1].value.data.results;

        setError(null);
        setLoader(false);
        dispatch(setGame({ gameDetails, gameTrailers }));
      } catch (error) {
        setLoader(false);
        setError(error);
      }
    })();
  }, [gameId]);

  const render = () => {
    if (loader) return <RootWrapper flex={true} children={<Loader />} />;

    if (!isModalOpen || !Object.keys(game).length) return;

    if (error) return <RootWrapper flex={true} children={<SpanMessage>{error.message}</SpanMessage>} />;

    return (
      <RootWrapper>
        <ButtonIconWrapper>
          <ButtonIcon children={<CloseSvg />} isActive={true} onClick={closeModalClick} size={'22px'} />
        </ButtonIconWrapper>

        <BackgroundWrapper>
          <img src={game.gameDetails.background_image} alt={game.gameDetails.name} />
        </BackgroundWrapper>

        <MainWrapper>
          <ModalBasicDetails />
          <GridWrapper>
            <ModalListDetails />
            <GridItemWrapper>
              <ModalTrailer />
              <RecomendedGames />
            </GridItemWrapper>
          </GridWrapper>
        </MainWrapper>
      </RootWrapper>
    );
  };

  return render();
};

const RootWrapper = styled.section`
  display: ${({ flex }) => flex && 'flex'};
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  min-width: 100vw;
  min-height: 100vh;
  padding: 0px;
  margin: 0px;

  & .loader-ring {
    margin: auto;
  }
  & img {
    max-height: 300px;
  }
`;

const ButtonIconWrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 15px;
  left: 20px;
`;

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0% 60%, var(--primaryBlack));
  }
`;

const MainWrapper = styled.div`
  max-width: 660px;
  margin-inline: auto;
  @media screen and (min-width: 1024px) {
    max-width: none;
    margin-inline: 0px;
  }
`;

const GridWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 500px 1fr;
  }
`;

const GridItemWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

export default Modal;

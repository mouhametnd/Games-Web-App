import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { noBackgroundSrc } from '../../constants/no-backgroundSrc';
import NO_DETAIL_TEXT from '../../constants/noDetailText';
import removeTagsFromText from '../../helpers/removeTagsFromText';
import ContainerActions from '../ContainerActions';

const ModalBasicDetails = () => {
  const { background_image_additional, name, released, id, description } = useSelector(
    ({ modalGame }) => modalGame.game.gameDetails
  );
  const date = released?.split('-')?.join(' ');

  return (
    <RootWrapper>
      <ImageWrapper>
        <img src={background_image_additional || noBackgroundSrc} alt={name} />
      </ImageWrapper>

      <DetailsWrapper>
        <TitleWrapper>
          <h2>{name || NO_DETAIL_TEXT + ' title'}</h2>
          <time>{date || NO_DETAIL_TEXT + ' release'}</time>
        </TitleWrapper>

        <ActionsWrapper children={<ContainerActions id={id} />} />
        <p>{removeTagsFromText(description) || NO_DETAIL_TEXT + ' description'}</p>
      </DetailsWrapper>
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  margin-top: 40px;
  padding: 10px 20px;

  @media screen and (min-width: 1024px) {
    flex-flow: row;
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  & h2 {
    color: var(--primaryText);
    margin: 0px;
    padding: 0px;
  }

  & time {
    color: var(--primaryText);
    margin: 0px;
    padding: 0px;
    align-self: center;
  }

  & p {
    color: var(--primaryText);
    margin: 0px;
    padding: 0px;
    font-size: clamp(0.9rem, 2vw, 1rem);
    line-height: 150%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin-inline: auto;
  @media screen and (min-width: 1024px) {
    min-width: 460px;
    width: 460px;
  }
`;

const DetailsWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    padding-left: 18px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  width: max-content;
  margin-inline: auto;

  @media screen and (min-width: 1024px) {
    margin-inline: 0px;
  }
`;

const ActionsWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    justify-self: start;
    width: max-content;
  }
`;

export default ModalBasicDetails;

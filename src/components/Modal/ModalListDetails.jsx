import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ClockSvg from '../../assets/svgs/ClockSvg';
import StarSvg from '../../assets/svgs/starSvg';
import filterStrings from '../../constants/filterStrings';
import NO_DETAIL_TEXT from '../../constants/noDetailText';
import getValuesFrom from '../../helpers/getValuesFromClosure';

const { PLATFORMS, STORES, TAGS, GENRES, PUBLISHERS } = filterStrings;
const getValuesFromName = getValuesFrom('name');

const ModalListDetails = () => {
  const { rating, rating_top, playtime, metacritic, released, platforms, stores, tags, genres, publishers } =
    useSelector(({ modalGame }) => modalGame.game.gameDetails);
    const date = released?.split('-')?.join(' ');


  const renderArrayFacts = () => {
    const arrayFacts = [
      getValuesFromName({ array: platforms, propName: PLATFORMS }),
      getValuesFromName({ array: stores, propName: STORES }),
      getValuesFromName({ array: tags, propName: TAGS }),
      getValuesFromName({ array: genres, propName: GENRES }),
      getValuesFromName({ array: publishers, propName: PUBLISHERS }),
    ];

    return arrayFacts.map(({ propName, values }) => (
      <FactItemWrapper key={propName + values.join(', ')}>
        <FactItemTitle children={propName} />
        <ValueWrapper>
          {values.length ? (
            values.map((value, index) => (
              <FactItemValue key={value}>
                {value}
                {index < values.length - 1 && ', '}
              </FactItemValue>
            ))
          ) : (
            <FactItemValue>{NO_DETAIL_TEXT + propName}</FactItemValue>
          )}
        </ValueWrapper>
      </FactItemWrapper>
    ));
  };

  return (
    <RootWrapper>
      <FactsWrapper>
        <SpecialFactWrapper>
          <StarSvg />
          <FactItemTitle children="Rating:" />
          <FactItemValue>{rating ? `${rating} /  ${rating_top}` : NO_DETAIL_TEXT + 'rating'}</FactItemValue>
        </SpecialFactWrapper>
      </FactsWrapper>

      <FactsWrapper>
        <SpecialFactWrapper>
          <ClockSvg />
          <FactItemTitle children="Playtime:" />
          <FactItemValue>{playtime ? `${playtime}h` : NO_DETAIL_TEXT + 'playtime'}</FactItemValue>
        </SpecialFactWrapper>
      </FactsWrapper>

      <FactsWrapper>
        <FactListWrapper>
          <FactItemWrapper>
            <FactItemTitle children="Metacritic:" />
            <FactItemValue>{metacritic || NO_DETAIL_TEXT + 'metacritic'}</FactItemValue>
          </FactItemWrapper>

          <FactItemWrapper>
            <FactItemTitle children="Released:" />
            <FactItemValue>{date || NO_DETAIL_TEXT + 'released'}</FactItemValue>
          </FactItemWrapper>

          {renderArrayFacts()}
        </FactListWrapper>
      </FactsWrapper>
    </RootWrapper>
  );
};

export default ModalListDetails;

const RootWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  padding: 10px 20px;
`;

const SpecialFactWrapper = styled.div`
  display: flex;

  & svg,
  & path {
    width: 22px;
    height: 22px;
    fill: var(--special);
  }

  & span {
    padding-left: 10px;
    align-self: center;
  }
`;

const FactsWrapper = styled.div`
  padding: 16px;
  background-color: var(--secondaryBlack);
  border-radius: 10px;
  box-shadow: 0px 0px 10px var(--secondaryBlack);
`;

const FactListWrapper = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

const FactItemWrapper = styled.li`
  display: flex;
  flex-flow: column;
  gap: 10px;
`;

const FactItemTitle = styled.span`
  text-transform: capitalize;
  color: var(--special);
  height: max-content;
`;

const FactItemValue = styled.span`
  font-size: 0.8rem;
  height: max-content;
  color: var(--primaryText);
`;

const ValueWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
`;

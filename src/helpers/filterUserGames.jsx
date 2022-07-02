import filterStrings from '../constants/filterStrings';
import getValuesFrom from './getValuesFromClosure';

const { SEARCH, ORDERING, GENRES, PLATFORMS, PUBLISHERS, STORES, TAGS } = filterStrings;
const getValuesFromId = getValuesFrom('id');

// This function uses the current filter state to filter the user games list. It's used in pages like favourites, play later and played to make a manual filter.

const filterUserGames = (currentFilters, games) => {
  const filterObj = Object.values(currentFilters).reduce((acc, curr) => {
    const { propName, value } = curr;
    if (propName === ORDERING) return acc;

    if (propName === SEARCH) {
      acc[propName] = value.toLowerCase();
      return acc;
    }

    acc[propName] = value.map(({ id }) => id);
    return acc;
  }, {});

  const gamesFiltered = games.filter(game => {
    const { name, genres, platforms, publishers, stores, tags } = game;

    const filterValidation = [];
    const gameFilters = [
      getValuesFromId({ array: genres, propName: GENRES }),
      getValuesFromId({ array: platforms, propName: PLATFORMS }),
      getValuesFromId({ array: publishers, propName: PUBLISHERS }),
      getValuesFromId({ array: stores, propName: STORES }),
      getValuesFromId({ array: tags, propName: TAGS }),
    ];

    const isNameValid = name.toLowerCase().startsWith(filterObj[SEARCH].trim());

    if (!isNameValid) return false;

    filterValidation.push(isNameValid);

    gameFilters.forEach(({ propName, values }) => {
      if (!filterObj[propName].length) return filterValidation.push(true);
      if (!values.length) return filterValidation.push(false);

      const isValid = filterObj[propName].every(id => values.includes(id));
      filterValidation.push(isValid);
    });

    return filterValidation.includes(false) ? false : true;
  });

  return gamesFiltered;
};

export default filterUserGames;

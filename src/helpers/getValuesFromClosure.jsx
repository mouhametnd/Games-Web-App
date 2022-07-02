import filterStrings from '../constants/filterStrings';

const { PLATFORMS, STORES } = filterStrings;

// This is a closure that allows to access some specific values of an array of objects.   
const getValuesFrom =
  prop =>
  ({ array, propName }) => {
    if (!array?.length) return { propName, values: [] };
    let values = null;

    if (propName !== PLATFORMS && propName !== STORES) {
      values = array.map(item => item[prop]);
      return { propName, values, prop };
    }

    const str = propName === PLATFORMS ? 'platform' : 'store';
    values = array.map(({ [str]: item }) => item[prop]);
    
    return { propName, values, prop };
  };

export default getValuesFrom;

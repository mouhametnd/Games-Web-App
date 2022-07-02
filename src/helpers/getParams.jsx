// This function is used to get a url search parrams using the currentFilter stat

const getRequestParams = currentFilter => {
  const params = {};
  Object.values(currentFilter).forEach(({ propName, value }) => {
    if (!value.length) return;

    if (value instanceof Array) {
      value = value
        .reduce((acc, { id }) => {
          acc.push(id);
          return acc;
        }, [])
        .join(',');
    }

    params[propName] = value;
  });

  const urlSearchParams = new URLSearchParams(params);
  return urlSearchParams.toString().replace(/%2C/g, ',');
};

export default getRequestParams;

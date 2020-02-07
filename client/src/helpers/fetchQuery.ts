type GQLVars = {
  [key: string]: number | string | boolean;
}

const url = process.env.REACT_APP_GRAPHQL_API;

// reject at application start
if (!url) {
  throw new Error('GRAPHQL_API_URL_NOT_PROVIDED');
}


const fetchHeaders = {
  'content-type': 'application/json',
};

export const fetchQuery = (query: string, variables?: GQLVars) => {

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: fetchHeaders,
  });
}

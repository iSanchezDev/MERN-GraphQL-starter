import {createApolloFetch} from 'apollo-fetch';

const uri = 'http://localhost:3001';
const apolloFetchService = createApolloFetch({ uri });

export function fetchData(query, variables, operationName) {
  return apolloFetchService({ query, variables, operationName })
    .then(res => res)
    .catch(err => err);
}

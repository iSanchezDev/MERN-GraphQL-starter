
import { GraphQLClient } from 'graphql-request'
import LocalStorage from './../../store/localStorage';

const url = 'http://localhost:3001/graphql';

/**
 * Common fetcher for GraphQL Client
 * @param {string} query
 * @param {object} variables
 */
export async function fetchGraphQlData(query, variables) {

  const token = LocalStorage.getToken();

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  try {
    return await graphQLClient.request(query, variables);
  } catch (error) {
    console.error('GraphQLClient Error:', error)
  }
}

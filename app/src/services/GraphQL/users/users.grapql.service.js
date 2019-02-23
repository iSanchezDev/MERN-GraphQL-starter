
import {fetchGraphQlData} from '../Base.graphql'

/**
 * Query example to fetch users from Graphql
 * @param {object} data (query parameters)
 */
export function fetchUsers(data) {

  const query = `
    query GetAllUsers {
      users {
        email,
        firstName,
        language
      }
    }
  `;

  const variables = {...data};

  return fetchGraphQlData(query, variables).then(res => res)
}

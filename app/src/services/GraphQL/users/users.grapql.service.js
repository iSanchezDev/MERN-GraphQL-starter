
import {fetchGraphQlData} from '../Base.graphql'

/**
 * Query example to fetch users from Graphql
 * You can follow this example to complete the implementation
 * @param {object} data (query parameters)
 */
export function GetAllUsers(data) {

  const query = `
    query GetAllUsers {
      users {
        email,
        username,
        language
      }
    }
  `;

  const variables = {...data};

  return fetchGraphQlData(query, variables).then(res => res)
}

/**
 * Mutation example to add users using GraphQL
 * @param {object} data (variables for graphql)
 */
export function addUser(data) {

  const query = `
    mutation AddUser (
        $email: String!,
        $password: String!,
        $username: String!,
        $language: String
      ) {
       addUser(input: {
          email: $email,
          password: $password,
          username: $username,
          language: $language
       }){
        email
       }
    }
    `;

  const variables = {...data};

  return fetchGraphQlData(query, variables).then(res => res)
}

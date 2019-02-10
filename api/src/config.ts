/**
 * Replace these variables with environment variables
 * so that it reduces friction.
 */
export default {
  mongodb: {
    uri: 'mongodb://localhost/graphql-demo',
  },
  token: {
    secret: 'theSuperSecretPassword',
    expiresIn: '3h'
  }
};

import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import config from './config';
import { merge } from 'lodash';
import mongoose from 'mongoose';
import rootTypeDefs from './root';
import User from './entities/user/user.model';
import { userResolvers, userTypeDefs } from './entities/user/user.schema';
import {workspaceResolvers, workspaceTypeDefs} from './entities/workspace/workspace.schema';

/**
 * Connect to the mongodb database
 */
mongoose.connect(
  config.mongodb.uri,
  { useNewUrlParser: true }
);

/**
 * Schema declaration for GraphQL types and resolvers
 */
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs, workspaceTypeDefs],
  resolvers: merge(userResolvers, workspaceResolvers),
});

/**
 * Apollo server to send your queries
 */
const server = new ApolloServer({
  schema,
  formatError(error) {
    console.warn(error);
    return error;
  },
  async context({ req }) {
    const token = req && req.headers && req.headers.authorization;
    if (token) {
      const data: any = jwt.verify(token, config.token.secret);

      if (!data) {
        throw new AuthenticationError('You must provide a valid login');
      }
      const user = data.id ? await User.findById(data.id) : null;
      return { user };
    }
    // TODO --- UNCOMMENT LINE BELOW TO REQUIRE A TOKEN ACCESS ----
    // throw new AuthenticationError('You must be logged in');
  },
});


server.listen().then(({ url }) => {
  console.log(`🔥🚀 Server ready at ${url}`);
});

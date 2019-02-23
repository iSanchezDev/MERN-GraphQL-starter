
import express from 'express';
import cors from 'cors';
import * as _ from 'lodash';
import schema from './schema';
import {allowedQueries} from './schema/config';
import config from './config';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import { AuthenticationError } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import {verifyToken} from './controllers/auth/auth.controller';

const port = process.env.PORT || 3001;

/**
 * Mongodb database connection
 */
mongoose.connect(
  config.mongodb.uri,
  { useNewUrlParser: true }
);

/*
 * Express config
 */
const app = express();
app.use(cors());

/*
 * Customize your routes
 */
app.use('/auth', authRoutes);

const server = new ApolloServer({
  schema,
  formatError(error) {
    console.warn(error);
    return error;
  },
  async context({ req }) {

    // graphql functions allowed without token access
    const query = req.body.operationName;
    const allowed = _.find(allowedQueries, (name) => name === query);
    if (allowed) {
      return true
    }

    // Authorization token
    const token = req && req.headers && req.headers.authorization;
    if (token) {
      const user: any = await verifyToken(token);
      if (user) {
        return {user};
      }
    }

    throw new AuthenticationError('You must be logged in!');
  },
});

server.applyMiddleware({app});

app.listen(port,  () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
  console.log(`🔥 Apollo Web Client ready at http://localhost:${port}${server.graphqlPath}`);
});

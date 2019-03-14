
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
import {checkUserAuthenticated, verifyToken} from './controllers/auth/auth.controller';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3001;

/*
 * Express config
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());

/*
 * Customize your routes
 */
app.use('/auth', authRoutes);

/*
 * Apollo server config
 */
const server = new ApolloServer({
  schema,
  formatError(error) {
    console.warn(error);
    return error;
  },
  async context({ req, res }) {

    // Graphql functions allowed without token access
    const query = req.body.operationName;
    if (query) {
      const allowed = _.find(allowedQueries, (name) => query.toLowerCase() === name.toLowerCase());
      if (allowed) {
        return true;
      }
    }

    // Authorization token
    const token = _.get(req, 'headers.authorization');
    const auth: any = await checkUserAuthenticated(token);
    if (auth.user) {
      return auth.user;
    }

    throw new AuthenticationError('You must be logged in!');
  },
});

server.applyMiddleware({app});

/**
 * Mongodb database and server connection
 */
mongoose.connect(config.mongodb.uri, { useNewUrlParser: true }).then(
  () => {
    console.log(`🐵 Mongodb at ${config.mongodb.uri}`);
    app.listen(port,  () => {
      console.log(`⚙️ Server ready at http://localhost:${port}`);
      console.log(`🚀 Apollo Web Client ready at http://localhost:${port}${server.graphqlPath}`);
    });
  }, () => {
    throw new Error('Mongodb is not running')
  }
);

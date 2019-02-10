
import express from 'express'
import cors from 'cors'
import schema from './schema'
import config from './config'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import graphqlMiddleware from './middleware/graphql.middleware';

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV === 'development';

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


/*
 * GraphQL using express
 */
app.use(graphqlMiddleware);

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema,
    graphiql: dev,
    context: {
      user: req.user,
    }
  }))
);

app.listen(port,  () => {
  console.log(`🔥🚀 Server ready at http://localhost:${port}`);
});

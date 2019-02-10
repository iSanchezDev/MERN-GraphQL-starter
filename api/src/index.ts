
import express from 'express'
import cors from 'cors'
import schema from './schema'
import config from './config'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes'
import { verifyToken } from './controllers/auth/auth.controller';

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV === 'development';

/*
 * Express config
 */
const app = express();
app.use(cors());

/**
 * Mongodb database connection
 */
mongoose.connect(
  config.mongodb.uri,
  { useNewUrlParser: true }
);

/*
 * Place your custom routes here
 */
app.use('/auth', authRoutes);

/*
 * Auth middleware
 */
app.use('/graphql', async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const user: any = await verifyToken(token);
    if (user) {
      req.user = user;
      next()
    }
  } catch (e) {
    res.status(401).json({
      message: e.message
    })
  }
});

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

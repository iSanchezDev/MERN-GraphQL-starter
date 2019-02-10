
import express from 'express'
import bodyParser from 'body-parser'
import schema from './schema'
import config from './config'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose';
import { createToken, verifyToken } from './controllers/auth/auth'

const app = express();
const port = process.env.PORT || 3001;
const jsonParser = bodyParser.json();
const dev = process.env.NODE_ENV === 'development';

/**
 * Mongodb database connection
 */
mongoose.connect(
  config.mongodb.uri,
  { useNewUrlParser: true }
);

/*
 * Allow-cors middleware
 */
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/login', jsonParser, async (req, res) => {
  if (req.method === 'POST') {
    const token = await createToken(req.body.email, req.body.password);
    if (token) {
      res.status(200).json({token})
    } else {
      res.status(403).json({
        message: 'Login failed! Invalid credentials :('
      })
    }
  }
});

app.use('/verifyToken', jsonParser, async (req, res) => {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization;
      const user = await verifyToken(token);
      res.status(200).json({user});
    } catch (e) {
      // unauthorized token
      res.status(401).json({
        message: e.message
      })
    }
  }
});

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

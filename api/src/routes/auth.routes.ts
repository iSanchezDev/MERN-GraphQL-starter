import express from 'express';
import bodyParser from 'body-parser';
import {createToken, verifyToken} from '../controllers/auth/auth.controller';

const jsonParser = bodyParser.json();
const router = express.Router();


router.post('/login', jsonParser, async (req, res) => {
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

router.post('/verifyToken', jsonParser, async (req, res) => {
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

export default router;

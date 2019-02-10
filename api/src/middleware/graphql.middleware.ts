import express from 'express';
import { verifyToken } from '../controllers/auth/auth.controller';

const router = express.Router();

/*
 * Middleware to prevent the usability of unauthenticated users
 */

router.all('/graphql', async (req, res, next) => {

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

export default router;

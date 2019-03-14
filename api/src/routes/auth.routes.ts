import express from 'express';
import {login, verifyToken} from '../controllers/auth/auth.controller';

const router = express.Router();


router.post('/login', login);

router.post('/verifyToken', verifyToken);

export default router;

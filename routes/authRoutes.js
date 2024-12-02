import express from 'express';
import { signUp, signIn, googleOAuthStart, googleOAuthCallback } from '../controller/authController';

const router = express.Router();

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/google/start', googleOAuthStart);

router.post('/google/callback', googleOAuthCallback);

export default router;

import express from 'express';

import { createChat, getUserChats } from '../controllers/chat.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createChat);
router.get('/:userId',verifyToken, getUserChats);

export default router;
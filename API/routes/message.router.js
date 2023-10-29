import express from 'express';
import { createMessage, getMessages } from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/', verifyToken, createMessage);
router.get('/:chatId', verifyToken, getMessages);

export default router;
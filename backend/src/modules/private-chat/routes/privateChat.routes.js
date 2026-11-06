import { Router } from 'express';
import { getAllChats, getChatById, sendMessage } from '../controllers/privateChat.controller.js';
import { validateSendMessage } from '../middlewares/validateSendMessage.js';

const router = Router();

/**
 * @route   GET /api/chats
 * @desc    Retrieve all private chat conversations
 * @query   search  {string}  Filter contacts by name (case-insensitive)
 * @query   sortBy  {string}  'updatedAt' (default) | 'name'
 * @query   order   {string}  'desc' (default) | 'asc'
 * @access  Public (auth guard to be added when auth module is built)
 */
router.get('/', getAllChats);

/**
 * @route   GET /api/chats/:chatId
 * @desc    Retrieve a single private chat with its full message thread
 * @param   chatId  {string}  e.g. chat_1
 * @access  Public
 */
router.get('/:chatId', getChatById);

/**
 * @route   POST /api/chats/:chatId/messages
 * @desc    Send a new message to a private chat
 * @param   chatId  {string}  e.g. chat_1
 * @body    text    {string}  Required — message text (1-2000 chars)
 * @body    type    {string}  Optional — 'text' (default) | 'audio'
 * @access  Public
 */
router.post('/:chatId/messages', validateSendMessage, sendMessage);

export default router;

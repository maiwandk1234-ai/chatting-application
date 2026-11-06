import { ApiResponse } from '../../../utils/apiResponse.js';
import privateChatService from '../services/privateChat.service.js';

/**
 * Private Chat Controller
 * Handles HTTP request parsing, delegates to the service layer,
 * and returns standardized JSON responses.
 */

/**
 * GET /api/chats
 * Returns all private chats for the current user.
 *
 * Query params:
 *   search  {string}  - filter by contact name
 *   sortBy  {string}  - 'updatedAt' (default) | 'name'
 *   order   {string}  - 'desc' (default) | 'asc'
 */
export const getAllChats = async (req, res, next) => {
  try {
    const { search = '', sortBy = 'updatedAt', order = 'desc' } = req.query;

    const { total, chats } = await privateChatService.getAllChats({ search, sortBy, order });

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Chats retrieved successfully',
      data: { total, chats },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/chats/:chatId
 * Returns a single private chat and its full message thread.
 *
 * Route params:
 *   chatId {string} - e.g. "chat_1"
 */
export const getChatById = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const { chat, messages, messageCount } = await privateChatService.getChatById(chatId);

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Chat retrieved successfully',
      data: { chat, messages, messageCount },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/chats/:chatId/messages
 * Sends a new message to a private chat.
 *
 * Body (JSON):
 *   text  {string}  Required — the message content (1–2000 chars)
 *   type  {string}  Optional — 'text' (default) | 'audio'
 */
export const sendMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { text, type } = req.body;   // already trimmed & validated by middleware

    const newMessage = await privateChatService.sendMessage(chatId, { text, type });

    return ApiResponse.success(res, {
      statusCode: 201,
      message: 'Message sent successfully',
      data: { message: newMessage },
    });
  } catch (error) {
    next(error);
  }
};

export default { getAllChats, getChatById, sendMessage };

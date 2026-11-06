import { MOCK_CHATS, MOCK_MESSAGES } from '../data/chats.mock.js';
import { AppError } from '../../../utils/appError.js';

/**
 * Private Chat Service
 * Business logic layer for the private chats module.
 * All data is served from in-memory mocks until MongoDB is connected.
 * When ready, replace each method body with Mongoose queries.
 */
export class PrivateChatService {
  /**
   * Retrieve all private chats, optionally filtered and sorted.
   *
   * @param {object} options
   * @param {string} [options.search]       - Filter contacts by name (case-insensitive)
   * @param {string} [options.sortBy]       - 'updatedAt' (default) | 'name'
   * @param {'asc'|'desc'} [options.order]  - Sort direction, default 'desc'
   * @returns {Promise<{ total: number, chats: object[] }>}
   */
  async getAllChats({ search = '', sortBy = 'updatedAt', order = 'desc' } = {}) {
    let chats = [...MOCK_CHATS];

    // Optional name-based search filter
    if (search) {
      const term = search.toLowerCase();
      chats = chats.filter((c) => c.contact.name.toLowerCase().includes(term));
    }

    // Sorting
    chats.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'name') {
        valA = a.contact.name.toLowerCase();
        valB = b.contact.name.toLowerCase();
      } else {
        // Default: sort by most-recently updated
        valA = new Date(a.updatedAt).getTime();
        valB = new Date(b.updatedAt).getTime();
      }
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return { total: chats.length, chats };
  }

  /**
   * Retrieve a single chat by its ID, with its full message thread.
   *
   * @param {string} chatId
   * @returns {Promise<{ chat: object, messages: object[], messageCount: number }>}
   * @throws {AppError} 404 if no chat with that ID exists
   */
  async getChatById(chatId) {
    const chat = MOCK_CHATS.find((c) => c.id === chatId);

    if (!chat) {
      throw new AppError(`Chat with id "${chatId}" not found.`, 404);
    }

    const messages = MOCK_MESSAGES[chatId] ?? [];

    return {
      chat,
      messages,
      messageCount: messages.length,
    };
  }

  /**
   * Send a new message to an existing private chat.
   *
   * Validates the chat exists, then:
   *   1. Generates a collision-resistant message ID.
   *   2. Builds the full message object with an ISO timestamp.
   *   3. Appends the message to the in-memory MOCK_MESSAGES store.
   *   4. Updates the chat's `lastMessage` and `updatedAt` fields
   *      so GET /api/chats reflects the new activity immediately.
   *
   * When MongoDB is wired, replace the in-memory mutations with:
   *   - Message.create(newMessage)
   *   - Chat.findByIdAndUpdate(chatId, { lastMessage, updatedAt })
   *
   * @param {string} chatId        - Target chat ID
   * @param {object} payload
   * @param {string} payload.text  - Message text (already trimmed by middleware)
   * @param {string} payload.type  - 'text' | 'audio' (default 'text')
   * @returns {Promise<object>}    The newly created message object
   * @throws {AppError} 404 if the chat doesn't exist
   */
  async sendMessage(chatId, { text, type = 'text' }) {
    // ── 1. Verify the chat exists ─────────────────────────────────────────
    const chat = MOCK_CHATS.find((c) => c.id === chatId);
    if (!chat) {
      throw new AppError(`Chat with id "${chatId}" not found.`, 404);
    }

    // ── 2. Generate a unique message ID ──────────────────────────────────
    //    Format:  msg_<chatId>_<timestamp-ms>_<4-char random hex>
    //    Avoids collisions even if two messages arrive in the same millisecond.
    const randomSuffix = Math.random().toString(16).slice(2, 6);
    const messageId = `msg_${chatId}_${Date.now()}_${randomSuffix}`;

    // ── 3. Build the new message object ──────────────────────────────────
    const now = new Date().toISOString();
    /** @type {import('../types/chat.types.js').Message} */
    const newMessage = {
      id: messageId,
      chatId,
      type,
      sender: 'me',       // replaced by req.user.id once auth module is added
      text,
      status: 'sent',
      timestamp: now,
      reaction: null,
    };

    // ── 4. Persist to in-memory store ─────────────────────────────────────
    if (!MOCK_MESSAGES[chatId]) {
      MOCK_MESSAGES[chatId] = [];
    }
    MOCK_MESSAGES[chatId].push(newMessage);

    // ── 5. Update the parent chat's lastMessage + updatedAt ───────────────
    chat.lastMessage = {
      id: messageId,
      type,
      text,
      sender: 'me',
      status: 'sent',
      timestamp: now,
    };
    chat.updatedAt = now;

    return newMessage;
  }
}

// Export a singleton so the same instance is reused across imports
export default new PrivateChatService();

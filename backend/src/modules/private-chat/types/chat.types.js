/**
 * @typedef {Object} LastMessage
 * @property {string} id
 * @property {'text'|'audio'|'reaction'|'reaction_received'|'call_log'} type
 * @property {string} text
 * @property {string} sender        - 'me' | 'contact'
 * @property {'sent'|'delivered'|'read'} status
 * @property {string} timestamp     - ISO 8601
 * @property {string} [duration]    - audio only
 * @property {string} [reactionEmoji]
 * @property {string} [reactedTo]
 * @property {string} [callType]    - 'voice' | 'video'
 */

/**
 * @typedef {Object} Contact
 * @property {string} id
 * @property {string} name
 * @property {string} phone
 * @property {string} about
 * @property {string|null} avatarUrl
 * @property {boolean} isOnline
 */

/**
 * @typedef {Object} Chat
 * @property {string} id
 * @property {'private'} type
 * @property {Contact} contact
 * @property {boolean} isPinned
 * @property {number} unreadCount
 * @property {LastMessage} lastMessage
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} chatId
 * @property {'text'|'audio'|'call_log'} type
 * @property {'me'|'contact'} sender
 * @property {string} [text]
 * @property {'sent'|'delivered'|'read'} status
 * @property {string} timestamp     - ISO 8601
 * @property {string|null} reaction
 * @property {string} [duration]    - audio
 * @property {string|null} [audioUrl]
 * @property {string} [callType]    - call_log
 */

export default {};


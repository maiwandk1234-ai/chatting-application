/**
 * Private Chat Model (Schema Template for MongoDB / Mongoose)
 *
 * NOTE: Database connection is not yet configured.
 * When Mongoose is integrated, convert this definition into a Mongoose Schema:
 *
 * Example Schema Structure:
 * - participants: [ { type: Schema.Types.ObjectId, ref: 'User', required: true } ]
 * - lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }
 * - createdAt: Date
 * - updatedAt: Date
 *
 * Message Subdocument / Collection Structure:
 * - sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }
 * - recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true }
 * - text: String
 * - mediaUrl: String
 * - mediaType: { type: String, enum: ['image', 'video', 'audio', 'document'] }
 * - status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' }
 * - reactions: [ { user: ObjectId, emoji: String } ]
 */

export const PrivateChatModel = {
  name: 'PrivateChat',
  status: 'pending_database_setup',
};

export default PrivateChatModel;


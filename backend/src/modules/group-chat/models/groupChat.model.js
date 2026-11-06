/**
 * Group Chat Model (Schema Template for MongoDB / Mongoose)
 *
 * NOTE: Database connection is not yet configured.
 * When Mongoose is integrated, convert this definition into a Mongoose Schema:
 *
 * Example Schema Structure:
 * - name: { type: String, required: true, trim: true }
 * - description: { type: String, default: '' }
 * - avatarUrl: { type: String, default: '' }
 * - createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
 * - admins: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
 * - members: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
 * - lastMessage: { type: Schema.Types.ObjectId, ref: 'GroupMessage' }
 * - createdAt: Date
 * - updatedAt: Date
 */

export const GroupChatModel = {
  name: 'GroupChat',
  status: 'pending_database_setup',
};

export default GroupChatModel;


/**
 * Status (Story) Model (Schema Template for MongoDB / Mongoose)
 *
 * NOTE: Database connection is not yet configured.
 * When Mongoose is integrated, convert this definition into a Mongoose Schema:
 *
 * Example Schema Structure:
 * - user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
 * - type: { type: String, enum: ['text', 'image', 'video'], default: 'image' }
 * - mediaUrl: { type: String }
 * - caption: { type: String, default: '' }
 * - backgroundColor: { type: String } // for text status
 * - viewers: [
 *     {
 *       user: { type: Schema.Types.ObjectId, ref: 'User' },
 *       viewedAt: { type: Date, default: Date.now }
 *     }
 *   ]
 * - expiresAt: { type: Date, required: true, index: { expires: 0 } } // 24-hr TTL
 * - createdAt: { type: Date, default: Date.now }
 */

export const StatusModel = {
  name: 'Status',
  status: 'pending_database_setup',
};

export default StatusModel;


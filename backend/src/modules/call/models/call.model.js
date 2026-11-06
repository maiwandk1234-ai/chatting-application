/**
 * Call Model (Schema Template for MongoDB / Mongoose)
 *
 * NOTE: Database connection is not yet configured.
 * When Mongoose is integrated, convert this definition into a Mongoose Schema:
 *
 * Example Schema Structure:
 * - caller: { type: Schema.Types.ObjectId, ref: 'User', required: true }
 * - receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true }
 * - callType: { type: String, enum: ['audio', 'video'], required: true }
 * - isGroupCall: { type: Boolean, default: false }
 * - group: { type: Schema.Types.ObjectId, ref: 'GroupChat' }
 * - status: {
 *     type: String,
 *     enum: ['initiating', 'ringing', 'accepted', 'rejected', 'missed', 'ended'],
 *     default: 'initiating'
 *   }
 * - startedAt: { type: Date }
 * - endedAt: { type: Date }
 * - duration: { type: Number, default: 0 } // duration in seconds
 * - createdAt: { type: Date, default: Date.now }
 */

export const CallModel = {
  name: 'Call',
  status: 'pending_database_setup',
};

export default CallModel;


/**
 * Status Service
 * Handles business logic for ephemeral status/story updates (24-hour lifetime)
 */
export class StatusService {
  /**
   * Create a new status update
   * @param {object} statusData
   */
  async createStatus(statusData) {
    // TODO: Save status with 24h expiration in database
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    return {
      id: 'stub_status_id',
      ...statusData,
      expiresAt,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Get active statuses from contacts
   * @param {string} userId
   */
  async getActiveStatuses(userId) {
    // TODO: Query active statuses from contacts where expiresAt > now
    return [];
  }

  /**
   * Mark a status as viewed by user
   * @param {string} statusId
   * @param {string} userId
   */
  async markAsViewed(statusId, userId) {
    // TODO: Append user to viewers list
    return { statusId, viewedBy: userId, viewedAt: new Date().toISOString() };
  }

  /**
   * Delete a status before expiration
   * @param {string} statusId
   * @param {string} userId
   */
  async deleteStatus(statusId, userId) {
    // TODO: Delete status owned by user
    return { statusId, deleted: true };
  }
}

export default new StatusService();


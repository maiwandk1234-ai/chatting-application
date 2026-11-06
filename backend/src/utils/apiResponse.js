/**
 * Standardized API Response Helper
 */
export class ApiResponse {
  /**
   * Send a success response
   * @param {import('express').Response} res
   * @param {number} statusCode
   * @param {string} message
   * @param {any} data
   */
  static success(res, { statusCode = 200, message = 'Success', data = null } = {}) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send an error response
   * @param {import('express').Response} res
   * @param {number} statusCode
   * @param {string} message
   * @param {any} errors
   */
  static error(res, { statusCode = 500, message = 'Internal Server Error', errors = null } = {}) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
    });
  }
}

export default ApiResponse;


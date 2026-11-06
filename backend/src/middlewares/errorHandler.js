import { config } from '../config/env.js';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Global Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${statusCode} - ${message}`);
  if (!config.isProduction && err.stack) {
    console.error(err.stack);
  }

  // Validation errors (422) are always returned — never suppressed in production
  const errors = err.validationErrors
    ? { validationErrors: err.validationErrors }
    : config.isProduction
    ? undefined
    : { stack: err.stack };

  return ApiResponse.error(res, { statusCode, message, errors });
};

export default errorHandler;


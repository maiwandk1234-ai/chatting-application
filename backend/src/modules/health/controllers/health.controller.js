import { ApiResponse } from '../../../utils/apiResponse.js';
import { config } from '../../../config/env.js';

/**
 * Health Controller
 * Provides health check metrics and service status
 */
export const getHealthStatus = (req, res) => {
  const healthData = {
    uptime: `${process.uptime().toFixed(2)}s`,
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    service: 'chat-app-backend',
    status: 'healthy',
  };

  return ApiResponse.success(res, {
    statusCode: 200,
    message: 'Backend service is up and running',
    data: healthData,
  });
};

export default {
  getHealthStatus,
};

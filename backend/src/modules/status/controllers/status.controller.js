import { ApiResponse } from '../../../utils/apiResponse.js';
import statusService from '../services/status.service.js';

/**
 * Status Controller
 * Orchestrates request/response handling for status/story updates
 */
export const createStatus = async (req, res, next) => {
  try {
    const status = await statusService.createStatus(req.body);
    return ApiResponse.success(res, {
      statusCode: 201,
      message: 'Status published successfully',
      data: status,
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveStatuses = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.query.userId;
    const statuses = await statusService.getActiveStatuses(userId);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Active statuses retrieved successfully',
      data: statuses,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsViewed = async (req, res, next) => {
  try {
    const { statusId } = req.params;
    const userId = req.user?.id || req.body.userId;
    const result = await statusService.markAsViewed(statusId, userId);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Status marked as viewed',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStatus = async (req, res, next) => {
  try {
    const { statusId } = req.params;
    const userId = req.user?.id;
    const result = await statusService.deleteStatus(statusId, userId);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Status deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createStatus,
  getActiveStatuses,
  markAsViewed,
  deleteStatus,
};

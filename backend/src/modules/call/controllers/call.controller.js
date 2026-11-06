import { ApiResponse } from '../../../utils/apiResponse.js';
import callService from '../services/call.service.js';

/**
 * Call Controller
 * Orchestrates request/response handling for audio/video calling endpoints
 */
export const initiateCall = async (req, res, next) => {
  try {
    const call = await callService.initiateCall(req.body);
    return ApiResponse.success(res, {
      statusCode: 201,
      message: 'Call initiated successfully',
      data: call,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCallStatus = async (req, res, next) => {
  try {
    const { callId } = req.params;
    const { status } = req.body;
    const result = await callService.updateCallStatus(callId, status);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Call status updated',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCallHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.query.userId;
    const calls = await callService.getCallHistory(userId);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Call history retrieved successfully',
      data: calls,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  initiateCall,
  updateCallStatus,
  getCallHistory,
};

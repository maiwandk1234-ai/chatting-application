import { ApiResponse } from '../../../utils/apiResponse.js';
import groupChatService from '../services/groupChat.service.js';

/**
 * Group Chat Controller
 * Orchestrates request/response handling for group chat endpoints
 */
export const createGroup = async (req, res, next) => {
  try {
    const group = await groupChatService.createGroup(req.body);
    return ApiResponse.success(res, {
      statusCode: 201,
      message: 'Group created successfully',
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const getGroups = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.query.userId;
    const groups = await groupChatService.getGroups(userId);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Groups retrieved successfully',
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

export const addMembers = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { memberIds } = req.body;
    const result = await groupChatService.addMembers(groupId, memberIds);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Members added successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { groupId, memberId } = req.params;
    const result = await groupChatService.removeMember(groupId, memberId);
    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Member removed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const sendGroupMessage = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const message = await groupChatService.sendGroupMessage(groupId, req.body);
    return ApiResponse.success(res, {
      statusCode: 201,
      message: 'Group message sent successfully',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createGroup,
  getGroups,
  addMembers,
  removeMember,
  sendGroupMessage,
};

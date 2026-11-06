import { Router } from 'express';
import {
  createGroup,
  getGroups,
  addMembers,
  removeMember,
  sendGroupMessage,
} from '../controllers/groupChat.controller.js';

const router = Router();

/**
 * @route   POST /api/group-chats
 * @desc    Create a new group
 */
router.post('/', createGroup);

/**
 * @route   GET /api/group-chats
 * @desc    Get all groups for the current user
 */
router.get('/', getGroups);

/**
 * @route   POST /api/group-chats/:groupId/members
 * @desc    Add members to group
 */
router.post('/:groupId/members', addMembers);

/**
 * @route   DELETE /api/group-chats/:groupId/members/:memberId
 * @desc    Remove member from group
 */
router.delete('/:groupId/members/:memberId', removeMember);

/**
 * @route   POST /api/group-chats/:groupId/messages
 * @desc    Send message to group
 */
router.post('/:groupId/messages', sendGroupMessage);

export default router;


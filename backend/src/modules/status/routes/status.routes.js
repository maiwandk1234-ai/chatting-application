import { Router } from 'express';
import {
  createStatus,
  getActiveStatuses,
  markAsViewed,
  deleteStatus,
} from '../controllers/status.controller.js';

const router = Router();

/**
 * @route   POST /api/status
 * @desc    Publish a new status/story
 */
router.post('/', createStatus);

/**
 * @route   GET /api/status
 * @desc    Get all active 24-hr status updates from contacts
 */
router.get('/', getActiveStatuses);

/**
 * @route   POST /api/status/:statusId/view
 * @desc    Mark a status update as viewed
 */
router.post('/:statusId/view', markAsViewed);

/**
 * @route   DELETE /api/status/:statusId
 * @desc    Delete a status update
 */
router.delete('/:statusId', deleteStatus);

export default router;


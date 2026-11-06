import { Router } from 'express';
import {
  initiateCall,
  updateCallStatus,
  getCallHistory,
} from '../controllers/call.controller.js';

const router = Router();

/**
 * @route   POST /api/calls
 * @desc    Initiate an audio or video call
 */
router.post('/', initiateCall);

/**
 * @route   PATCH /api/calls/:callId/status
 * @desc    Update call status (accepted, rejected, ended)
 */
router.patch('/:callId/status', updateCallStatus);

/**
 * @route   GET /api/calls
 * @desc    Get user call logs
 */
router.get('/', getCallHistory);

export default router;


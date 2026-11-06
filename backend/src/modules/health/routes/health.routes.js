import { Router } from 'express';
import { getHealthStatus } from '../controllers/health.controller.js';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint returning system status
 * @access  Public
 */
router.get('/', getHealthStatus);

export default router;


import { Router } from 'express';
import healthRoutes from '../modules/health/routes/health.routes.js';
import chatRoutes from '../modules/private-chat/routes/privateChat.routes.js';
import groupChatRoutes from '../modules/group-chat/routes/groupChat.routes.js';
import statusRoutes from '../modules/status/routes/status.routes.js';
import callRoutes from '../modules/call/routes/call.routes.js';

const router = Router();

// ── Live endpoints ──────────────────────────────────────────────
router.use('/health', healthRoutes);

// Private Chats — GET /api/chats, GET /api/chats/:chatId
router.use('/chats', chatRoutes);

// ── Placeholder endpoints (stubs, implemented in future sprints) ─
router.use('/group-chats', groupChatRoutes);
router.use('/status', statusRoutes);
router.use('/calls', callRoutes);

export default router;

import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { commentRouter } from './comment-routes.js';
const router = Router();
router.use('/tickets', ticketRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);
export default router;

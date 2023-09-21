import { Router } from "express";
import * as TicketController from '../controllers/TicketController.js';

const router = new Router();

router.patch('/buy-ticket',TicketController.update);
router.get('/get-all-tickets',TicketController.getAll);

export default router;
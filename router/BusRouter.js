import { Router } from "express";
import * as BusController from '../controllers/BusController.js';

const router = new Router();

router.post('/create-bus',BusController.create);
router.get('/get-all-bus',BusController.getAll);
router.patch('/update-bus',BusController.updateBus);

export default router;
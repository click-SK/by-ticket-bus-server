import { Router } from "express";
import * as DriverController from '../controllers/DriverController.js';

const router = new Router();

router.post('/register-driver',DriverController.register);
router.get('/get-all-drivers',DriverController.getAll);

export default router;
import { Router } from "express";
import * as DriverController from '../controllers/DriverController.js';
import adminMiddleware from "../utils/admin-middleware.js";
const router = new Router();

router.post('/register-driver',DriverController.register);
router.get('/get-all-drivers',adminMiddleware,DriverController.getAll);
// router.get('/get-all-drivers',DriverController.getAll);
router.delete('/delete-driver',DriverController.deleteDriver);

export default router;
import { Router } from "express";
import * as DirectionsController from '../controllers/DirectionsController.js';

const router = new Router();

router.post('/create-directions',DirectionsController.create);

export default router;
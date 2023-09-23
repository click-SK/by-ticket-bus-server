import { Router } from "express";
import * as DirectionsController from '../controllers/DirectionsController.js';

const router = new Router();

router.post('/create-directions',DirectionsController.create);
router.get('/get-all-directions',DirectionsController.getAll);
router.get('/get-all-origin-directions',DirectionsController.getAllOriginDirection);

export default router;
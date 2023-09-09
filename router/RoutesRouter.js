import { Router } from "express";
import * as RoutesController from '../controllers/RoutesController.js';

const router = new Router();

router.post('/create-routes',RoutesController.create);
router.get('/get-all-routes',RoutesController.getAllRoutes);
router.get('/get-one-rout/:id',RoutesController.getOneRout);

export default router;
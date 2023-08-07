import { Router } from "express";
import * as PartnerController from '../controllers/PartnerController.js';

const router = new Router();

router.post('/register-partner',PartnerController.register);
router.post('/login-partner',PartnerController.login);

export default router;
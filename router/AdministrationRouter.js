import { Router } from "express";
import * as AdministrationController from '../controllers/AdministrationController.js';
import adminMiddleware from "../utils/admin-middleware.js";
const router = new Router();

router.post('/register-admin',AdministrationController.register);
router.post('/login-admin',AdministrationController.login);
router.post('/logout-admin',AdministrationController.logout);
router.get('/refresh-admin',AdministrationController.refresh);
router.get('/get-all-managers',adminMiddleware,AdministrationController.getAll);
router.delete('/delete-manager',AdministrationController.deleteManager);

export default router;
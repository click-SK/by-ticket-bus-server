import { Router } from "express";
import * as AdministrationController from '../controllers/AdministrationController.js';
import checkAuthAdministration from '../utils/checkAuthAdministration.js';

const router = new Router();

router.post('/register-admin',AdministrationController.register);
router.post('/login-admin',AdministrationController.login);
router.post('/logout-admin',AdministrationController.logout);
router.get('/refresh-admin',AdministrationController.refresh);
router.get('/get-all-managers',AdministrationController.getAll);

export default router;
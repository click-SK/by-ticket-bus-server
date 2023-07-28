import { Router } from "express";
import * as AllCurrenciesController from '../controllers/AllCurrenciesController.js';

const router = new Router();

router.post('/create-default-currencies',AllCurrenciesController.create);
router.get('/get-all-default-currencies',AllCurrenciesController.getAll);
router.patch('/update-all-default-currencies',AllCurrenciesController.updateAllCurrencies);

export default router;
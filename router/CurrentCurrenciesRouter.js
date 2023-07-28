import { Router } from "express";
import * as CurrentCurrenciesController from '../controllers/CurrentCurrenciesController.js';

const router = new Router();

router.post('/create-current-currencies',CurrentCurrenciesController.addCurrencies);
router.get('/get-all-current-currencies',CurrentCurrenciesController.getAll);
router.delete('/delete-current-currencies',CurrentCurrenciesController.deleteCurrencies);

export default router;
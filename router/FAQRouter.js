import { Router } from "express";
import * as FAQController from '../controllers/FAQController.js';

const router = new Router();

router.post('/create-faq-post',FAQController.addNewFAQ);
router.patch('/update-post',FAQController.updateFAQ);
router.delete('/remove-post',FAQController.removeFAQ);
router.get('/get-all-posts',FAQController.getAllFAQ);

export default router;
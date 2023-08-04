import { Router } from "express";
import * as FAQController from '../controllers/FAQController.js';

const router = new Router();

router.post('/create-faq-post',FAQController.addNewFAQ);
router.patch('/update-faq-post',FAQController.updateFAQ);
router.delete('/remove-faq-post',FAQController.removeFAQ);
router.get('/get-all-faq-posts',FAQController.getAllFAQ);

export default router;
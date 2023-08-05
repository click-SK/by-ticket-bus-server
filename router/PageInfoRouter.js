import { Router } from "express";
import * as InfoPagesController from '../controllers/InfoPagesController.js';

const router = new Router();

router.post('/create-info-post',InfoPagesController.addNewPageInfo);
router.patch('/update-about-us',InfoPagesController.updateAboutUs);
router.get('/get-about-us',InfoPagesController.getAboutUs);
router.patch('/update-contact-us',InfoPagesController.updateContactsUs);
router.get('/get-contact-us',InfoPagesController.getContactsUs);
router.patch('/update-policy',InfoPagesController.updatePolicy);
router.get('/get-policy',InfoPagesController.getPolicy);
router.patch('/update-travel-rules',InfoPagesController.updateTravelRules);
router.get('/get-travel-rules',InfoPagesController.getTravelRules);

export default router;
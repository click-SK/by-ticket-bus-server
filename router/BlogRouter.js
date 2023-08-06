import { Router } from "express";
import * as BlogController from '../controllers/BlogController.js';
import multer from 'multer';
import fs from "fs"

const router = new Router();

const storage = multer.diskStorage({
    destination: (_,__,cd) => {
        if(!fs.existsSync('uploadsBlog')) {
            fs.mkdirSync('uploadsBlog');
        }
        cd(null,'uploadsBlog')
    },
    filename: (_,file,cd) => {
        cd(null, file.originalname)
    },
})

const upload = multer({storage})

router.post('/create-blog-post', upload.single('blogImage'),BlogController.addNewPost);
router.patch('/update-blog-post',upload.single('blogImage'),BlogController.updatePost);
router.delete('/remove-blog-post',BlogController.removePost);
router.get('/get-all-blog-posts',BlogController.getAllPosts);
router.get('/get-one-blog-post/:id',BlogController.getOnePost);

export default router;
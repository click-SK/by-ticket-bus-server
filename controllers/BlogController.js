import BlogModel from '../models/Blog.js';
import fs from 'fs';

export const getAllPosts = async (req,res) => {
    try{
        const allData = await BlogModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}

export const addNewPost = async (req,res) => {
    try{
        const {blogImage, titleSp, titleEn, descriptionSp, descriptionEn} = req.body;

        console.log('req.body',req.body);

        const post = await BlogModel.create({
            blogImage: `/uploadsBlog/${req.file.originalname}`,
            titleSp, 
            titleEn, 
            descriptionSp,
            descriptionEn
        })

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updatePost = async (req, res) => {
    try {
      const { blogImage, titleSp, titleEn, descriptionSp, descriptionEn, id } = req.body;
  
      const post = await BlogModel.findById(id);
  
      if (!post) {
        return res.status(404).json({ error: 'Пост не знайдено' });
      }

      if(req?.file?.originalname) {
        post.blogImage = `/uploadsBlog/${req.file.originalname}`;
      }
  
      // Оновлення полів, крім картинки
      post.titleSp = titleSp;
      post.titleEn = titleEn;
      post.descriptionSp = descriptionSp;
      post.descriptionEn = descriptionEn;
  
      await post.save();
  
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка оновлення поста' });
    }
  };

export const removePost = async (req, res) => {
  try {
    const { filename, id } = req.body;
    console.log('after',filename);
    const newFileName = filename.slice(1);
    console.log('before',newFileName);
  
    await BlogModel.findByIdAndDelete(id); // Переставлено перед fs.unlink
  
    fs.unlink(newFileName, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Помилка при видаленні фото' });
      }
      return res.json({ message: 'Фото успішно видалено' });
    });
  
    // Видалено `res.json({message: 'success'});`
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Помилка видалення поста' });
  }
  };
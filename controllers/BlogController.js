import BlogModel from '../models/Blog.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
export const getAllPosts = async (req,res) => {
    try{
        const allData = await BlogModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}

export const getOnePost = async (req,res) => {
  try{
    const {id} = req.params;
      const post = await BlogModel.findById(id);

      res.json(post)
  } catch (error) {
      console.log(error);
  }
}

export const addNewPost = async (req,res) => {
    try{
        const {blogImage, titleSp, titleEn, descriptionSp, descriptionEn} = req.body;

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

      // if(req?.file?.originalname) {
      //   post.blogImage = `/uploadsBlog/${req.file.originalname}`;
      // }

      if(req.file && req.file.originalname) {
        const uniqueFileName = uuidv4() + '_' + req.file.originalname;
        const oldFilename = post.blogImage;
        const previousImage = oldFilename && oldFilename.slice(1);
  
        if(previousImage) {
          try {
            // Перевіряємо існування файлу перед видаленням
            if (fs.existsSync(previousImage)) {
              fs.promises.unlink(previousImage);
            }
          } catch (error) {
            console.log('Помилка видалення попереднього зображення:', error);
          }
        }
  
        post.blogImage = `/uploadsBlog/${uniqueFileName}`;
        fs.rename(`./uploadsBlog/${req.file.originalname}`, `./uploadsBlog/${uniqueFileName}`, (err) => {
          if (err) throw err; // не удалось переименовать файл
          console.log("Файл успешно переименован");
        });
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
    const newFileName = filename.slice(1);
  
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


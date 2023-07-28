import FAQModel from '../models/FAQ.js';

export const getAllFAQ = async (req,res) => {
    try{
        const allData = await FAQModel.find();

        res.json(allData)
    } catch (error) {
        console.log(error);
    }
}

export const addNewFAQ = async (req,res) => {
    try{
        const {titleSp, titleEn, descriptionSp, descriptionEn} = req.body;

        const post = await FAQModel.create({
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

export const updateFAQ = async (req, res) => {
    try {
      const {titleSp, titleEn, descriptionSp, descriptionEn, postId } = req.body;
  
      const post = await FAQModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Пост не знайдено' });
      }
  
      // Оновлення полів, крім картинки
      post.titleSp = titleSp;
      post.titleEn = titleEn;
      post.descriptionSp = descriptionSp;
      post.descriptionEn = descriptionEn;
  
      // Збереження оновленого запису в базі даних
      await post.save();
  
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка оновлення поста' });
    }
  };


export const removeFAQ = async (req, res) => {
    try {
      const { postId } = req.body;

      await FAQModel.findByIdAndDelete(postId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Помилка видалення поста' });
    }
  };
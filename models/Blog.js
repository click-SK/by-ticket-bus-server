import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    blogImage: String,
    titleSp: String,
    titleEn: String,
    descriptionSp: String,
    descriptionEn: String,
},{timestamps: true,})

export default mongoose.model('Blog',BlogSchema)
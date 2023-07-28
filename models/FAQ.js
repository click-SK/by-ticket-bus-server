import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
    titleSp: String,
    titleEn: String,
    descriptionSp: String,
    descriptionEn: String,
},{timestamps: true,})

export default mongoose.model('FAQ',FAQSchema)
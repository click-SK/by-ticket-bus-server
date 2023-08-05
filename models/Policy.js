import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
    descriptionSp: String,
    descriptionEn: String,
},{timestamps: true,})

export default mongoose.model('Policy',PolicySchema)
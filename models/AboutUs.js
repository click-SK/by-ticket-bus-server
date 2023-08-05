import mongoose from "mongoose";

const AboutUsSchema = new mongoose.Schema({
    descriptionSp: String,
    descriptionEn: String,
},{timestamps: true,})

export default mongoose.model('AboutUs',AboutUsSchema)
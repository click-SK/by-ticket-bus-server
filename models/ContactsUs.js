import mongoose from "mongoose";

const ContactsUsSchema = new mongoose.Schema({
    descriptionSp: String,
    descriptionEn: String,
},{timestamps: true,})

export default mongoose.model('ContactsUs',ContactsUsSchema)
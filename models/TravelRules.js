import mongoose from "mongoose";

const TravelRulesSchema = new mongoose.Schema({
    descriptionSp: String,
    descriptionEn: String,
},{timestamps: true,})

export default mongoose.model('TravelRules',TravelRulesSchema)
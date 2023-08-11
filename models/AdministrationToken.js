import mongoose from "mongoose";

const AdministrationTokenShema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Administration'},
    refreshToken: [String],
},{timestamps: true})

export default mongoose.model('AdministrationToken',AdministrationTokenShema)
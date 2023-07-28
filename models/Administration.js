import mongoose from "mongoose";

const AdministrationSchema = new mongoose.Schema({
    isAdmin: Boolean,
    isOperator: Boolean,
    login: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String
},{timestamps: true,})

export default mongoose.model('Administration',AdministrationSchema)
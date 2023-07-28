import mongoose from "mongoose";

const EmployerSchema = new mongoose.Schema({
    login: String,
    password: String,
    isAdmin: Boolean,
    isEmployer: Boolean
},{timestamps: true,})

export default mongoose.model('Employer',EmployerSchema)
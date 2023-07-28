import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    fullName: String,
    login: String,
    email: String,
    phone: String,
    password: String,
    license: String,
    address: String,
    role: String
},{timestamps: true,})

export default mongoose.model('Driver',DriverSchema)
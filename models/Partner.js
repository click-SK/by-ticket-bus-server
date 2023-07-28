import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
    agentImage: String,
    password: String,
    fistName: String,
    lastName: String,
    companyName: String,
    phone: String,
    email: String,
    messanger: String,
    fullAddress: String,
    procent: Number,
    incomeHistory: [
        {
            
        }
    ],
},{timestamps: true,})

export default mongoose.model('Partner',PartnerSchema)
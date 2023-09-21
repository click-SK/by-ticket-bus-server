import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userImage: String,
    email: String,
    firstName: String,
    lastName: String,
    birthday: String,
    phone: String,
    address: String,
    password: String,
    travelHistory: [
        {
            ticket: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
        }
    ],
},{timestamps: true,})

export default mongoose.model('User',UserSchema)
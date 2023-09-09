import mongoose, {Schema} from "mongoose";

const BusSchema = new Schema({
    nameBus: String,
    numberBus: String,
    seats: Number,
    toilet: Boolean,
    wifi: Boolean
},{timestamps: true,})

export default mongoose.model('Bus',BusSchema)

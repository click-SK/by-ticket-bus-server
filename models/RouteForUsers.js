import mongoose, {Schema} from "mongoose";

const RouteForUsersSchema = new Schema({
    startRout: String,
    endRout: String,
    price: Number,
    daysWork: [String],
    distance: Number,
    duration: Number,
    timeStops: Number,
    timeEnd: String,
    timeStart: String,
    routName: String,
    numberStops: Number
},{timestamps: true,})

export default mongoose.model('RouteForUsers',RouteForUsersSchema)

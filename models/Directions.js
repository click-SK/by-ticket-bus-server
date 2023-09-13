import mongoose, {Schema} from "mongoose";

const DirectionSchema = new Schema({
    startRout: String,
    endRout: String,
    price: Number,
    drivers: [String],
    daysWork: [String],
    allStops: [{
        start: String,
        end: String,
        timeStart: String,
        timeEnd: String,
        timeStops: Number,
        distance: Number,
        duration: Number,
        price: Number,
        daysWork: [String],
        childRouts: [
            {
                start: String,
                end: String,
                timeStart: String,
                timeEnd: String,
                distance: Number,
                duration: Number,
                timeStops: Number,
                price: Number,
                daysWork: [String],
            }
        ]
    }],
    distanceAll: Number,
    durationAll: Number,
    timeAtStop: Number,
    routName: String,
    timeEnd: String,
    timeStart: String,
    description: String
},{timestamps: true,})

export default mongoose.model('Direction',DirectionSchema)

import mongoose, {Schema} from "mongoose";

const RoutesSchema = new Schema({
    routes:[Schema.Types.Mixed],
    startRout: String,
    allStops: [{
        start: String,
        end: String,
        distance: Number,
        duration: Number,
        timeStart: Number,
        timeEnd: Number,
        timeStops: Number
    }],
    endRout: String,
    distanceAll: Number,
    durationAll: Number,
    routName: String
},{timestamps: true,})

export default mongoose.model('Routes',RoutesSchema)

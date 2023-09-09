import mongoose, {Schema} from "mongoose";

const RoutesSchema = new Schema({
    routes:[Schema.Types.Mixed],
    startRout: String,
    allStops: [String],
    endRout: String,
    distance: Number,
    duration: Number,
    routName: String
},{timestamps: true,})

export default mongoose.model('Routes',RoutesSchema)

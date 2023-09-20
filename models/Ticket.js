import mongoose, {Schema} from "mongoose";

const TicketSchema = new Schema({
    routName: String,
    tickets: [{
        status: {
            free: Boolean,
            bought: Boolean,
        },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        seatNumber: Number,
        from: String,
        to: String,
    }],
},{timestamps: true,})

export default mongoose.model('Ticket',TicketSchema)

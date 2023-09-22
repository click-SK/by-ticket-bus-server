import mongoose, {Schema} from "mongoose";

const TicketSchema = new Schema({
    routName: String,
    tickets: [{
        status: {
            free: Boolean,
            bought: Boolean,
        },
        user: {
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
        },
        seatNumber: Number,
        from: String,
        to: String,
        timeFrom: String,
        timeTo: String,
    }],
},{timestamps: true,})

export default mongoose.model('Ticket',TicketSchema)

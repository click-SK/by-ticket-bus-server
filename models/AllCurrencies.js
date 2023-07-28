import mongoose from 'mongoose';

const AllCurrenciesSchema = new mongoose.Schema({
    currencies: [
        {
            currencieName: String,
            currencieValue: Number
        }
    ]
},{timestamps: true,})

export default mongoose.model('AllCurrencie',AllCurrenciesSchema)
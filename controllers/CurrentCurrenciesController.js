import CurrentCurrenciesModel from '../models/CurrentCurrencies.js';

export const addCurrencies = async (req,res) => {
    try{
        const {currencieName, currencieValue} = req.body;
        const currencie = await CurrentCurrenciesModel.create({
            currencieName,
            currencieValue
        })

        res.json(currencie);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to create' })
    }
}

export const deleteCurrencies = async (req,res) => {
    try{
        const {id} = req.body;

        console.log('req.body',req.body);
        console.log('id',id);

        await CurrentCurrenciesModel.findByIdAndDelete(id);

        res.json({ message: 'succeed'})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to delete' })
    }
}

export const getAll = async (req,res) => {
    try{
        const currencie = await CurrentCurrenciesModel.find();

        res.json(currencie);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get' })
    }
}
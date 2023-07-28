import AllCurrenciesModel from '../models/AllCurrencies.js';

export const create = async (req, res) => {
    try {
            const currencies = await AllCurrenciesModel.create({
                ...req.body
            })
    
            res.json(currencies);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to create' });
    }
}

export const updateAllCurrencies = async (data) => {
    try {
        const id = '64b689d4552f834b4f3e998e';
        const currencies = await AllCurrenciesModel.findById(id); 

        const currenciesArray = [];

        for(const key in data) {
            currenciesArray.push({
                currencieName: key,
                currencieValue: data[key]
            })
        }
        console.log('currenciesArray',currenciesArray);
        currencies.currencies = currenciesArray;

        await currencies.save();

    } catch (err) {
        console.log(err);
    }
}


export const getAll = async (req, res) => {
    try {
        const currencies = await AllCurrenciesModel.find();

        res.json(currencies);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to create' });
    }
}

const getBanckCurrencies = (req,res) => {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=8c55f626c2af0a881eb0e40976529ae9&format=1')
    .then((res) => res.json())
    .then((data) => updateAllCurrencies(data.rates))
}

// setInterval(() => {
//     getBanckCurrencies();
// },86400000)
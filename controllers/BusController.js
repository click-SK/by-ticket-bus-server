import BusModel from '../models/Bus.js';

export const create = async (req, res) => {
    try {
        const {nameBus, numberBus, seats, toilet, wifi} = req.body;

        const data = await BusModel.create({
            nameBus,
            numberBus,
            seats,
            toilet,
            wifi
        })

        res.json(data)

    } catch(error) {
        console.log(error);
    }
}

export const getAll = async (req, res) => {
    try {
        const data = await BusModel.find()

        res.json(data)
        
    } catch(error) {
        console.log(error);
    }
}

export const updateBus = async (req, res) => {
    try {
        const {id, nameBus, numberBus, seats, toilet, wifi} = req.body;
        const data = await BusModel.findById(id)

        data.nameBus = nameBus;
        data.numberBus = numberBus;
        data.seats = seats;
        data.toilet = toilet;
        data.wifi = wifi;

        await data.save();

        res.json(data)

    } catch(error) {
        console.log(error);
    }
}


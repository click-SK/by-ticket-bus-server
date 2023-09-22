import RoutesModel from "../models/Routes.js";

export const create = async (req, res) => {
    try {
        const {routes, distance, duration, routName, allStops} = req.body;
        console.log('routes',routes);
        let startRout = '';
        let endRout = '';
        if(routes.length == 1) {
            startRout = routes[0].origin;
            endRout = routes[0].destination;
        } else {
            startRout = routes[0].origin;
            endRout = routes[routes.length - 1].destination;
        }

        let stopsArray = [];

        routes.forEach((rout, idx) => {
            if(rout.origin != startRout) {
                stopsArray.push(rout.origin)
            } 
            if(rout.destination != endRout) {
                stopsArray.push(rout.destination)
            }
        })

        const data = await RoutesModel.create({
            routes,
            startRout,
            endRout,
            distanceAll: distance,
            durationAll: duration,
            routName,
            allStops
        })

        res.json(data)

    } catch(error) {
        console.log(error);
    }
}

export const getAllRoutes = async (req, res) => {
    try {
        const data = await RoutesModel.find();

        res.json(data)

    } catch(error) {
        console.log(error);
    }
}

export const getOneRout = async (req, res) => {
    try {
        const {id} = req.params;
        console.log('WORK',id);
        const data = await RoutesModel.findById(id);

        res.json(data)

    } catch(error) {
        console.log(error);
    }
}
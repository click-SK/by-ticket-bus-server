import DirectionsModel from "../models/Directions.js";
import RouteForUsersModel from "../models/RouteForUsers.js";

export const create = async (req, res) => {
    try {
        const {newRout, price, drivers, daysWork, description} = req.body;

        let timeAtStop = 0;

        newRout.allStops.forEach((item) => {
            timeAtStop += Number(item.timeStops || 0)
        })

        const data = await DirectionsModel.create({...newRout, timeAtStop, price, drivers, daysWork, description}); 

        console.log('data',data.allStops[0].childRouts[0]);

        if(data) {
             data.allStops.forEach((rout) => {
                 RouteForUsersModel.create(
                    {
                        startRout: rout.start,
                        endRout: rout.end,
                        price: rout.price,
                        daysWork: rout.daysWork,
                        distance: rout.distance,
                        duration: rout.duration,
                        timeStops: rout.timeStops,
                        timeEnd: rout.timeEnd,
                        timeStart: rout.timeStart
                    }
                );
                rout.childRouts.forEach((child) => {
                    RouteForUsersModel.create(
                        {
                            startRout: child.start,
                            endRout: child.end,
                            price: child.price,
                            daysWork: child.daysWork,
                            distance: child.distance,
                            duration: child.duration,
                            timeStops: child.timeStops,
                            timeEnd: child.timeEnd,
                            timeStart: child.timeStart
                        }
                    );
                })
            })

        }

        res.json(data)

    } catch(error) {
        console.log(error);
    }
}
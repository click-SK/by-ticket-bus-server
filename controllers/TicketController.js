import TicketModel from "../models/Ticket.js";
import UserModel from '../models/User.js';

export const update = async (req, res) =>  {
    try {
        const {routName, userId, cityFrom, cityTo, timeFrom, timeTo, seatNumbers} = req.body;
        console.log('routName',routName);
        console.log('userId',userId);
        console.log('cityFrom',cityFrom);
        console.log('cityTo',cityTo);
        console.log('timeFrom',timeFrom);
        console.log('timeTo',timeTo);
        console.log('seatNumbers',seatNumbers);
        const data = await TicketModel.findOne({routName: routName})

        if(!data) {
            return res.json('Rout not found')
        }

        const newSeatsNumbers = seatNumbers.map(Number); // Перетворюємо масив рядків в масив чисел
        const ticketsArray = data.tickets;
        const user = await UserModel.findById(userId);

        if(!user) {
            return res.json('User not found')
        }


        if (data) {
            console.log('work1');
            for (const ticket of ticketsArray) {
                console.log('work2', ticket.seatNumber);
                if (newSeatsNumbers.includes(ticket.seatNumber)) {
                    console.log('work3', newSeatsNumbers);
                    const indexToRemove = newSeatsNumbers.indexOf(ticket.seatNumber);
                    if (indexToRemove !== -1) {
                        newSeatsNumbers.splice(indexToRemove, 1); // Видаляємо елемент за індексом
                    }
                    ticket.status.free = false;
                    ticket.status.bought = true;
                    ticket.user = userId;
                    ticket.from = cityFrom;
                    ticket.to = cityTo;
                    ticket.timeFrom = timeFrom;
                    ticket.timeTo = timeTo;
                    await data.save(); // Зберігаємо зміни до документа
                    user.travelHistory.push({ticket: ticket._id})
                    await user.save();
                    console.log('data.tickets[idx].status.free', ticket.status.free);
                }
            }
        }

        // if (data) {
        //     console.log('work1');
        //     ticketsArray.forEach(async (ticket, idx) => {
        //         console.log('work2', ticket.seatNumber);
        //         if (newSeatsNumbers.includes(ticket.seatNumber)) {
        //             console.log('work3', newSeatsNumbers);
        //             const indexToRemove = newSeatsNumbers.indexOf(ticket.seatNumber);
        //             if (indexToRemove !== -1) {
        //                 newSeatsNumbers.splice(indexToRemove, 1); // Видаляємо елемент за індексом
        //             }
        //             data.tickets[idx].status.free = false;
        //             data.tickets[idx].status.bought = true;
        //             data.tickets[idx].user = userId;
        //             data.tickets[idx].from = cityFrom;
        //             data.tickets[idx].to = cityTo;
        //             data.tickets[idx].timeFrom = timeFrom;
        //             data.tickets[idx].timeTo = timeTo;
        //             await data.save();
        //             console.log('data.tickets[idx].status.free', data.tickets[idx].status.free);
        //         }
        //     });
        // }

        // if(data) {
        //     console.log('work1');
        //     ticketsArray.forEach(async (ticket, idx) => {
        //         console.log('work2',ticket.seatNumber);
        //         if(newSeatsNumbers.includes(newSeatsNumbers).toString()) {
        //             console.log('work3',newSeatsNumbers);
        //             const indexToRemove = newSeatsNumbers.indexOf(ticket.seatNumber).toString();
        //             if (indexToRemove !== -1) {
        //                 newSeatsNumbers.splice(indexToRemove, 1); // Видаляємо елемент за індексом
        //             }
        //             data.tickets[idx].status.free = false;
        //             data.tickets[idx].status.bought = true;
        //             data.tickets[idx].user = userId;
        //             data.tickets[idx].from = cityFrom;
        //             data.tickets[idx].to = cityTo;
        //             data.tickets[idx].timeFrom = timeFrom;
        //             data.tickets[idx].timeTo = timeTo;
        //             await data.save();
        //             console.log('data.tickets[idx].status.free',data.tickets[idx].status.free);
        //         }
        //     })
        // }
        

        res.json(data);
    } catch(error) {
        console.log(error);
    }
}


export const getAll = async (req, res) => {
    try {
        const data = await TicketModel.find()
        .populate({
            path: "tickets",
            populate: {
              path: "user"
            }
          });
        res.json(data);
    } catch(error) {
        console.log(error);
    }
}
import TicketModel from "../models/Ticket.js";
import UserModel from '../models/User.js';

export const update = async (req, res) =>  {
    try {
        const {routName, userId, cityFrom, cityTo, timeFrom, timeTo, seatNumbers, firstName, lastName, email, phone} = req.body;

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
                    ticket.user.firstName = firstName;
                    ticket.user.lastName = lastName;
                    ticket.user.email = email;
                    ticket.user.phone = phone;
                    ticket.from = cityFrom;
                    ticket.to = cityTo;
                    ticket.timeFrom = timeFrom;
                    ticket.timeTo = timeTo;
                    await data.save(); // Зберігаємо зміни до документа
                    user.travelHistory.push({
                        routName,
                        seatNumber: ticket.seatNumber,
                        from: cityFrom,
                        to: cityTo,
                        timeFrom,
                        timeTo,
                    })
                    await user.save();
                }
            }
        }
        res.json(data);
    } catch(error) {
        console.log(error);
    }
}


export const getAll = async (req, res) => {
    try {
        const data = await TicketModel.find()
        res.json(data);
    } catch(error) {
        console.log(error);
    }
}
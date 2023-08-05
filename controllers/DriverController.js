import DriverModel from '../models/Driver.js';
export const register = async (req, res) => {
    try {
        const { fullName, login, email, password, license, phone, address } = req.body;

        const canditate = await DriverModel.findOne({ email });

        if (canditate) {
            return res.json({ message: "Email already exists" });
          }

        const driver = await DriverModel.create({
            fullName,
            login,
            email,
            phone,
            password,
            license,
            address,
            role: 'Driver'
        })

        res.json(driver);
        
    } catch (error) {
        res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
    }
};

export const getAll = async (req,res) => {
    try{
        const alldrivers = await DriverModel.find();

        res.json(alldrivers)
    } catch (error) {
        console.log(error);
    }
}
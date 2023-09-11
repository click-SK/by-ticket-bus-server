import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as AdministrationService from '../services/AdministrationService.js';
import AdministrationModel from '../models/Administration.js';
import AdministrationToken from '../models/AdministrationToken.js';
import * as TokenService from "../services/AdministrationTokenService.js";
import * as AdministrationDto from "../dtos/AdministrationDto.js";
import TokenModel from '../models/AdministrationToken.js';
export const register = async (req, res) => {
    try {
        const { login, firstName, lastName, password } = req.body;

        const userData = await AdministrationService.registration(login, firstName, lastName, password);

        if (userData.error) {
            return res.json({ message: userData.error });
        }
        // res.cookie('BUS_A_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        return res.json(userData); 
        
    } catch (error) {
        console.error('Помилка реєстрації користувача:', error);
        res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
    }
};

export const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        const userData = await AdministrationService.login(login, password);
        if (userData.error) {
            return res.json({ message: userData.error });
        }

        // res.cookie('BUS_A_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        res.cookie('BUS_A_refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // Тривалість життя в мілісекундах
            httpOnly: true,
            secure: true, // Вимагає HTTPS
            sameSite: 'none' // Дозволяє доступ з будь-якого джерела
          });
        return res.json(userData); 

    } catch(e) {
        console.log(e);
    }
}

export const logout = async (req,res) => {
    try {
        const {BUS_A_refreshToken} = req.cookies;
        const token = await AdministrationService.logout(BUS_A_refreshToken);
        res.clearCookie('BUS_A_refreshToken');
        return res.json(token);
    } catch (e) {
        console.log(e);
    }
}

// export const refresh = async (req,res) => {
//     try {
//             const {BUS_A_refreshToken} = req.cookies;

//             console.log('BUS_A_refreshToken',BUS_A_refreshToken);
//             const userData = await AdministrationService.refresh(BUS_A_refreshToken)
//             console.log('userData',userData);
//             if (userData.error) {
//                 return res.status(503).json({ message: userData.error });
//             }
//             console.log('end userData.refreshToken',userData.refreshToken);
//             await res.cookie('BUS_A_refreshToken', userData.refreshToken, {
//                 maxAge: 30 * 24 * 60 * 60 * 1000, // Тривалість життя в мілісекундах
//                 httpOnly: true,
//                 secure: true, // Вимагає HTTPS
//                 sameSite: 'none' // Дозволяє доступ з будь-якого джерела
//               });
//             return res.json(userData); 
//     } catch (e) {
//         console.log(e);
//     }
// }

export const getAll = async (req, res) => {
    try {
      const allManager = await AdministrationModel.find();
      res.json(allManager)
    } catch (e) {
      console.log(e);
    }
  };

  export const deleteManager = async (req,res) => {
    try{
        const {id} = req.body;
        const manager = await AdministrationModel.findByIdAndDelete(id)

        res.json(manager)
    } catch (error) {
        console.log(error);
    }
}

export const chekedToken = async (req,res) => {
    try{
        const {BUS_A_refreshToken} = req.cookies;
        const data = await AdministrationToken.findOne({refreshToken: BUS_A_refreshToken});
        if(!data) {
            return res.json({message: 'Validation error'})
        }
        return res.json({message: 'success'})
    } catch (error) {
        console.log(error);
    }
}

// export const refresh = async (req, res) => {
//     try {
//         const { BUS_A_refreshToken } = req.cookies;
//         ('start token', BUS_A_refreshToken);
//         if (!BUS_A_refreshToken) {
//             return res.json({ message: "Token Error" });
//         }

//         const tokenFromDb = await TokenModel.findOne({ refreshToken: BUS_A_refreshToken });
//         console.log('tokenFromDb Admin',tokenFromDb);

//         if (!tokenFromDb) {
//             return res.json({ message: "Validation error" });
//         }
//             try {
//                 const validatedToken = await jwt.verify(BUS_A_refreshToken, process.env.SECRET_KEY_REFRESH);
    
//                 const user = await AdministrationModel.findById(validatedToken.id);
//                 const administrationDto = await AdministrationDto.createAdministrationDto(user);
    
//                 const accessToken = await jwt.sign(administrationDto, process.env.SECRET_KEY_ACCESS, { expiresIn: '1d' });
//                 const refreshToken = await jwt.sign(administrationDto, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });
    
//                 // Видалення старого токену з бази даних
//                 // await TokenModel.deleteMany({ refreshToken: BUS_A_refreshToken });
    
//                 // Збереження нового токену в базі даних
//                 await TokenService.saveTokens(administrationDto.id, refreshToken);
    
//                 // Видалення старого токену з куків та встановлення нового
//                 // res.clearCookie('BUS_A_refreshToken');
//                 await res.cookie('BUS_A_refreshToken', refreshToken, {
//                     maxAge: 30 * 24 * 60 * 60 * 1000,
//                     httpOnly: true,
//                     secure: true,
//                     sameSite: 'none'
//                 });
    
//                 // Тепер виведення значень, коли токени оновлені
//                 console.log('end token', refreshToken);
    
//                 return res.json({ refreshToken, accessToken, user });
//             } catch (error) {
//                 return res.json({ message: "Validation error" });
//             }
//     } catch (e) {
//         console.log(e);
//     }
// }

export const refresh = async (req, res) => {
    try {
        const { BUS_A_refreshToken } = req.cookies;
        if (!BUS_A_refreshToken) {
            return res.json({ message: "Token Error" });
        }

        // const tokenFromDb = await TokenModel.findOne({ refreshToken: BUS_A_refreshToken });
        const tokenFromDb = await TokenModel.findOne({ refreshToken: { $in: [BUS_A_refreshToken] } });

        if (!tokenFromDb) {
            return res.json({ message: "Validation error" });
        }

        try {
            const validatedToken = await jwt.verify(BUS_A_refreshToken, process.env.SECRET_KEY_REFRESH);

            const user = await AdministrationModel.findById(validatedToken.id);
            const administrationDto = await AdministrationDto.createAdministrationDto(user);

            const accessToken = await jwt.sign(administrationDto, process.env.SECRET_KEY_ACCESS, { expiresIn: '1d' });
            const refreshToken = await jwt.sign(administrationDto, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });

            // Видалення старого токену з бази даних
            // await TokenModel.deleteMany({ refreshToken: BUS_A_refreshToken });

            // Збереження нового токену в базі даних
            await TokenService.saveTokens(administrationDto.id, refreshToken);

            // Видалення старого токену з куків та встановлення нового
            // res.clearCookie('BUS_A_refreshToken');
            await res.cookie('BUS_A_refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });

            // Тепер виведення значень, коли токени оновлені

            return res.json({ refreshToken, accessToken, user });
        } catch (error) {
            if (axios.isCancel(error)) {
                // Обробка ситуації, коли запит був скасований
                // Наприклад, можна повернути відповідний статус або повідомлення
                return res.json({ message: "Request canceled" });
            } else {
                return res.json({ message: "Validation error" });
            }
        }
    } catch (e) {
        console.log(e);
    }
}
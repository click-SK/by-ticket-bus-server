import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as UserService from '../services/UserService.js';
import TokenModel from '../models/UserToken.js';
import { createUserDto } from '../dtos/UserDto.js';
import * as TokenService from '../services/UserTokenService.js';
export const getMe = async (req, res) => {
    try {
      const userId = req.params.id;
      const userData = await UserModel.findOne({_id: userId});
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  };

export const register = async (req, res) => {
    try {
        const { email, firstName, lastName, password, birthday, phone } = req.body;

        const userData = await UserService.registration(email, firstName, lastName, password, birthday, phone);

        if (userData.error) {
            return res.json({ message: userData.error });
        }
        // res.cookie('BUS_U_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        res.cookie('BUS_U_refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // Тривалість життя в мілісекундах
            httpOnly: true,
            secure: true, // Вимагає HTTPS
            sameSite: 'none' // Дозволяє доступ з будь-якого джерела
          });
        return res.json(userData); 
        
    } catch (error) {
        console.error('Помилка реєстрації користувача:', error);
        res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await UserService.login(email, password);
        if (userData.error) {
            return res.json({ message: userData.error });
        }

        // res.cookie('BUS_U_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        res.cookie('BUS_U_refreshToken', userData.refreshToken, {
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
        const {BUS_U_refreshToken} = req.cookies;
        const token = await UserService.logout(BUS_U_refreshToken);
        res.clearCookie('BUS_U_refreshToken');
        return res.json(token);
    } catch (e) {
        console.log(e);
    }
}

// export const refresh = async (req,res) => {
//     try {
//         const {BUS_U_refreshToken} = req.cookies;
//         const userData = await UserService.refresh(BUS_U_refreshToken)
//         if (userData.error) {
//             return res.status(503).json({ message: userData.error });
//         }
//         // res.cookie('BUS_U_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
//         res.cookie('BUS_U_refreshToken', userData.refreshToken, {
//             maxAge: 30 * 24 * 60 * 60 * 1000, // Тривалість життя в мілісекундах
//             httpOnly: true,
//             secure: true, // Вимагає HTTPS
//             sameSite: 'none' // Дозволяє доступ з будь-якого джерела
//           });
//         return res.json(userData); 
//     } catch (e) {
//         console.log(e);
//     }
// }

export const updateUserPassword = async (req,res) => {
    try {
        const { id, currentPassword, newPassword } = req.body;

        const user = await UserModel.findById(id);
    
        if (!user) {
          return res.status(404).json({
            message: 'User not found',
          });
        }
    
        // Перевірка старого паролю
        const isOldPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
        if (!isOldPasswordValid) {
          return res.status(401).json({
            message: 'Invalid current password',
          });
        }
    
        // Якщо старий пароль співпадає, генеруємо новий хеш для нового паролю
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
    
        user.password = hash;
        await user.save();
    
        res.json({
          message: 'Password updated successfully',
        });

    } catch (e) {
        console.log(e);
    }
}
export const updateUserFirstLastName = async (req,res) => {
    try {
        const { id, firstName, lastName } = req.body;

        const resoult = await UserModel.findById(id);

        if (!resoult) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
          }
          
        resoult.firstName = firstName;
        resoult.lastName = lastName;

        await resoult.save();

        res.json(resoult);
    } catch (e) {
        console.log(e);
    }
}
export const updateUserEmailNumberBirthday = async (req,res) => {
    try {
        const { id, email, phone, birthday } = req.body;

        const resoult = await UserModel.findById(id);

        if (!resoult) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
          }
          
        resoult.email = email;
        resoult.phone = phone;
        resoult.birthday = birthday;

        await resoult.save();

        res.json(resoult);
    } catch (e) {
        console.log(e);
    }
}

export const refresh = async (req, res) => {
    try {
        const { BUS_U_refreshToken } = req.cookies;
        console.log('start token', BUS_U_refreshToken);
        if (!BUS_U_refreshToken) {
            return res.json({ message: "Token Error" });
        }

        // const tokenFromDb = await TokenModel.findOne({ refreshToken: BUS_U_refreshToken });
        const tokenFromDb = await TokenModel.findOne({ refreshToken: { $in: [BUS_U_refreshToken] } });
        console.log('tokenFromDb User',tokenFromDb);

        if (!tokenFromDb) {
            return res.json({ message: "Validation error" });
        }
        
            try {
                const validatedToken = await jwt.verify(BUS_U_refreshToken, process.env.SECRET_KEY_REFRESH);
    
                const user = await UserModel.findById(validatedToken.id);
                const administrationDto = await createUserDto(user);
    
                const accessToken = await jwt.sign(administrationDto, process.env.SECRET_KEY_ACCESS, { expiresIn: '1d' });
                const refreshToken = await jwt.sign(administrationDto, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });
    
                // Видалення старого токену з бази даних
                // await TokenModel.deleteMany({ refreshToken: BUS_U_refreshToken });
    
                // Збереження нового токену в базі даних
                await TokenService.saveTokens(administrationDto.id, refreshToken);
    
                // Видалення старого токену з куків та встановлення нового
                // res.clearCookie('BUS_U_refreshToken');
                await res.cookie('BUS_U_refreshToken', refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                });
    
                // Тепер виведення значень, коли токени оновлені
                console.log('end token', refreshToken);
    
                return res.json({ refreshToken, accessToken, user });
            } catch (error) {
                return res.json({ message: "Validation error" });
            }
    } catch (e) {
        console.log(e);
    }
}
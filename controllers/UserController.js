import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as UserService from '../services/UserService.js';

export const register = async (req, res) => {
    try {
        const { email, firstName, lastName, password, birthday, phone } = req.body;

        const userData = await UserService.registration(email, firstName, lastName, password, birthday, phone);

        if (userData.error) {
        }
        res.cookie('BUS_U_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
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

        res.cookie('BUS_U_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
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

export const refresh = async (req,res) => {
    try {
        const {BUS_U_refreshToken} = req.cookies;
        const userData = await UserService.refresh(BUS_U_refreshToken)
        if (userData.error) {
            return res.status(503).json({ message: userData.error });
        }
        res.cookie('BUS_U_refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        return res.json(userData); 
    } catch (e) {
        console.log(e);
    }
}

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
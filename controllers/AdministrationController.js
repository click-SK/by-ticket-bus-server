import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as AdministrationService from '../services/AdministrationService.js';
import AdministrationModel from '../models/Administration.js';

export const register = async (req, res) => {
    try {
        const { login, firstName, lastName, password } = req.body;

        const userData = await AdministrationService.registration(login, firstName, lastName, password);

        if (userData.error) {
            return res.status(500).json({ message: userData.error });
        }
        // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
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

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        return res.json(userData); 

    } catch(e) {
        console.log(e);
    }
}

export const logout = async (req,res) => {
    try {
        const {refreshToken} = req.cookies;
        const token = await AdministrationService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (e) {
        console.log(e);
    }
}

export const refresh = async (req,res) => {
    try {
        const {refreshToken} = req.cookies;
        const userData = await AdministrationService.refresh(refreshToken)
        if (userData.error) {
            return res.status(503).json({ message: userData.error });
        }
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true})
        return res.json(userData); 
    } catch (e) {
        console.log(e);
    }
}

export const getAll = async (req, res) => {
    try {
      const allManager = await AdministrationModel.find();
      res.json(allManager)
    } catch (e) {
      console.log(e);
    }
  };

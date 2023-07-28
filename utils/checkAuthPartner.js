import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PartnerModel from '../models/Partner.js';

dotenv.config();

export default async function (req, res, next) {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.key);

      const user = await PartnerModel.findById(decoded.id);
      if (!user) {
        return res.status(403).json({
          message: 'Access denied',
        });
      }

      req.userId = decoded.id;
      req.user = user;

      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Access denied',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Access denied',
    });
  }
}
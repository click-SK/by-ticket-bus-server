import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import BlogRouter from './router/BlogRouter.js';
import FAQRouter from './router/FAQRouter.js';
import UserRouter from './router/UserRouter.js';
import PartnerRouter from './router/PartnerRouter.js';
import AdministrationRouter from './router/AdministrationRouter.js';
import AllCurrenciesRouter from './router/AllCurrenciesRouter.js';
import CurrentCurrenciesRouter from './router/CurrentCurrenciesRouter.js';
import DriverRouter from './router/DriverRouter.js';

dotenv.config();

const app = express();
const db = 'mongodb+srv://roskichuk:qwerty12345@cluster0.ezfqhqh.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db)
  .then(() => {
    console.log('DB Start');
  });

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());

app.use('/api/uploadsBlog', express.static('uploadsBlog'));
app.use('/api/uploadsUser', express.static('uploadsUser'));

app.use('/api',BlogRouter);
app.use('/api',FAQRouter);
app.use('/api',UserRouter);
app.use('/api',PartnerRouter);
app.use('/api',AdministrationRouter);
app.use('/api',AllCurrenciesRouter);
app.use('/api',CurrentCurrenciesRouter);
app.use('/api',DriverRouter);

app.listen(process.env.PORT, () => {
    console.log('server start', process.env.PORT);
  });
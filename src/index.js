import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import {config} from '../config/config.js';
import services from './routes/services.router.js'
const router = express.Router();
const urlDB = config.url_db + config.name_bd;
const app = express();

app.listen(config.port, () => {
    console.log(`
    [OK] Server is running on localhost:${config.port}
    `);
})
app.use(json());
app.use(urlencoded({extended: false}));
app.use(morgan('dev'));
app.use('/api', services)



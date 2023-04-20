import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import {config} from '../config/config.js';
const app = express();
import { router } from './routes/index.js';


app.listen(config.port, () => {
    console.log(`
    [OK] Server is running on localhost:${config.port}
    `);
})
app.use(json());
app.use(urlencoded({extended: false}));
app.use(morgan('dev'));
app.use('/', router);






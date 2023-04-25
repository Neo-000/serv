import express from 'express';
const router = express.Router();
import { config } from '../../config/config.js';
import md5 from 'md5';

import { api } from '../../config/api.js';
import { category_router } from './category.router.js';
import { services_router } from './services.router.js';
import { bid_roter } from './bid.router.js';
import { order_roter } from './order.router.js';

router.post("/api", (req,res) => {
    if(md5(req.body.password) == config.password){
        res.status(200).send({
            msg:"АПИШКА СЕРВЕРА",
            api:api
        })
    } else {
        res.status(400).send('неверный пароль иди нахуй')
    }
});
router.use('/services', services_router);
router.use('/category', category_router);
router.use('/bid', bid_roter);
router.use('/order', order_roter);

export {router}
import express from 'express';
const router = express.Router();

import { Services } from '../annex/services.js';
const services = new Services();

router.get('/test', (req, res) => {
        res.send('idi naxyi')
})
router.post('/add', (req, res) =>{
    services.Create(req, res);
})
router.post('/update', (req,res) => {
    services.Update(req,res)
})
router.post('/update/name/category', (req,res) => {
    services.UdateNameCategory(req,res)
})



const services_router = router;
export {services_router}
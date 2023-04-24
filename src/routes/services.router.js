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
router.post('/update/category', (req,res) => {
    services.UdateNameCategory(req,res)
})
router.post('/delete', (req,res) => {
    services.Delete(req,res);
})
router.get('/getall', (req,res) => {
    services.GetAll(req,res);
})



const services_router = router;
export {services_router}
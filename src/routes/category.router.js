import express from 'express';
const router = express.Router();

import { Category } from '../annex/category.js';
const category = new Category();

router.get('/test', (req, res) => {
        res.send('idi naxyi')
})
router.post('/add', (req, res) => {
    category.Create(req, res);
})
router.post('/update', (req,res) => {
    category.Update(req,res);
})
router.post('/delete', (req,res) => {
    category.Delete(req,res);
})
router.post('/getname', (req,res) => {
    category.GetNameCategory(req,res);
})
router.post('/getservices', (req,res) => {
    category.GetServicesCategory(req,res);
})
router.get('/getall', (req,res) => {
    category.GetAll(req,res);
})
router.post('/getall', (req,res) => {
    category.GetAll(req,res);
})



const category_router = router;
export {category_router}
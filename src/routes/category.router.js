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



const category_router = router;
export {category_router}
import express from 'express';
import Services from '../annex/services.annex.js'
const router = express.Router();

router.get('/services', async (req,res) => {
    res.send('<p style = "margin:20px; padding:20px; border-radus:5px; color:red; background:black;"> HI HYLI NADO it is GET services </p>');
})
router.post('/services', async (req,res) => {
    Services.CreateCategory(req,res)
    res.send('<p style = "margin:20px; padding:20px; border-radus:5px; color:white; background:green;"> Все хорошо держите гавно</p>');
})

export default router
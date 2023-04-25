import express from 'express';
const router = express.Router();

import { Bid } from '../annex/bid.js';
const bid = new Bid();

router.post('/create', (req,res) => {
    bid.Create(req,res);
})
router.post('/all', (req,res) => {
    bid.GetAll(req,res);
})
router.post('/delete', (req,res) => {
    bid.Delete(req,res);
})
router.post('/delete_all', (req,res) => {
    bid.DeleteAll(req,res);
})

const bid_roter = router;
export {bid_roter};
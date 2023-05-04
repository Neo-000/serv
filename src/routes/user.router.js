import express from 'express';
const router = express.Router();

import { User } from '../annex/user.js';
const user = new User();

router.post('/create', (req,res) => {
    user.Create(req,res)
})

const user_router = router;
export {user_router}
import express from 'express';
const router = express.Router();

import { category_router } from './category.router.js';
import { services_router } from './services.router.js';

router.use('/services', services_router)
router.use('/category', category_router);

export {router}
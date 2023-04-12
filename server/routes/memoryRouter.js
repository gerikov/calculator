import express from 'express';
const router = express.Router();

import { addValue, readValue } from '../controllers/memoryController.js';

router.route('').post(addValue).get(readValue);

export default router;

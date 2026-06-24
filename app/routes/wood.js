import express from 'express';
const router = express.Router();
import * as woodController from '../controllers/woodController.js';

router.get('/', woodController.woodsList);

export default router;
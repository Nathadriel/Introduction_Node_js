import express from 'express';
import auth from '../middlewares/auth.js';
import multer from '../middlewares/multer.js';
import * as woodController from '../controllers/woodController.js';

const router = express.Router();

router.get('/', auth, woodController.readAll);
router.get('/:hardness', auth, woodController.readByHardness);
router.post('/', auth, multer, woodController.create);

export default router;
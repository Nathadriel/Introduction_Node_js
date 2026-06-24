import express from 'express';
import auth from '../middlewares/auth.js';
import * as woodController from '../controllers/woodController.js';

const router = express.Router();

router.get('/', auth, woodController.readAll);
router.get("/:hardness", auth, woodController.readByHardness);

export default router;

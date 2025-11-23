import express from 'express';
import { getStudentData } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getStudentData);

export default router;

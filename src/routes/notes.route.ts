import express from 'express';
import { generateNote, getnotes } from '../controller/note.controller';

const router = express.Router();
router.post('/', generateNote);
router.get('/', getnotes);

export default router;

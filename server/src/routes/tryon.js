import express from 'express';
import { createTryOnRequest, getTryOnRequest, getUserTryOnRequests } from '../controllers/tryonController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', authMiddleware, upload.fields([
    { name: 'personImage', maxCount: 1 },
    { name: 'garmentImage', maxCount: 1 }
]), createTryOnRequest);

router.get('/:id', authMiddleware, getTryOnRequest);
router.get('/user/history', authMiddleware, getUserTryOnRequests);

export default router;

import express from 'express';
import { createCollection, getCollections } from '../controllers/collection.controller.js';
import { authenticate, isAdmin } from '../utils/auth.js';
const router = express.Router();

router.post('/', authenticate, isAdmin, createCollection);
router.get('/', getCollections);

export { router as collectionRoutes };
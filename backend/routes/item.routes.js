import express from 'express';
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  uploadFile
} from '../controllers/item.controller.js';
import { authenticate } from '../utils/auth.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.route('/')
  .post(authenticate, createItem)
  .get(getItems);

router.route('/:id')
  .get(getItem)
  .put(authenticate, updateItem)
  .delete(authenticate, deleteItem);

router.post('/:id/upload', authenticate, upload.single('file'), uploadFile);

export default router;
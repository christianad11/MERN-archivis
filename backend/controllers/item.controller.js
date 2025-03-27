import Item from '../models/Item.js';
import Collection from '../models/Collection.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export const createItem = async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) throw new NotFoundError('Collection not found');

    const item = new Item({
      ...req.body,
      collectionId: req.params.collectionId
    });
    await item.save();
    
    res.status(201).json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({ collectionId: req.params.collectionId });
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    next(err);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw new NotFoundError('Item not found');
    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) throw new NotFoundError('Item not found');
    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) throw new NotFoundError('Item not found');
    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) throw new BadRequestError('No file uploaded');

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { 
        fileUrl: `/uploads/items/${req.file.filename}`,
        fileType: req.file.mimetype,
        fileSize: req.file.size
      },
      { new: true }
    );
    
    if (!item) throw new NotFoundError('Item not found');
    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
};
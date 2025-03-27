import Collection from '../models/Collection.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

/**
 * @desc    Create new collection
 * @route   POST /api/collections
 * @access  Private/Admin
 */
export const createCollection = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name) {
      throw new BadRequestError('Collection name is required');
    }

    const collection = await Collection.create({
      name,
      description,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: collection
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all collections
 * @route   GET /api/collections
 * @access  Public
 */
export const getCollections = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Basic filtering
    const query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }

    const [collections, total] = await Promise.all([
      Collection.find(query)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'username email'),
      Collection.countDocuments(query)
    ]);

    res.json({
      success: true,
      count: collections.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: collections
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single collection
 * @route   GET /api/collections/:id
 * @access  Public
 */
export const getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('createdBy', 'username email');

    if (!collection) {
      throw new NotFoundError('Collection not found');
    }

    res.json({
      success: true,
      data: collection
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update collection
 * @route   PUT /api/collections/:id
 * @access  Private/Admin
 */
export const updateCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!collection) {
      throw new NotFoundError('Collection not found');
    }

    res.json({
      success: true,
      data: collection
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete collection
 * @route   DELETE /api/collections/:id
 * @access  Private/Admin
 */
export const deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);

    if (!collection) {
      throw new NotFoundError('Collection not found');
    }

    // TODO: Consider deleting associated items
    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get collection statistics
 * @route   GET /api/collections/stats
 * @access  Public
 */
export const getCollectionStats = async (req, res, next) => {
  try {
    const stats = await Collection.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'collectionId',
          as: 'items'
        }
      },
      {
        $project: {
          name: 1,
          itemCount: { $size: '$items' },
          lastUpdated: 1
        }
      },
      { $sort: { itemCount: -1 } }
    ]);

    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    next(err);
  }
};
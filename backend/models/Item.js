import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  // Dublin Core Metadata
  title: { type: String, required: true },
  creator: { type: String },
  subject: { type: [String] }, // Array for multiple subjects
  description: { type: String },
  date: { type: Date },
  type: { type: String },
  format: { type: String },
  identifier: { type: String, unique: true },
  source: { type: String },
  language: { type: String, default: 'en' },
  coverage: { type: String }, // Spatial/Temporal
  rights: { type: String },

  // Relationships
  collectionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Collection', 
    required: true 
  },

  // File Management
  fileUrl: { type: String },
  fileType: { type: String },
  fileSize: { type: Number },
  thumbnailUrl: { type: String },

  // System
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
ItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
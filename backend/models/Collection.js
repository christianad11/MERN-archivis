import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Collection = mongoose.model('Collection', CollectionSchema);
export default Collection;
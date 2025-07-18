// models/Counter.js
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g., "customerId"
  seq: { type: Number, default: 0 }
});

export default mongoose.models.Counter || mongoose.model('Counter', counterSchema);


// models/Customer.js
import mongoose from 'mongoose';
import Counter from './Counter.js';

const customerSchema = new mongoose.Schema({
   cusid:{ type: String, unique: true },
  name: String,
  phoneNumber:String,
  address: String,
  planName: String,
  bowlCount: Number,
  lastDelivered:String,
  startDate:Date,
  dTime:String,
  SubStatus:String,
  duration:String,
  paymentStatus:String,
  orderStatus:String,
  deliveryDates: {
  type: [String],
  default: [],
},
  note:String,
});

// models/Customer.js
customerSchema.pre('save', async function (next) {
  const doc = this;
  if (doc.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: 'customerId' }, // ✅ FIXED from { id: 'customerId' }
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
     // doc.cusid = counter.seq; // ✅ correctly using auto-incremented number
       const padded = counter.seq.toString().padStart(3, '0'); // 001, 002, ...
      doc.cusid = `CUST-${padded}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);


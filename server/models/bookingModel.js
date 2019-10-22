import mongoose from 'mongoose';

const bookingModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    hotelId: {
      type: String,
      required: true
    },

    roomId: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    priceType: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingModel);

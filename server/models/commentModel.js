import mongoose from 'mongoose';

const commentModel = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    
    hotelId: {
      type: String,
      required: true
    },

    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comment", commentModel);
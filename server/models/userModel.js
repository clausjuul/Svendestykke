import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },

    firstname: {
      type: String,
      required: true
    },

    lastname: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    phone: {
      type: String,
      required: true
    },
    
    terms: {
      type: Boolean
    },

    password: {
      type: String,
      required: true,
      minlength: [3, "to short, atleast 3 long"],
      maxlength: [42, "maximum 42 long"]
    },

    role: {
      type: String
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
      }
    ],

    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
      }
    ]
  },
  {
    timestamps: true
  }
);

userModel.pre('save', async function() {
  this.password = await this.generatePasswordHash();
});

userModel.methods.generatePasswordHash = async function() {
  const saltRounds = 12;
  return await bcrypt.hash(this.password, saltRounds);
};

export default mongoose.model('User', userModel);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid mobile number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Jab bhi user fetch hoga, password bypass ho jayega jab tak (.select('+password')) na karein
  },
 profileImage: {
    url: {
      type: String,
      default: '' // Agar image nahi hai toh khali string rahegi
    }
  }
}, {
  timestamps: true
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next;
});


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
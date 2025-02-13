const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userCompany: { type: String, required: true },
  userName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userPhone: { type: String },
  userEmail: { type: String },
  userAddress: { type: String },
  userAddress2: { type: String },
  userTaxId: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

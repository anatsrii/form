const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  customerCompany: { type: String, required: true },
  customerName: { type: String, required: true },
  customerLastName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerAddress2: { type: String, maxlength: 32 },
  customerTaxId: { type: String, required: true },
  editCustomerProfile: { type: Boolean, default: false }
},{
  timestamps: true
});


module.exports = mongoose.model('Customer', customerSchema);

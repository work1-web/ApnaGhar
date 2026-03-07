const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 120,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  city: {
    type: String,
    required: true,
    enum: ['Mumbai', 'Delhi', 'Bangalore', 'Ahmedabad', 'Vadodara'],
  },
  locality:    { type: String, required: true },
  address:     { type: String },
  pincode:     { type: String },
  price:       { type: Number, required: true, min: 0 },
  listingType: { type: String, enum: ['sale', 'rent'], required: true },
  propertyType:{ type: String, enum: ['Flat', 'Villa', 'PG', 'Plot'], required: true },
  bhk:         { type: Number, min: 1, max: 10 },
  bathrooms:   { type: Number, min: 1 },
  area:        { type: Number },              // sq.ft
  furnishing:  { type: String, enum: ['Furnished', 'Semi-Furnished', 'Unfurnished', null] },
  reraApproved:{ type: Boolean, default: false },
  reraNumber:  { type: String },
  amenities:   [{ type: String }],
  images:      [{ type: String }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive:    { type: Boolean, default: true },
  isFeatured:  { type: Boolean, default: false },
  views:       { type: Number, default: 0 },
  // AI fields
  aiScore:     { type: Number, default: 0 },
  tags:        [String],
}, { timestamps: true });

propertySchema.index({ city: 1, propertyType: 1, price: 1 });
propertySchema.index({ title: 'text', description: 'text', locality: 'text' });

module.exports = mongoose.model('Property', propertySchema);

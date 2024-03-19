"use strict";

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const productModel = mongoose.model('product', productSchema);
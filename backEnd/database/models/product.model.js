"use strict";

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  models: String,
  description: String,
}, { timestamps: true });

export const productModel = mongoose.model('product', productSchema);
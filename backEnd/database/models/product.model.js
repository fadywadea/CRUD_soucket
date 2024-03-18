"use strict";

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  productModels: String,
  productDesc: String,
}, { timestamps: true });

export const productModel = mongoose.model('product', productSchema);
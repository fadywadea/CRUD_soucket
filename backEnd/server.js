"use strict";

import express from 'express';
import { Server } from 'socket.io';
import { dbConnection } from './database/connection.js';
import { productModel } from './database/models/product.model.js';

const app = express()
const port = 3000

// Database Connection
dbConnection();

// JSON Middleware
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));

// Server Running....
const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

// Socket IO Initialization
const io = new Server(server, {
  cors: "*"
});

// Socket Connection
io.on("connection", (socket) => {
  console.log('Socket ID Connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket Disconnect', socket.id);
  });

  // Add Product
  socket.on('addProduct', async (product) => {
    const { name, price, model, desc } = product;
    name.length || price.length || model.length || desc.length ?
      await productModel.insertMany(product) :
      socket.emit("invalid")
    const products = await productModel.find({});
    io.emit('displayProduct', products);
  });

  // Display products
  socket.on('load', async () => {
    const products = await productModel.find({});
    socket.emit('displayProduct', products);
  });

  // Delete Product
  socket.on("deleteProduct", async (product) => {
    await productModel.findByIdAndDelete(product);
    const products = await productModel.find({});
    io.emit('displayProduct', products);
  });

  // Get Product
  socket.on("getProduct", async (data) => {
    const product = await productModel.findById({ _id: data });
    socket.emit("updateDisplay", product);
    // Update Product
    socket.on("updateProduct", async (newProduct) => {
      const { name, price, model, desc } = newProduct;
      await productModel.findByIdAndUpdate({ _id: data }, { name, price, model, desc }, { new: true });
      const products = await productModel.find({});
      io.emit('displayProduct', products);
    });
  });
});
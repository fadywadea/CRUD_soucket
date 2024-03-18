"use strict";

import express from 'express';
import { Server } from 'socket.io';
import { dbConnection } from './database/connection.js';

const app = express()
const port = 3000

// Database Connection
dbConnection();

// JSON Middleware
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

// Server Running....
const server = app.listen(port, () => console.log(`App listening on port ${port}!`));

// Socket IO Initialization
const io = new Server(server, {
  cors: "*"
});

// Socket Connection
io.on("connection", () => {
  console.log('socket connected');
});
"use strict";

import express from 'express';
import { Server } from 'socket.io';

const app = express()
const port = 3000

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

app.post('/', (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "success" });
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const io = new Server(server, {
  cors: "*"
});

io.on("connection", () => {
  console.log('socket connected');
})
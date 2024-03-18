"use strict";

import { connect } from "mongoose";

export function dbConnection() {
  connect("mongodb://127.0.0.1:27017/CRUD").then(() => {
    console.log("Database Connected Successfully");
  });
}
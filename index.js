require("dotenv").config();
// const mongoose = require("mongoose");
const { connection } = require("./connection");
const userRoutes = require("./routes/user.routes");
const notesRoutes = require("./routes/notes.routes");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());
//** Routes */
app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

const connectDB = async () => {
  try {
    await connection;
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log("listening for requests");
  });
}).catch(err=>console.log(err));

const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABSE_URL,
    ssl: true,
  },
});

db.select("*").from("users");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Success");
});

// Sign In
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// Register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// Profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// Image
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port ${process.env.PORT}");
});

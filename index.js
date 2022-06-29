const express = require("express");
const sendEmail = require("./api/sendEmail.js");
require("dotenv").config();
require("./database/index.js");
const cors = require("cors");
const fs = require("fs");
// const Cart = require("./database/Models/Cart");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
}))

app.get("/", async (req, res) => {
  res.send("Hello!");
})

app.post("/email", async (req, res) => {
  // console.log()
  const data = req.body;
  sendEmail(data)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    });
});

app.get("/products", async (req, res) => {
  
  const products = require("./Products").products;

  for (let i = 0; i < products.length; i++) {
    const base64 = fs.readFileSync(products[i].image).toString("base64");
    console.log(base64);
    products[i].image = base64;
  }

  console.log(products);

  return res.send(products);
})

app.listen(process.env.PORT || 3001, () => console.log("Backend listening"));
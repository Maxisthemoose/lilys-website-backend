const express = require("express");
const sendEmail = require("./api/sendEmail.js");
require("dotenv").config();
require("./database/index.js");
const cors = require("cors");
// const Cart = require("./database/Models/Cart");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const origins = ["http://10.0.0.3:3000", "http://localhost:3000"];
// const origins = {
//   origin: ["http://10.0.0.3:3000", "http://localhost:3000"],
//   default: "http://10.0.0.3:3000",
// }
app.use(cors({
  origin: "*",
}))
// app.all('*', function (req, res, next) {
//   const origin = origins.origin.find(v => v === req.header('origin').toLowerCase()) ? req.headers.origin : origins.default;
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.post("/email", async (req, res) => {
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
  return res.send(products);
})

app.listen(3001, () => console.log("Backend listening"));
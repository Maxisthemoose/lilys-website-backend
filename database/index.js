const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {}, (err) => {
  if (err) throw err;
  else console.log("Successfully logged into mongoose database");
});
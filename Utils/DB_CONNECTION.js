const mongoose = require("mongoose");
const DB_CONNECTION = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("CONNECTED TO DB");
    }
  );
};

module.exports = { DB_CONNECTION };

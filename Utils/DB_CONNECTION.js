const mongoose = require("mongoose");
const DB_CONNECTION = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log("CONNECTED TO DB");
    }
  );
};

module.exports = { DB_CONNECTION };

require("dotenv/config");

const { DB_CONNECTION } = require("./Utils/DB_CONNECTION");
DB_CONNECTION(); // database connection

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

require("./Models/User");

app.use("/auth", require("./Routes/Auth"));
app.use("/score", require("./Routes/Scores"));

app.get("/", (req, res) => {
  res.json({
    message: "387Hack BACKEND",
    ip_address: req.connection.remoteAddress,
  });
});

const port = process.env.PORT || 3870;

app.listen(port, () => {
  console.log("http://localhost:3870");
});

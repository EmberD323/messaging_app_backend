require("dotenv").config();
const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser')
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");

app.use("/", userRouter);
// app.use("/messages", messageRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
//errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

  
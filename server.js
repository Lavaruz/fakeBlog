const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// ROUTER
const db = require("./src/models");
const app = express();
const userRouter = require("./src/routes/userRoute");
const postRouter = require("./src/routes/postRoute");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log("server run at port 3000"));
});

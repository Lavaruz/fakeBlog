const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// ROUTER
const db = require("./src/models");
const app = express();
const userRouter = require("./src/routes/userRoute");
const postRouter = require("./src/routes/postRoute");
const authRouter = require("./src/routes/authRoute");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log("server run at port 3000"));
});

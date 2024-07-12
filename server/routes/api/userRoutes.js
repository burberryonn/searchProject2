const userRouter = require("express").Router();
const { User } = require("../../db/models");
// const cookieParser = require("cookie-parser");

// userRouter.use(cookieParser());

userRouter.get("/", async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch ({ message }) {
    res.json(`ошибка: ${message}`);
  }
});

module.exports = userRouter;

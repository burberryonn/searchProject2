const userRouter = require("express").Router();
const { User } = require("../../db/models");
// const cookieParser = require("cookie-parser");

// userRouter.use(cookieParser());

userRouter.get("/", async (req, res) => {
  try {
    const user = await User.findAll();
    // cookie("test", "testSecond")
    res.json(user);
  } catch ({ message }) {
    res.json(`ошибка: ${message}`);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delUser = await User.destroy({ where: { id: +id } });
    if (delUser > 0) {
      return res.status(200).json({ message: "success" });
    }
    res.status(400).json("ошибка");
  } catch ({ message }) {
    res.status(500).send(message);
  }
});

module.exports = userRouter;

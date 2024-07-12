const authRouter = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const cookiesConfig = require("../../config/cookiesConfig");
const generateTokens = require("../../utils/generateTokens");

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    res.status(403).json({ message: "Не все поля заполнены" });
    return;
  }
  try {
    const targetUser = await User.findOne({
      where: {
        email,
      },
    });

    const isValidPassword = await bcrypt.compare(password, targetUser.password);
    if (!isValidPassword) {
      res
        .status(401)
        .json({ error, message: "Не правильный пароль или логин" });
      return;
    }
    const user = targetUser.get();
    delete user.password;

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie("refreshToken", refreshToken, cookiesConfig)
      .json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ error, message: "Нет пользователя" });
  }
});

authRouter.post("/registration", async (req, res) => {
  const { name, email, password } = req.body;
  if (
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !name ||
    name.trim() === "" ||
    !email.includes("@")
  ) {
    res.status(400).json({ message: "Не все поля" });
    return;
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashPassword,
    });
    if (newUser) {
      const user = newUser.get();
    delete user.password;
      const { accessToken, refreshToken } = generateTokens({ user });
      res.status(201).cookie("refreshToken", refreshToken, cookiesConfig)
      .json({ accessToken, user });
      return;
    } else {
      res.status(400).json({ error, message });
      return;
    }
  } catch (error) {
    res.status(500).json({ error, message: "Ошибка сервера" });
  }
});

authRouter.get("/logout", async (req, res) => {
  res.locals.user = undefined;
  res.status(200).clearCookie("refreshToken").json({ message: "success" });
});

module.exports = authRouter;

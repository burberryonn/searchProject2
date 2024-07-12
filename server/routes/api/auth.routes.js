const authRouter = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const cookiesConfig = require("../../config/cookiesConfig");
const generateTokens = require("../../utils/generateTokens");

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(11, req.body);

  if (!email || !password) {
    res.status(400).json({ message: "Не все поля" });
    return;
  }
  if (email.trim() === "" || password.trim() === "") {
    res.status(400).json({ message: "Поля не пустые" });
    return;
  }
  try {
    const targetUser = await User.findOne({
      where: {
        email,
      },
    });

    console.log(555, targetUser);

    const IsValidPassword = targetUser.password === password;
    console.log(222, IsValidPassword);
    if (!IsValidPassword) {
      res
        .status(401)
        .json({ error, message: "Не правильный пароль или логин" });
      return;
    }
    const user = targetUser.get();
    delete user.password;
    console.log(333, user);

    const { accessToken, refreshToken } = generateTokens({ user });

    res.cookie("refreshToken", refreshToken, cookiesConfig);

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json({ error, message: "Нет пользователя" });
  }
});

module.exports = authRouter;

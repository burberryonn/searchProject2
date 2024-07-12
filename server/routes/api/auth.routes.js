const authRouter = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const cookiesConfig = require("../../config/cookiesConfig");

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    res.status(400).json({ message: "Не все поля" });
    return;
  }
  if (email.trim() === "" || password.trim() === "") {
    res.status(400).json({ message: "Поля не пустые" });
    return;
  }
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    console.log(111, targetUser);

    const IsValidPassword = targetUser.password === password;
    console.log(222, IsValidPassword);
    if (!IsValidPassword) {
      res
        .status(401)
        .json({ error, message: "Не правильный пароль или логин" });
      return;
    }
    // const user = targetUser.get();
    // console.log(444, user);
    delete user.dataValues.password;

    console.log(555, targetUser);

    const { accessToken, refreshToken } = generateTokens({ user });
    console.log(6666, accessToken, refreshToken);
    res
      .status(200)
      .cookie("refreshToken", refreshToken, cookiesConfig)
      .json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ error, message: "Нет пользователя" });
  }
});

module.exports = authRouter;

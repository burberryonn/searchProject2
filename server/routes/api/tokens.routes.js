const tokensRoute = require("express").Router();
const cookiesConfig = require("../../config/cookiesConfig");
const verifyRefreshToken = require("../../middleware/verifyRefreshToken");
const generateTokens = require("../../utils/generateTokens");

tokensRoute.get("/refresh", verifyRefreshToken, async (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });
  res
    .cookie("refreshToken", refreshToken, cookiesConfig)
    .json({ user: res.locals.user, accessToken });
});

module.exports = tokensRoute;

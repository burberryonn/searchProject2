const indexRouter = require("express").Router();
const userRouter = require("./api/userRoutes");
const requestHistoryRouter = require("./api/RequestHistory");
const authRouter = require("./api/auth.routes");

indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/RequestHistory", requestHistoryRouter);

module.exports = indexRouter;

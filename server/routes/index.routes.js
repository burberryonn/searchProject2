const indexRouter = require("express").Router()
const userRouter = require("./api/userRoutes")
const requestHistoryRouter = require("./api/RequestHistory")
indexRouter.use("/users", userRouter)
indexRouter.use("/RequestHistory", requestHistoryRouter)

module.exports=indexRouter
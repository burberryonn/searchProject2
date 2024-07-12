
const express = require("express");
const app = express(); 
const indexRouter= require("./routes/index.routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use("/api", indexRouter)

app.listen(3000, () => {
  console.log(`Сервер запущен`);
});
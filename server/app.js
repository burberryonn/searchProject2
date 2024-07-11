
const express = require("express");
const app = express(); 
const indexRouter= require("./routes/index.routes")

app.use(cookieParser()); 
app.use(express.urlencoded()); 
app.use(express.json()); 
app.use("/api", indexRouter)

app.listen(3000, () => {
  console.log(`Сервер запущен`);
});
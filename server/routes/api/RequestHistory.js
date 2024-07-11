const requestHistoryRouter = require("express").Router();
const { RequestHistory } = require("../../db/models");
const cookieParser = require("cookie-parser");

requestHistoryRouter.use(cookieParser());

requestHistoryRouter.get("/", async (req, res) => {
  try {
    const history = await User.findAll({
      orderBy: [["id", "ASC"]],
    });
    res.cookie("test", "testSecond").json(history);
  } catch ({ message }) {
    res.json(`ошибка: ${message}`);
  }
});

requestHistoryRouter.post("/", async (req, res) => {
  try {
    const newHistory = await User.create(req.body);
    res.status(201).json(newHistory);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

requestHistoryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { user_id, goodRequest, badRequest} = req.body;
  try {
    const result = await User.update(
        { user_id, goodRequest, badRequest},
      { where: { id: id } }
    );

    if (result[0] > 0) {
      const addHistory = await User.findOne({ where: { id: id } });
      return res.status(200).json({ ok: addHistory });
    }
    res.status(400).json("error");
  } catch ({ message }) {
    res.status(500).json({ error: "Произошла внутренняя ошибка сервера" });
  }
});

requestHistoryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delHistory = await User.destroy({ where: { id: +id } });
    if (delHistory > 0) {
      return res.status(200).json({ message: "success" });
    }
    res.status(400).json("ошибка");
  } catch ({ message }) {
    res.status(500).send(message);
  }
});

module.exports = requestHistoryRouter;

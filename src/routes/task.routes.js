const { Router } = require("express");
const {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.controller");

const router = Router();

router.get("/task", getAllTask);

router.get("/task/:id", getTask);

router.post("/task", createTask);

router.delete("/task/:id", deleteTask);

router.put("/task/:id", updateTask);

module.exports = router;

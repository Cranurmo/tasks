const pool = require("../db");

const getAllTask = async (req, res) => {
  try {
    const allTask = await pool.query("SELECT * FROM task");
    console.log(allTask);
    res.json(allTask.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Not found",
      });
    else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    error: error.message;
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    console.log(result);

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM task WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Task not found",
      });

    return res.sendStatus(204);

    console.log(result);

    res.send("eliminando tareas");
  } catch (error) {
    console.log(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );

    console.log(result);
  } catch (error) {}
  res.send("retornando tareas");
};

module.exports = {
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};

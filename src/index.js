const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes.js");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

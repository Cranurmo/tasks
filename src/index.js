const express = require("express");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes.js");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

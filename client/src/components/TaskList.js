import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function TaskList() {
  const [task, setTask] = useState([]);

    const navigate = useNavigate();

  const loadTask = async () => {
    const res = await fetch("http://localhost:4000/task");
    const data = await res.json();
    setTask(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/task/${id}`, {
        method: "DELETE",
      });

      setTask(task.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  return (
    <>
      <h1> Task List</h1>
      {task.map((task) => (
        <Card
          style={{
            marginBottom: ".9rem",
            backgroundColor: "#1e272e",
          }}
          key={task.id}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div
              style={{
                color: "white",
              }}
            >
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={(id) => navigate(`/task/${task.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

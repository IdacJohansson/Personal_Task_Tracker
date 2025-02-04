import { ChangeEvent, useState } from "react";
import { Button, Form, InputGroup, Row, Col, Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

type Color = "lightgreen" | "white" | "red";

type Task = {
  text: string;
  backgroundcolor?: Color;
  isEditing: boolean;
};

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ text: "", isEditing: false });

  const handleNewTask = (e: ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, text: e.target.value });
  };

  const handleFormChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setTaskList((prevTasks: Task[]) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, text: e.target.value } : task
        )
      );
    };

  function addNewTask(): void {
    setTaskList([...taskList, task]);
    setTask({ text: "", isEditing: false });
  }

  function removeTask(index: number): void {
    setTaskList(taskList.filter((_: Task, i: number) => i !== index));
  }

  function markedAsDoneWithColor(index: number): void {
    const updatedTasks = [...taskList];
    const currentColor = updatedTasks[index].backgroundcolor;

    updatedTasks[index] = {
      ...updatedTasks[index],
      backgroundcolor: currentColor === "lightgreen" ? "white" : "lightgreen",
    };

    setTaskList(updatedTasks);
  }

  function toggleEditTask(index: number): void {
    const updatedTasks = [...taskList];
    updatedTasks[index].isEditing = !updatedTasks[index].isEditing;
    setTaskList(updatedTasks);
  }

  return (
    <>
      <main className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="fixed-container">
          <div>
            <h1>Personal Task Tracker</h1>
          </div>
          <Row className="justify-content-md-center">
            <Col>
              <Form>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={task.text}
                    type="text"
                    placeholder="......"
                    onChange={handleNewTask}
                    size="lg"
                    maxLength={100}
                  />
                  <Button variant="secondary" onClick={addNewTask}>
                    <i className="bi bi-plus" style={{ fontSize: "24px" }}></i>
                  </Button>
                </InputGroup>
              </Form>

              <Row>
                {taskList.map((task, index) => (
                  <Col key={index} md={4} sm={6} xs={12} className="mb-3">
                    <Card
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: task.backgroundcolor || "white",
                      }}
                    >
                      <Card.Body>
                        {task.isEditing ? (
                          <Form.Control
                            type="text"
                            maxLength={100}
                            value={task.text}
                            onChange={handleFormChange(index)}
                          />
                        ) : (
                          <Card.Text>{task.text}</Card.Text>
                        )}
                      </Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{ fontSize: "13px" }}>
                          {task.text.length}/100
                        </p>

                        <div className="d-flex ms-5">
                          <a
                            className="mx-2"
                            onClick={() => toggleEditTask(index)}
                          >
                            <i
                              className="bi bi-pencil-square"
                              style={{ fontSize: "15px" }}
                            ></i>
                          </a>
                          <a
                            className="mx-2"
                            onClick={() => removeTask(index)}
                            role="button"
                          >
                            <i
                              className="bi bi-trash"
                              style={{ fontSize: "15px" }}
                            ></i>
                          </a>
                          <a
                            className="mx-2"
                            onClick={() => markedAsDoneWithColor(index)}
                            role="button"
                          >
                            <i
                              className="bi bi-check2-circle"
                              style={{ fontSize: "15px" }}
                            ></i>
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}

export default App;

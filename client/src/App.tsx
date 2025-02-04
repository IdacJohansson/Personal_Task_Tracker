import { ChangeEvent, useState } from "react";
import { Button, Form, InputGroup, ListGroup, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

type Task = {
  text: string;
};

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ text: "" });

  const handleNewTask = (e: ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, text: e.target.value });
  };

  function addNewTask(): void {
    setTaskList([...taskList, task]);
    setTask({ text: "" });
  }

  return (
    <>
      <main className=" d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div>
          <h1>Personal Task Tracker</h1>
        </div>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  value={task.text}
                  type="text"
                  placeholder="......"
                  onChange={handleNewTask}
                  size="lg"
                />
                <Button variant="secondary" onClick={addNewTask}>
                  <i className="bi bi-plus" style={{ fontSize: "24px" }}></i>
                </Button>
              </InputGroup>
            </Form>

            <ListGroup as="ol">
              {taskList.map((task, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center list-text"
                >
                  <span className="mx-3">{task.text}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default App;

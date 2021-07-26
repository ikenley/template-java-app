import React, { useState, useContext, useCallback } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import { TodoItem, defaultTodoItem } from "../types";

type Props = {
  createTodoItem: (item: TodoItem) => Promise<any>;
};

const CreateTodoModal = ({ createTodoItem }: Props) => {
  const { isAuthorized } = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useState<TodoItem>(defaultTodoItem);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      let { name, type } = e.currentTarget;
      let value: any = e.currentTarget.value;

      if (type === "date") {
        value = new Date(value);
      }

      setTodoItem((item) => {
        return { ...item, [name]: value };
      });
    },
    [setTodoItem]
  );

  const handleCreate = useCallback(async () => {
    await createTodoItem(todoItem);
    closeModal();
  }, [todoItem, closeModal, createTodoItem]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="create-todo-editor">
      <Button variant="primary" onClick={openModal}>
        <i className="fas fa-plus" /> Create TODO
      </Button>

      <Modal show={showModal} onHide={closeModal} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create TODO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formCreateName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="input"
                  name="name"
                  value={todoItem.name}
                  onChange={handleChange}
                  placeholder="Buy milk"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCreateDescription">
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={todoItem.description}
                  onChange={handleChange}
                  placeholder="Any additional detail..."
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTodoModal;

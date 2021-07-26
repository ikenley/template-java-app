import React, { useState, useCallback, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { TodoItem, defaultTodoItem } from "../types";

// Modal that allows view/edit/delete TodoItem

type Props = {
  selTodoItem: TodoItem | null;
  selectTodoItem: (todoItem: TodoItem | null) => void;
  updateTodoItem: (todoItem: TodoItem) => Promise<any>;
  deleteTodoItem: (todoItem: TodoItem) => Promise<any>;
};

// No operation for handling read-only inputs
const noOp = () => {};

const TodoItemEditor = ({
  selTodoItem,
  selectTodoItem,
  updateTodoItem,
  deleteTodoItem,
}: Props) => {
  const [tmpTodoItem, setTmpTodoItem] = useState<TodoItem>(defaultTodoItem);

  const closeModal = useCallback(() => {
    selectTodoItem(null);
  }, [selectTodoItem]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, type } = e.currentTarget;
      let value: any = e.currentTarget.value;

      if (type === "date") {
        value = new Date(value);
      } else if (type === "checkbox") {
        value = e.currentTarget.checked;
      }

      setTmpTodoItem((p) => {
        return { ...p, [name]: value };
      });
    },
    [setTmpTodoItem]
  );

  const handleUpdate = useCallback(async () => {
    await updateTodoItem(tmpTodoItem);
    closeModal();
  }, [tmpTodoItem, closeModal, updateTodoItem]);

  const confirmDelete = useCallback(() => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${tmpTodoItem.name}?`
    );

    if (shouldDelete) {
      deleteTodoItem(tmpTodoItem);
    }
  }, [tmpTodoItem, deleteTodoItem]);

  // When todoItem prop changes, reload tmpTodoItem
  useEffect(() => {
    if (!selTodoItem) {
      setTmpTodoItem(defaultTodoItem);
      return;
    }

    // Create shallow copy of todoItem and set to temp
    const tmp = { ...selTodoItem };
    setTmpTodoItem(tmp);
  }, [selTodoItem, setTmpTodoItem]);

  if (!selTodoItem) {
    return null;
  }

  return (
    <Modal show={true} onHide={closeModal} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>View TODO</Modal.Title>
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
                value={tmpTodoItem.name}
                onChange={noOp}
                placeholder="Buy milk"
                readOnly
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
                value={tmpTodoItem.description || ""}
                onChange={noOp}
                placeholder="Any additional detail..."
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check
                label="Looking back, was this true?"
                name="isTrue"
                checked={tmpTodoItem.isDone}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </Form>
        <Button variant="secondary" onClick={confirmDelete}>
          <i className="fas fa-trash" /> Delete
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TodoItemEditor;

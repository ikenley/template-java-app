import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { TodoItem } from "../types";
import Navbar from "../shared/Navbar";
import { AuthContext } from "../auth/AuthContext";
import LoginButton from "../auth/LoginButton";
import CreateTodoModal from "./CreateTodoModal";
//import TodoItemEditor from "./TodoItemEditor";
import TodoGrid from "./TodoGrid";

const MainPage = () => {
  const { isAuthorized, hasLoaded } = useContext(AuthContext);
  const [todoItems, setTodoItems] = useState<TodoItem[] | null>(null);
  const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);

  const createTodoItem = useCallback(
    async (item: TodoItem) => {
      const res = await axios.post("/api/todo", item);

      const nextItems = [...(todoItems || []), res.data];
      setTodoItems(nextItems);
    },
    [todoItems, setTodoItems]
  );

  const selectTodoItem = useCallback(
    (item: TodoItem | null) => {
      setSelectedItem(item);
    },
    [setSelectedItem]
  );

  // const updateTodoItem = useCallback(
  //   async (todoItem: TodoItem) => {
  //     const res = await axios.post("/api/todo/update", todoItem);

  //     const nextTodoItems = [...(todoItems || [])];
  //     const ix = nextTodoItems.findIndex((p) => p.id === todoItem.id);
  //     nextTodoItems[ix] = res.data;
  //     setTodoItems(nextTodoItems);
  //   },
  //   [todoItems, setTodoItems]
  // );

  // const deleteTodoItem = useCallback(
  //   async (todoItem: TodoItem) => {
  //     //setSelTodoItem(null);

  //     await axios.delete(`/api/todo/${todoItem.id}`);

  //     if (todoItems) {
  //       const nextTodoItems = todoItems.filter(
  //         (p) => p.id !== todoItem.id
  //       );
  //       setTodoItems(nextTodoItems);
  //     }
  //   },
  //   [todoItems, setTodoItems]
  // );

  // Get TodoItems on page load
  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    if (!isAuthorized) {
      setTodoItems([]);
      return;
    }

    // axios.get("/api/todo").then((res) => {
    //   setTodoItems(res.data);
    // });
    setTodoItems([]);
  }, [hasLoaded, isAuthorized, setTodoItems]);

  return (
    <div className="overview-page">
      <Navbar />
      <main role="main" className="container-xl container-xxl pt-3 pb-5">
        <div className="jumbotron py-2 py-md-3">
          <h1 className="display-5">TODO's</h1>
          <p className="lead">
            Yet another TODO app. This time with the scintillatingly fresh Java
            language
            <br />
            <Link to="/about">Learn more</Link>
          </p>
        </div>
        <div className="mb-3">
          <CreateTodoModal createTodoItem={createTodoItem} />
        </div>
        {hasLoaded ? (
          isAuthorized ? (
            <TodoGrid
              isLoading={todoItems === null}
              todoItems={todoItems || []}
              selectTodoItem={selectTodoItem}
              showResolved
            />
          ) : (
            <div>
              <Alert variant="secondary">
                You are not logged in. Consider doing that.
                <hr />
                <LoginButton />
              </Alert>
            </div>
          )
        ) : (
          <Skeleton height={420} />
        )}
      </main>
    </div>
  );
};

export default MainPage;

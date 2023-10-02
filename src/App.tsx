import { useState } from "react";
import "./index.scss";

type TodoItem = {
  id: string;
  text: string;
  status: string;
};

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<TodoItem>>([
    {
      id: "lol",
      text: "hey, do something",
      status: "todo",
    },
  ]);
  const [showActionsGuide, setShowActionsGuide] = useState<Boolean>(false);

  const handleMarkAsTodo = (targetTodo: TodoItem) => {
    let updatedTodoList = todoList.map((prevTodoItem) => {
      if (prevTodoItem.id === targetTodo.id) {
        return { ...prevTodoItem, status: "todo" };
      }
      return prevTodoItem;
    });
    setTodoList(updatedTodoList);
  };

  const handleMarkAsInProgress = (targetTodo: TodoItem) => {
    let updatedTodoList = todoList.map((prevTodoItem) => {
      if (prevTodoItem.id === targetTodo.id) {
        return { ...prevTodoItem, status: "in_progress" };
      }
      return prevTodoItem;
    });
    setTodoList(updatedTodoList);
  };

  const handleMarkAsDone = (targetTodo: TodoItem) => {
    let updatedTodoList = todoList.map((prevTodoItem) => {
      if (prevTodoItem.id === targetTodo.id) {
        return { ...prevTodoItem, status: "done" };
      }
      return prevTodoItem;
    });
    setTodoList(updatedTodoList);
  };

  const handleDeleteTodo = (targetTodo: TodoItem) => {
    let updatedTodoList = todoList.filter(
      (prevTodoItem) => prevTodoItem.id !== targetTodo.id
    );
    setTodoList(updatedTodoList);
  };

  return (
    <div className="container">
      <h3 className="app-header">Barebones ToDo</h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="todo-input"
          placeholder="todo text here..."
          value={todoText}
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />

        <button
          className="add-todo-control"
          onClick={() => {
            setTodoList([
              ...todoList,
              {
                id: Math.floor(Math.random() * Date.now()).toString(16),
                text: todoText,
                status: "todo",
              },
            ]);
            setTodoText("");
          }}
          disabled={!todoText}
        >
          add todo
        </button>
      </form>

      <div className="task-actions-guide">
        <h5
          className="guide-header"
          onClick={() => setShowActionsGuide(!showActionsGuide)}
        >
          <span>actions guide</span>
          <span className="compass-icon">🧭</span>
        </h5>

        <ul className={`guide-body ${showActionsGuide ? "show" : ""}`}>
          <li>🥚 -- 'mark as todo'</li>

          <li>🐣 -- 'mark as in progress'</li>

          <li>🐥 -- 'mark as done'</li>

          <li>🐤 -- 'delete todo'</li>
        </ul>
      </div>

      <div className="list-grid">
        <div className="todo-list-wrapper task-list-wrapper">
          <h5 className="section-header">procrastinating:</h5>

          {todoList.length !== 0 ? (
            <ul className="todo-list task-list">
              {todoList
                .filter((todoItem) => todoItem.status === "todo")
                .map((todoItem) => (
                  <li className="todo-item task-item" key={todoItem.id}>
                    <span className="task-text">{todoItem.text}</span>

                    <div className="task-actions">
                      <button
                        className="mark-as-in-progress"
                        onClick={() => {
                          handleMarkAsInProgress(todoItem);
                        }}
                      >
                        🐣
                      </button>

                      <button
                        className="mark-as-done"
                        onClick={() => {
                          handleMarkAsDone(todoItem);
                        }}
                      >
                        🐥
                      </button>

                      <button
                        className="remove-todo-item"
                        onClick={() => {
                          handleDeleteTodo(todoItem);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="no-data-text">nothing to do</p>
          )}
        </div>

        <div className="in-progress-list-wrapper task-list-wrapper">
          <h5 className="section-header">atleast tyring:</h5>

          {todoList.length !== 0 &&
          todoList.some((todoItem) => todoItem.status === "in_progress") ? (
            <ul className="in-progress-list task-list">
              {todoList.map((todoItem) => (
                <li className="task-item">
                  <span className="task-text">{todoItem.text}</span>

                  <div className="task-actions">
                    <button
                      className="mark-as-todo-control"
                      onClick={() => {
                        handleMarkAsTodo(todoItem);
                      }}
                    >
                      🥚
                    </button>

                    <button
                      className="mark-as-done-control"
                      onClick={() => {
                        handleMarkAsDone(todoItem);
                      }}
                    >
                      🐥
                    </button>

                    <button
                      className="remove-todo-item"
                      onClick={() => {
                        handleDeleteTodo(todoItem);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data-text">nothing in progress</p>
          )}
        </div>

        <div className="done-list-wrapper task-list-wrapper">
          <h5 className="section-header">did it:</h5>

          {todoList.length !== 0 &&
          todoList.some((todoItem) => todoItem.status === "done") ? (
            <ul className="done-list task-list">
              {todoList.map((todoItem) => (
                <li className="task-item">
                  <span className="task-text">{todoItem.text}</span>

                  <div className="task-actions">
                    <button
                      className="mark-as-todo-control"
                      onClick={() => {
                        handleMarkAsTodo(todoItem);
                      }}
                    >
                      🥚
                    </button>

                    <button
                      className="mark-as-in-progress-control"
                      onClick={() => {
                        handleMarkAsInProgress(todoItem);
                      }}
                    >
                      🐣
                    </button>

                    <button
                      className="remove-todo-item"
                      onClick={() => {
                        handleDeleteTodo(todoItem);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data-text">nothing done</p>
          )}
        </div>
      </div>

      <div className="trashed-section">
        <h5>🗑️ trashed</h5>
      </div>
    </div>
  );
}

export default App;

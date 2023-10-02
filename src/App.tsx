import { useEffect, useState } from "react";
import "./index.scss";

type TodoItem = {
  id: string;
  text: string;
  status: string;
};

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<TodoItem>>([]);
  const [showActionsGuide, setShowActionsGuide] = useState<Boolean>(false);
  const [showTrashedList, setShowTrashedList] = useState<Boolean>(false);

  useEffect(() => {
    // is todo list is already stored in localStorage, fetch and update the state
    if (localStorage.getItem("barebonesTodoList")) {
      let stringifiedList = localStorage.getItem("barebonesTodoList");

      if (stringifiedList) {
        console.log("stringifiedList: ", stringifiedList);

        let parsedList = JSON.parse(stringifiedList);
        setTodoList(parsedList);
      }
    }
  }, []);

  const renderTaskActionBtn = (todoItem: TodoItem, statusToUpdate: string) => {
    return (
      <button
        className="mark-as-in-progress"
        onClick={() => {
          let updatedTodoList = todoList.map((prevTodoItem) => {
            return prevTodoItem.id === todoItem.id
              ? { ...prevTodoItem, status: statusToUpdate }
              : prevTodoItem;
          });
          setTodoList(updatedTodoList);
          localStorage.setItem(
            "barebonesTodoList",
            JSON.stringify(updatedTodoList)
          );
        }}
      >
        {statusToUpdate === "todo" ? "🥚" : ""}
        {statusToUpdate === "in_progress" ? "🐣" : ""}
        {statusToUpdate === "done" ? "🐥" : ""}
        {statusToUpdate === "delete" ? "🗑️" : ""}
      </button>
    );
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
            let formattedTodo = [
              ...todoList,
              {
                id: Math.floor(Math.random() * Date.now()).toString(16),
                text: todoText,
                status: "todo",
              },
            ];
            setTodoList(formattedTodo);
            localStorage.setItem(
              "barebonesTodoList",
              JSON.stringify(formattedTodo)
            );
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

      <div className="task-lists-grid">
        <div className="todo-list-wrapper task-list-wrapper">
          <h5 className="section-header">procrastinating:</h5>

          {todoList.length !== 0 &&
          todoList.some((todoItem) => todoItem.status === "todo") ? (
            <ul className="todo-list task-list">
              {todoList
                .filter((todoItem) => todoItem.status === "todo")
                .map((todoItem) => (
                  <li className="todo-item task-item" key={todoItem.id}>
                    <span className="task-text">{todoItem.text}</span>

                    <div className="task-actions">
                      {renderTaskActionBtn(todoItem, "in_progress")}
                      {renderTaskActionBtn(todoItem, "done")}
                      {renderTaskActionBtn(todoItem, "delete")}
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
              {todoList
                .filter((todoItem) => todoItem.status === "in_progress")
                .map((todoItem) => (
                  <li className="task-item">
                    <span className="task-text">{todoItem.text}</span>

                    <div className="task-actions">
                      {renderTaskActionBtn(todoItem, "todo")}
                      {renderTaskActionBtn(todoItem, "done")}
                      {renderTaskActionBtn(todoItem, "delete")}
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
              {todoList
                .filter((todoItem) => todoItem.status === "done")
                .map((todoItem) => (
                  <li className="task-item">
                    <span className="task-text">{todoItem.text}</span>

                    <div className="task-actions">
                      {renderTaskActionBtn(todoItem, "todo")}
                      {renderTaskActionBtn(todoItem, "in_progress")}
                      {renderTaskActionBtn(todoItem, "delete")}
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
        <ul className={`trashed-todo-list ${showTrashedList ? "show" : ""}`}>
          {todoList.length !== 0 &&
          todoList.some((todoItem) => todoItem.status === "delete") ? (
            todoList
              .filter((todoItem) => todoItem.status === "delete")
              .map((todoItem) => (
                <li className="task-item trashed-todo-item">
                  <span className="task-text">{todoItem.text}</span>
                  <div className="task-actions">
                    {renderTaskActionBtn(todoItem, "todo")}
                  </div>
                </li>
              ))
          ) : (
            <p className="no-data-text">nothing in trash</p>
          )}
        </ul>

        <h5
          className="trashed-section-header"
          onClick={() => {
            setShowTrashedList(!showTrashedList);
          }}
        >
          🗑️ trashed
        </h5>
      </div>
    </div>
  );
}

export default App;

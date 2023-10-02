import { useState } from "react";
import "./index.scss";

function App() {
  const [todoText, setTodoText] = useState("");

  return (
    <div className="container">
      <h3 className="header">TypeScript ToDo</h3>

      <input
        type="text"
        placeholder="todo text here..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
    </div>
  );
}

export default App;

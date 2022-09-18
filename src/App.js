import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [update, setUpdate] = useState(true);
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const query = await fetch("http://localhost:3001/");
    const todos = await query.json();
    setTodos(todos);
    setUpdate(false);
  };

  const createTodo = async (entry) => {
    await fetch("http://localhost:3001/", {
      method: "POST",
      body: JSON.stringify({ entry }),
      headers: { "content-type": "application/json" },
    });
    setUpdate(true);
  };

  const onKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    await createTodo(e.target.value);
    setTodos(todos);
  };

  useEffect(() => {
    if (update) getTodos();
  }, [update]);

  const Todos = () => {
    const onDeleteEntry = async (index) => {
      const entry = todos[index];
      await fetch("http://localhost:3001/" + entry.id, {
        method: "DELETE",
      });
      setUpdate(true);
    };

    return (
      <ul>
        {todos.map((entry, i) => (
          <div key={i} style={{ display: "flex" }}>
            <li>{entry.entry}</li>
            <button onClick={() => onDeleteEntry(i)}>Delete item</button>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div className="app">
      <Todos />
      <input type="text" placeholder="Write TODO" onKeyDown={onKeyDown}></input>
      <p>Hello</p>
    </div>
  );
}

export default App;

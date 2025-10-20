import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(lists));
  }, [lists]);

  function addList() {
    if (inputValue.trim() === "") return;
    const newTodo = { text: inputValue, done: false };
    setLists([...lists, newTodo]);
    setInputValue("");
  }

  function toggleDone(index) {
    setLists((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteTodo(index) {
    setLists((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        color: "#333",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "1.8rem",
            letterSpacing: "0.5px",
          }}
        >
          Todo List
        </h1>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Write a todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addList()}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={addList}
            style={{
              padding: "10px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Add
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {lists.map((todo, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                background: "#fafafa",
                border: "1px solid #eee",
                borderRadius: "8px",
                transition: "0.2s",
              }}
            >
              <span
                style={{
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "#888" : "#333",
                  flex: 1,
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => toggleDone(index)}
                style={{
                  backgroundColor: todo.done ? "#ffc107" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
              >
                {todo.done ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTodo(index)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}

          {lists.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "#999",
                fontSize: "0.95rem",
                marginTop: "10px",
              }}
            >
              No todos yet — add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

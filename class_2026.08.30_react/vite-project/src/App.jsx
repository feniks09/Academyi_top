import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: crypto.randomUUID(), 
          title: action.payload, 
          isEditing: false,
          isCompleted: false },
      ];
    case "REMOVE_TODO":
      console.log(state, action);
      return state.filter((todo) => todo.id !== action.payload);

    case "TOGGLE_EDIT":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isEditing: true } : todo,
      );
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title, isEditing: false }
          : todo,
      );
    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
      todo.id === action.payload
    ? { isCompleted: !todo.isCompleted}
    : todo)
    default:
      return state;
  }
};

function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.todoText.value;
    if (!value) return;

    dispatch({ type: "ADD_TODO", payload: value });
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="todoText" placeholder="New tode..." />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(({ title, id, isEditing }) => (
          <li key={id}>
            {isEditing ? (
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    dispatch({
                      type: "UPDATE_TODO",
                      payload: { id, title: e.target.value },
                    });
                }}
                onBlue={(e) =>
                  dispatch({
                    type: "UPDATE_TODO",
                    payload: { id, title: e.target.value },
                  })
                }
                style={{ display: "block" }}
                autoFocus
              />
            ) : (
              <p>{title}</p>
            )}

            <button
              onClick={() => dispatch({ type: "TOGGLE_EDIT", payload: id })}
            >
              Edit
            </button>
            <button
              onClick={() => dispatch({ type: "REMOVE_TODO", payload: id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoApp
import { useState } from "react";
import { UserStatus } from "./components/UserStatus/UserStatus.jsx";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <UserStatus isLoggedIn={isLoggedIn} />
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        style={{ marginTop: 10 }}
      >
        {isLoggedIn ? 'Установть false' : 'Установить true'}
      </button>
    </div>
  );
}

export default App;
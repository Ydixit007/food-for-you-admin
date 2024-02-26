import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isLoggedIn, restaurantAuth } from "./services/Auth";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    setIsLogin(isLoggedIn);
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={isLogin ? <Homepage isLoggedIn={setIsLogin}/> : <Login isLoggedIn={setIsLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

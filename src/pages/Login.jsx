import React, { useState } from "react";
import { restaurantAuth } from "../services/Auth";
import Toast from "../components/Toast";

const Login = ({ isLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isToast, setIsToast] = useState({
    type: "error",
    visible: false,
    message: "",
  });

  const cafeLogin = async () => {
    const user = await restaurantAuth(Username, Password);
    if (user !== undefined) {
      isLoggedIn(true);
      setIsToast({
        type: "success",
        visible: true,
        message: "Login success",
      });
    }else{
      setIsToast({
        type: "error",
        visible: true,
        message: "Login Failed",
      });
    }
  };

  return (
    <div className="login-page w-full h-[100vh] flex justify-center items-center flex-col">
      <h1 className="text-xl font-bold text-primary-content mb-8">Food for You : Admin Panel</h1>
      <div className="card w-96 bg-base-200 shadow-xl flex justify-center items-center flex-col gap-2 p-2">
        <h2 className="card-title text-primary-content mb-4 mt-4">Cafe Login</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="grow"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button
          className="btn btn-primary mt-2 mb-4"
          onClick={cafeLogin}
        >
          Login
        </button>
      </div>
      {isToast.visible && (
        <Toast type={isToast.type} message={isToast.message} setToast={setIsToast} />
      )}
    </div>
  );
};

export default Login;

import React from "react";
import { restaurantAuth } from "../services/Auth";

const Login = ({isLoggedIn}) => {
  return (
    <>
      <div>Login</div>
      <button
        onClick={async () => {
          if(await restaurantAuth("yash", "123456")){
            isLoggedIn(true);
          }
          // console.log(await restaurantAuth("yash", "123456"));
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;

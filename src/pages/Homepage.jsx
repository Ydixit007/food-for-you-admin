import React from "react";

const Homepage = ({isLoggedIn}) => {
  return (
    <>
      <div>Homepage</div>
      <button
        onClick={() => {
          localStorage.removeItem("username");
          isLoggedIn(false);
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Homepage;

import React, { useEffect } from "react";

const Toast = ({ type, message, setToast = () => {}, duration = 2 }) => {
  useEffect(() => {
    setTimeout(() => {
      setToast({
        type: "error",
        visible: false,
        message: "",
      });
    }, duration * 1000);
  }, []);

  return (
    <div className="toast">
      <div
        className={`alert ${
          type === "success" ? "alert-success" : "alert-error"
        }`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;

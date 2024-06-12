// src/components/FlashMessage.jsx

import React, { useEffect } from "react";

const FlashMessage = ({ message, type, clearMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, 3000); // Flash message disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [clearMessage]);

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-md shadow-md text-white z-50 transition-all duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default FlashMessage;

import React from "react";
import { Toaster } from "react-hot-toast";

const Alert = () => {
  return (
    <Toaster
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default Alert;

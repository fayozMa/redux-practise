import React from "react";
import Header from "../components/Header";
function Mainlayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Mainlayout;

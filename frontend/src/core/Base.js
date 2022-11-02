import React from "react";
import Menu from "./Menu";

const Base = ({ title, children }) => {
  return (
    <div>
      <div>
        <Menu />
        <div className="text-center text-dark mt-3">
          <h2>{title}</h2>
        </div>
        <div>{children}</div>
      </div>
      {/* <footer className="footer bg-success mt-auto py-3">
        <div className="container-fluid text-white">
          <h5>Fell free to connect</h5>
          <button className="bg-warning text-dark">Contact Us</button>
        </div>
        <div className="container"> </div>
      </footer> */}
    </div>
  );
};

export default Base;

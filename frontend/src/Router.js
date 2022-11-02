import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import ReportLostItems from "./lostitems/ReportLostItems";
import ReportFoundItems from "./lostitems/ReportFoundItems";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<Signup />} />
          <Route path="/login" exact element={<Signin />} />
          <Route path="/ReportLost" exact element={<ReportLostItems />} />
          <Route path="/ReportFound" exact element={<ReportFoundItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

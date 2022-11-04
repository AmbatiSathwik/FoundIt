import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import ReportLostItems from "./lostitems/ReportLostItems";
import AllLostItems from "./lostitems/AllLostItems";
import AllFoundItems from "./lostitems/AllFoundItems";
import ReportFoundItems from "./lostitems/ReportFoundItems";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import Contact from "./core/Contact";
import ItemDetails from "./lostitems/ItemDetails";

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
          <Route path="/lostItems" exact element={<AllLostItems />} />
          <Route path="/foundItems" exact element={<AllFoundItems />} />
          <Route path="/dashboard" exact element={<UserDashBoard />} />
          <Route path="/ContactUs" exact element={<Contact />} />
          <Route
            path="/itemdetails/:id/:status"
            exact
            element={<ItemDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

import React from "react";
import Nav from "./Nav";
import Contact from "./Contact";
import DataFree from "./APIFree";
import APIDeals from "./APIDeals";
import Error from "./Error";
import Credits from "./Credits";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Layout() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="free" element={<DataFree />} />
          <Route path="deals" element={<APIDeals />} />
          <Route path="credits" element={<Credits />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

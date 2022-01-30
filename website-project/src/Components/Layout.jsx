import React from "react";
import Nav from "./Nav";
import Contact from "./Contact";
import DataFree from "./APIFree";
import APIDeals from "./APIDeals";
import Error from "./Error";
import Home from "./About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Layout() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="free" element={<DataFree />} />
          <Route path="deals" element={<APIDeals />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

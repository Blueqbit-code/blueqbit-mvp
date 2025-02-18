import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShipmentList from "./components/ShipmentList";
import PostShipment from "./components/PostShipment";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Welcome to BlueQbit Logistics</h1>
        <p>Efficient and secure shipment management system.</p>
      </div>
      <Routes>
        <Route path="/" element={<ShipmentList />} />
        <Route path="/post-shipment" element={<PostShipment />} />
      </Routes>
    </Router>
  );
}

export default App;

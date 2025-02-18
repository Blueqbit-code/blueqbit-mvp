import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff" }}>
      <Link to="/" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>
        Shipments
      </Link>
      <Link to="/post-shipment" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>
        Post Shipment
      </Link>
    </nav>
  );
};

export default Navbar;

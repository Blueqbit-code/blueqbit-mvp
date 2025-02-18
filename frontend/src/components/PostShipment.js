import React, { useState } from "react";
import API_BASE_URL from "../config";

const PostShipment = () => {
  const [shipperId, setShipperId] = useState(""); // Added shipper ID input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure shipperId is provided
    if (!shipperId) {
      alert("Please enter a valid shipper ID.");
      return;
    }

    const shipmentData = {
      title,
      description,
      origin,
      destination,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/shippers/${shipperId}/shipments`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shipmentData),
      });

      if (response.ok) {
        alert("Shipment successfully added!");
        setTitle("");
        setDescription("");
        setOrigin("");
        setDestination("");
        setShipperId("");
      } else {
        const errorData = await response.json();
        alert(`Error adding shipment: ${errorData.error}`);
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div>
      <h2>Post a New Shipment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={shipperId}
          onChange={(e) => setShipperId(e.target.value)}
          placeholder="Shipper ID"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Shipment Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin"
          required
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostShipment;

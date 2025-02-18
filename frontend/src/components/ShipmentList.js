import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/shippers`) // ✅ FIXED ENDPOINT
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch shipments");
        return response.json();
      })
      .then((data) => {
        // Assuming shipments are inside shippers
        const allShipments = data.flatMap((shipper) => shipper.shipmentsPosted || []);
        setShipments(allShipments);
      })
      .catch((error) => console.error("Error fetching shipments:", error));
  }, []);

  return (
    <div>
      <h2>Shipment List</h2>
      <ul>
        {shipments.length > 0 ? (
          shipments.map((shipment) => (
            <li key={shipment._id}>
              {shipment.companyName} - {shipment.status}
            </li>
          ))
        ) : (
          <p>No shipments found.</p>
        )}
      </ul>
    </div>
  );
};

export default ShipmentList;

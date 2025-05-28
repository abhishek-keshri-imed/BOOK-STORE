import React, { useState, useEffect } from "react";
import "./ManageAddress.css";
import { toast } from "react-toastify";

const ManageAddress = () => {
  const [existingAddress, setExistingAddress] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(
          "http://localhost:1000/api/store/user/information",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok && data.address) {
          setExistingAddress(data.address);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!street || !city || !state || !zip || !country) {
      toast.error("Please fill in all address fields before updating.");
      return;
    }

    const combinedAddress = [street, city, state, zip, country].join(", ");

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:1000/api/store/user/update-address",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ address: combinedAddress }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Address updated successfully!");
        setExistingAddress(combinedAddress);
        handleCancel();
      } else {
        alert(data.message || "Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Error updating address");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setCountry("");
  };

  return (
    <div className="manage-address-container">
      <h2>Manage Address</h2>

      <form onSubmit={handleSubmit} className="address-flex-container">
        {/* Left: Existing Address */}
        <div className="left-column">
          <label htmlFor="existingAddress">Existing Address:</label>
          <textarea id="existingAddress" value={existingAddress} readOnly />
        </div>

        {/* Right: New Address Inputs */}
        <div className="right-column">
          <h3>Enter New Address Details</h3>

          <label>Street:</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />

          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />

          <label>Zip:</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />

          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Address"}
            </button>
            <button type="button" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageAddress;

import React, { useEffect, useState } from "react";
import './Carts.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Carts = () => {

    const [carts,setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

     useEffect(() => {
    const fetchCarts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:1000/api/store/get-all-cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Ensure response.data.carts is an array
        setCarts(response.data.carts || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load favourites");
        setCarts([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return <div>Loading favourites...</div>;
  if (error) return <div>{error}</div>;

  return (
     <div className="carts-container">
      <div className="carts-list">
        {carts.map((book) => (
          <div className="carts-card" key={book._id}>
            <img
              src={book.url || "https://via.placeholder.com/150"}
              alt={book.title}
              className="carts-book-image"
              onClick={() => navigate(`/user-dashboard/get-book/${book._id}`)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carts

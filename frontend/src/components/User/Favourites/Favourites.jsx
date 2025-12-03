import React, { useEffect, useState } from "react";
import "./Favourites.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:1000/api/store/get-all-favourites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure response.data.favourites is an array
        setFavourites(response.data.favourites || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load favourites");
        setFavourites([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) return <div>Loading favourites...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="favourites-container">
      <div className="favourites-list">
        {favourites.map((book) => (
          <div className="favourite-card" key={book._id}>
            <img
              src={book.url || "https://via.placeholder.com/150"}
              alt={book.title}
              className="favourite-book-image"
              onClick={() => navigate(`/user-dashboard/get-book/${book._id}`)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;

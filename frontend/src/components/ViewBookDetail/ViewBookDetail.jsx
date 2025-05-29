import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import "./ViewBookDetail.css";

const ViewBookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // State to track if book is favorited and added to cart
  const [isFavAdded, setIsFavAdded] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);

  useEffect(() => {
    // Fetch book details
    fetch(`http://localhost:1000/api/store/get-book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setIsLoaded(true);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Check if this book is already in user's favourites on component mount
    fetch(`http://localhost:1000/api/store/get-all-favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.favourites) {
          const favIds = data.favourites.map((book) => book._id || book);
          setIsFavAdded(favIds.includes(id));
        }
      })
      .catch((err) => {
        console.error("Error checking favourites:", err);
      });
  }, [id, isLoggedIn, token]);

  // Toggle favourite (add/remove)
  const handleToggleFavourite = () => {
    if (!isLoggedIn) {
      toast.warning("You should log in to manage favourites");
      return;
    }

    const url = isFavAdded
      ? `http://localhost:1000/api/store/remove-book-from-favoutite/${id}`
      : `http://localhost:1000/api/store/add-book-to-favourites/${id}`;

    const method = isFavAdded ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message);
          setIsFavAdded(!isFavAdded);
        } else {
          toast.error(data.message || "Failed to update favourites");
        }
      })
      .catch(() => toast.error("Failed to update favourites"));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.warning("You should log in to add to cart");
      return;
    }
    toast.success("Book added to cart");
    setIsCartAdded(true);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={`view-book-container ${isLoaded ? "loaded" : ""}`}>
      <div className="view-book">
        <div className="book-image-wrapper">
          <img src={book.url} alt={book.title} className="book-image" />
        </div>
        <div className="book-content">
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Price:</strong> ₹{book.price}
          </p>
          <p>
            <strong>Language:</strong> {book.language}
          </p>
          <div className="book-description">{book.desc}</div>

          <div className="book-actions">
            <button
              onClick={handleToggleFavourite}
              className={`book-btn ${isLoggedIn ? "enabled" : "disabled"}`}
              disabled={!isLoggedIn}
              aria-label="Toggle favourite"
              type="button"
            >
              {isFavAdded ? (
                <FaHeart size={25} color="red" />
              ) : (
                <FaRegHeart size={25} />
              )}
              {" "} {isFavAdded ? "Remove from Favourites" : "Add to Favourites"}
            </button>

            <button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.info("You should log in");
                  return;
                }
                handleAddToCart();
              }}
              className={`book-btn ${isLoggedIn ? "enabled" : "disabled"}`}
              disabled={!isLoggedIn}
              aria-label="Add to cart"
              type="button"
            >
              <FaShoppingCart size={25} color={isCartAdded ? "green" : undefined} />
              {" "} Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa"; // import icons
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
    fetch(`http://localhost:1000/api/store/get-book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setIsLoaded(true);
        // Optional: check if already favorited or in cart, 
        // for demo setting false initially
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  const handleAddToFav = () => {
    if (!isLoggedIn) {
      toast.warning("You should log in to add to favourites");
      return;
    }
    fetch(`http://localhost:1000/api/store/add-book-to-favourites/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setIsFavAdded(true);
      })
      .catch(() => toast.error("Failed to add to favourites"));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.warning("You should log in to add to cart");
      return;
    }
    // Demo: just update state and toast
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
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <div className="book-description">{book.desc}</div>

          <div className="book-actions">
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.info("You should log in");
                  return;
                }
                handleAddToFav();
              }}
              onMouseOver={() => {
                if (!isLoggedIn) toast.info("You should log in");
              }}
              className={`book-btn ${isLoggedIn ? "enabled" : "disabled"}`}
              disabled={!isLoggedIn}
              aria-label="Add to favourites"
              type="button"
            >
              {isFavAdded ? (
                <FaHeart size={25} color="red" />
              ) : (
                <FaRegHeart size={25} />
              )}
              {" "} Add to Favourites
            </button>

            <button
              onClick={() => {
                if (!isLoggedIn) {
                  toast.info("You should log in");
                  return;
                }
                handleAddToCart();
              }}
              onMouseOver={() => {
                if (!isLoggedIn) toast.info("You should log in");
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

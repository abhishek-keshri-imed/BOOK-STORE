import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewBookDetail.css"; // Import the CSS file

const ViewBookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);  // Track loading state

  useEffect(() => {
    // Fetch the book details from the backend
    fetch(`http://localhost:1000/api/store/get-book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);        // Set book data
        setIsLoaded(true);     // Set isLoaded to true after data is fetched
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  if (!isLoaded) {
    return <div>Loading...</div>;  // Show loading until data is fetched
  }

  return (
  <div className={`view-book-container ${isLoaded ? 'loaded' : ''}`}>
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
      </div>
    </div>
  </div>
);
};

export default ViewBookDetail;

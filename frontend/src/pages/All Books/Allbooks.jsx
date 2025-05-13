import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allbooks.css";
import { Link } from "react-router-dom";

const Allbooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);  // Track loading state

  useEffect(() => {
    // Fetch books data when the page changes
    setIsLoaded(false); // Reset before fetching
    axios
      .get(`http://localhost:1000/api/store/get-all-books?page=${currentPage}&limit=12`)
      .then((res) => {
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
        // Add a delay before showing the content
      setTimeout(() => {
        setIsLoaded(true);
      }, 100); // 5s delay
    })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, [currentPage]);

  if (!isLoaded) {
    return (
   <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
    )
  }


  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="main">
      <div className={`books-container   ${isLoaded ? 'loaded' : ''}`}>
        {books.map((book) => (
          <Link
            to={`/get-book/${book._id}`}
            key={book._id}
            className="recent-book-card-link"
          >
          <div className="book-card">
            <img src={book.url} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <h3><strong>Price:</strong> {book.price}</h3>
          </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || books.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Allbooks;

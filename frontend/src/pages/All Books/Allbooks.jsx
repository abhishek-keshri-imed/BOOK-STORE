import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allbooks.css";

const Allbooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch books data when the page changes
    axios
      .get(`http://localhost:1000/api/store/get-all-books?page=${currentPage}&limit=6`)
      .then((res) => {
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, [currentPage]);

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="main">
      
      <div className="books-container">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img src={book.url} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <h3><strong>Price:</strong> {book.price}</h3>
          </div>
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

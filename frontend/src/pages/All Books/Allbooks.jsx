import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Allbooks.css";
import { Link } from "react-router-dom";

const Allbooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [animating, setAnimating] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
const limit = isLoggedIn ? 6 : 7;

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      axios
        .get(`http://localhost:1000/api/store/get-all-books?page=${currentPage}&limit=${limit}`)
        .then((res) => {
          setBooks(res.data.books);
          setTotalPages(res.data.totalPages);
          setAnimating(false);
        })
        .catch((err) => {
          console.error(err);
          setAnimating(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [currentPage]);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages && !animating) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={`main ${isLoggedIn ? "logged-in" : "logged-out"}`}>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className={`books-container ${animating ? "slide-out" : "slide-in"}`}>
        {filteredBooks.map((book) => (
          <Link
            to={`/get-book/${book._id}`}
            key={book._id}
            className="recent-book-card-link"
          >
            <div className="book-card">
              <img src={book.url} alt={book.title} />
              <h5>{book.title}</h5>
              <h5><strong>Price:</strong> {book.price}</h5>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || animating}
          className="prev-btn"
        >
          &#9664;
        </button>

        {[...Array(Math.min(totalPages, 5)).keys()].map((i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={pageNum === currentPage || animating}
              className={pageNum === currentPage ? "active" : ""}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || animating}
          className="next-btn"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Allbooks;

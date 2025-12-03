import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookCard.css";

const RecentBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1000/api/store/books/recent")
      .then((res) => {
        console.log("Fetched books:", res.data); // Should show 6 books
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);

  return (
    <>
      <h2 className="recent-books-heading">Recently Added Books</h2>
      <div className="recent-books-container">
        {books.map((book) => (
          <Link
            to={`/get-book/${book._id}`}
            key={book._id}
            className="recent-book-card-link"
          >
            <div className="recent-book-card">
              <img src={book.url} alt={book.title} />
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <h3>
                <strong>Price:</strong> {book.price}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecentBooks;

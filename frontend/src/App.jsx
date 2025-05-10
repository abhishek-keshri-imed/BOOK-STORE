import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Allbooks from "./pages/All Books/Allbooks";
import BookCard from "./components/BookCard/BookCard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="page-wrapper">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/all-books" element={<Allbooks/>} />
        </Routes>
        <BookCard/>
        <Footer />
      </div>
    </>
  );
}

export default App;

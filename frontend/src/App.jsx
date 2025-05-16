import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Allbooks from "./pages/All Books/Allbooks";
import ViewBook from "./components/ViewBookDetail/ViewBookDetail"
import Signup from "./pages/Signup/Signup";


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
          <Route path="/get-book/:id" element={<ViewBook/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

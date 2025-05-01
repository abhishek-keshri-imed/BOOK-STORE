import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./pages/Hero/Hero";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Hero/>
        <Footer/>
      </div>
    </>
  );
}

export default App;

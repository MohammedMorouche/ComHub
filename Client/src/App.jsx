import "./App.css";
import "@fortawesome/free-regular-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Acceuil from "./Pages/Acceuil";
import Shop from "./Pages/Shop";

import NotFound from "./Components/NotFound";
import Contact from "./Pages/Contact";
import Apropos from "./Pages/Apropos";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <Router>
      <div>
        {/* Your header goes here */}
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/shop" element={<Shop />}>
            <Route path="all" element={<Shop />} />
            <Route path="laptops" element={<Shop />} />
            <Route path="composants" element={<Shop />} />
            <Route path="peripheriques" element={<Shop />} />
            <Route path="accesoires" element={<Shop />} />
          </Route>
          <Route path="/apropos" element={<Apropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route component={NotFound} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

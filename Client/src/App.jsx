import "./App.css";
import "@fortawesome/free-regular-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Acceuil from "./Pages/Acceuil";
import Shop from "./Pages/Shop";
import Connexion from "./Pages/Connexion";
import Inscription from "./Pages/Inscription";
import NotFound from "./Components/NotFound";
import Contact from "./Pages/Contact";
import Apropos from "./Pages/Apropos";
import MotDePasseOublie from "./Pages/MotDePasseOublie";
import Footer from "./Components/Footer/Footer";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/shop" element={<Shop />}>
          <Route path="/shop/all" element={<Shop />} />
          <Route path="laptops" element={<Shop />} />
          <Route path="composants" element={<Shop />} />
          <Route path="peripheriques" element={<Shop />} />
          <Route path="accesoires" element={<Shop />} />
        </Route>
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />

          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
    
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

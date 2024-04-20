import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ScrollToTop from "../ScrollToTop";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo/ComHub_prev_ui.png";
import ActiveLink from "../ActiveLink";
const MainHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Close sidebar when route changes
  const location = useLocation();
  useEffect(() => {
      setMobileMenuOpen(false);
  }, [location]);



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <div className="mobile-menu">
        <span className="bars" onClick={handleToggleMobileMenu}>
          <FontAwesomeIcon
            icon={isMobileMenuOpen ? faXmark : faBars}
            className="faBars"
          />
        </span>
      </div>
      <div className="main-logo">
        <ScrollToTop to="/">
          <img src={logo} />
        </ScrollToTop>
      </div>

      <div className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <ActiveLink to="/">Acceuil</ActiveLink>
          </li>
          <li>
            <ActiveLink to="/shop/all">Shop</ActiveLink>
          </li>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={isHovered ? "dropdown-active kk" : "kk"}
          >
            <div className="cc">
              <p>Catégories </p>
              <FontAwesomeIcon icon={faAngleDown} className="ff" />
            </div>
            {isHovered && (
              <ul className="dropdown-menu">
                <li>
                  <ActiveLink to="/shop/laptops">Laptops</ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/shop/composants">Composants</ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/shop/peripheriques">
                    Périphériques
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink to="/shop/accesoires">Accessoires</ActiveLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <ActiveLink to="/apropos">À propos</ActiveLink>
          </li>
          <li>
            <ActiveLink to="/contact">Contact</ActiveLink>
          </li>
        </ul>
      </div>

      <div className="account">
        <button className="cart">
          <FontAwesomeIcon icon={faCartShopping} className="faCartShopping" />
        </button>

        <div className="log-in">
          <button className="button-ani">Connexion</button>
          <button className="button-ani">Inscription</button>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;

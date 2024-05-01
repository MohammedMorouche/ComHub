import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ScrollToTop from "../ScrollToTop";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo/ComHub_prev_ui.png";
import ActiveLink from "../ActiveLink";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const MainHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = auth.currentUser;
  const nav = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      nav("/");
    });
  };

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
        <div className="log-in">
          {!user && (
            <>
              <ScrollToTop to="/connexion">
                <button className="button-ani">Connexion</button>
              </ScrollToTop>
              <ScrollToTop to="/inscription">
                <button className="button-ani">Inscription</button>
              </ScrollToTop>
            </>
          )}
          {user && (
            <>
              <button className="cart">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="faCartShopping"
                />
              </button>
              <button onClick={handleLogout} className="button-ani">
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
MainHeader.propTypes = {
  user: PropTypes.string.isRequired, // name prop is required and must be a string
};
export default MainHeader;

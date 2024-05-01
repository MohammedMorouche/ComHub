import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import ScrollToTop from "../ScrollToTop";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo/ComHub_prev_ui.png";
import ActiveLink from "../ActiveLink";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Cart from "../Cart/Cart.jsx";
import {CartContext}  from "../Cart/CartUtils.jsx";
import PropTypes from "prop-types";
import styled from "styled-components";
import {FaCartFlatbedSuitcase} from "react-icons/fa6";

const CartLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    &:hover {
        color: #ccc;
    }
`;
const MainHeader = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);
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
        <CartLink to='/Cart'>
          <FaCartFlatbedSuitcase size={25}></FaCartFlatbedSuitcase>
        </CartLink>
        {/*<Cart cartItems={cartItems} totalPrice={totalPrice} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />*/}
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
            <button onClick={handleLogout} className="button-ani">
              log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
  MainHeader.propTypes = {
    user: PropTypes.string.isRequired,
    cartItems: PropTypes.array.isRequired,
    totalPrice: PropTypes.number.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
  };
export default MainHeader;

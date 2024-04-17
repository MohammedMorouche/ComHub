import logo from "../../images/logo/ComHub_prev_ui.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "../ScrollToTop";
import ActiveLink from "../ActiveLink";
const Footer = () => {
  return (
    <div className="footer_glo">
      <div className="footer">
        <div className="logo">
          <ScrollToTop to="/">
            <img src={logo} />
          </ScrollToTop>

          {/* <h1 className="od">
          Com<span>Hub</span>
        </h1> */}
        </div>
        <div className="page">
          <h2>Pages</h2>
          <ul>
            <li>
              <ActiveLink to="/">Acceuil</ActiveLink>
            </li>
            <li>
              <ActiveLink to="/shop/all">Shop</ActiveLink>
            </li>

            <li>
              <ActiveLink to="/apropos">À Propos</ActiveLink>
            </li>
            <li>
              <ActiveLink to="/contact">Contact</ActiveLink>
            </li>
          </ul>
        </div>
        <div className="categories">
          <h2>Catégories</h2>
          <ul>
            <li>
              <ActiveLink to = "/shop/laptops">Laptops</ActiveLink>
            </li>
            <li>
              <ActiveLink to = "/shop/composants">Composants</ActiveLink>
            </li>
            <li>
              <ActiveLink to = "/shop/peripheriques">Périphériques</ActiveLink>
            </li>
            <li>
              <ActiveLink to = "/shop/accesoires">Accessoires</ActiveLink>
            </li>
          </ul>
        </div>
        <div className="contact">
          <h2>Contact</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLocationDot} className="piw" />
              <p>Adresse : tlemcen,algerie</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="piw" />
              <p>Téléphone : 0725892014</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="piw" />
              <p>Email : comhub@gmail.com</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_copy">
        Copyright 2024 ©<strong> ComHub</strong>
      </div>
    </div>
  );
};
export default Footer;

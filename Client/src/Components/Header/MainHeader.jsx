import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ScrollToTop from "../ScrollToTop";
import { Link } from "react-router-dom";
import ActiveLink from "../ActiveLink";
const MainHeader =()=>{
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return(
        <div className="header">
        <div className="container">
          <nav>
            <ul>
              <li>
              <ScrollToTop to="/">Acceuil</ScrollToTop>
                
              </li>
              <li>
                <ScrollToTop to="/shop/all">Shop</ScrollToTop>
              </li>
              <li
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={isHovered ? "dropdown-active cc" : "cc"}
              >
                <p>Catégories </p>
                <FontAwesomeIcon icon={faAngleDown} className="ff"/>
            
                {isHovered && (
                  <ul className="dropdown-menu">
                    <li>
                      <ScrollToTop to="/shop/laptops">Laptops</ScrollToTop>
                      
                    </li>
                    <li>
                      <ScrollToTop to="/shop/composants">Composants</ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop to="/shop/peripheriques">Périphériques</ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop to="/shop/accesoires">Accessoires</ScrollToTop>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <ScrollToTop to="/apropos">À propos</ScrollToTop>
                
              </li>
              <li>
                <ScrollToTop to="/contact">Contact</ScrollToTop>
          
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
}
export default MainHeader;
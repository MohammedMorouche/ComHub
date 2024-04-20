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
              <ActiveLink to="/">Acceuil</ActiveLink>
                
              </li>
              <li>
                <ActiveLink to="/shop/all">Shop</ActiveLink>
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
                      <ActiveLink to="/shop/laptops">Laptops</ActiveLink>
                      
                    </li>
                    <li>
                      <ActiveLink to="/shop/composants">Composants</ActiveLink>
                    </li>
                    <li>
                      <ActiveLink to="/shop/peripheriques">Périphériques</ActiveLink>
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
          </nav>
        </div>
      </div>
    )
}
export default MainHeader;
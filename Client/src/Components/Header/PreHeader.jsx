import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo/ComHub_prev_ui.png";
import ScrollToTop from "../ScrollToTop";
const PreHeader = () => {
  return (
    <div className="preHeader">
      <div className="container">
        <ScrollToTop to="/">
          <img src={logo} />
        </ScrollToTop>

        <div className="search">
          <input type="text" placeholder="Recherche.." />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="faMagnify" />
          </button>
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
    </div>
  );
};
export default PreHeader;

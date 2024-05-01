import PropTypes from "prop-types";
import { auth } from "../../firebase";
import ScrollToTop from "../ScrollToTop";
import { useContext } from "react";
import { CartContext } from "../Cart/CartUtils.jsx";

const Produit = ({ imgSrc, titreProduit, prixProduit }) => {
  const { addToCart } = useContext(CartContext);
  const user = auth.currentUser;
  const linkToProductPage = user ? "/shop" : "/connexion";
  const product = { id: Math.random(), imgSrc, titreProduit, prixProduit };
  return (
      <div className="produit">
        <ScrollToTop to={linkToProductPage}>
          <img src={imgSrc} alt="" />
          <h4 className="titreDeProduit">{titreProduit}</h4>
          <h5 className="PrixDeProduit">{prixProduit} DA</h5>
          <button className="button-ani" onClick={() => addToCart(product)}>
            Ajouter au panier
          </button>
        </ScrollToTop>
      </div>
  );
};

Produit.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  titreProduit: PropTypes.string.isRequired,
  prixProduit: PropTypes.string.isRequired,
};

export default Produit;
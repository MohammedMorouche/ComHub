import PropTypes from "prop-types";
import { auth } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import ScrollToTop from "../ScrollToTop";
import { useContext } from "react";
import { CartContext } from "../Cart/CartUtils.jsx";

const Produit = ({ imgSrc, titreProduit, prixProduit }) => {
 // const user = auth.currentUser;
 const [user, setUser] = useState(auth.currentUser); // State to store the current user

 useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
     setUser(currentUser); // Update the user state when the authentication state changes
   });

   // Clean up the listener when the component unmounts
   return () => {
     unsubscribe();
   };
 }, []); // useEffect runs only once on component mount
  const { addToCart } = useContext(CartContext);
  const product = { id: Math.random(), imgSrc, titreProduit, prixProduit };
  return (
      <div className="produit">
        <ScrollToTop to={user ? "/shop/" : "/connexion"}>
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
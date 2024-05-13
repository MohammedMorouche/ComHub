import PropTypes from "prop-types";
import { auth } from "../../firebase";
import { useState, useEffect, useContext } from "react";
import ScrollToTop from "../ScrollToTop";
import { CartContext } from "../Cart/CartUtils.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ProductCard = styled.div`
  background-color: #06122f;
  backdrop-filter: blur(10px);
  padding: 20px 20px 10px;
  margin-bottom: 15px;
  text-align: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  margin-right: 20px;
  min-width: 200px;
  border-radius: 9px;
  position: relative;
  color: white;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
  }
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  color: white;
`;
const Produit = ({ image, name, price, product }) => {
  console.log(product);
  const [user, setUser] = useState(auth.currentUser);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <ProductCard>
      {product.promotion && <span className="sold-sticker">Sold!</span>}

      <ScrollToTop to={user ? `/product-details/${product.id}` : "/connexion"}>
        <ProductImage src={image} alt={name} />
        <h4>{name}</h4>
        {product.promotion ? (
          <>
            <p style={{ textDecoration: "line-through", color: "gray" }}>
              {price} DA
            </p>
            <p style={{ fontWeight: "bold", color: "red" }}>
              {product.newprice} DA
            </p>
          </>
        ) : (
          <p>{price} DA</p>
        )}
      </ScrollToTop>
      {/* </Link> */}
      {user && (
        <button className="button-ani" onClick={() => addToCart(product)}>
          Ajouter au panier
        </button>
      )}
    </ProductCard>
  );
};

Produit.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired, // Update the price prop type to number
  product: PropTypes.object.isRequired,
};

export default Produit;

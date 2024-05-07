import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ProductData from "../Components/Data/ProductData";
import styled from "styled-components";
import { CartContext } from "../Components/Cart/CartUtils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SimilarProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SimilarProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  background-color: #06122f;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SimilarProductImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  object-fit: contain;
`;

const SimilarProductInfo = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const ProductDetailsPage = () => {
  const [user] = useAuthState(auth);
  // const user = auth.currentUser;
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);
  // const user = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductData();
        setProductData(data);
      } catch (err) {
        console.log("error");
      }
    };

    fetchData();
    if (!user) {
      navigate("/Connexion");
    }
  }, []);

  const selectedProduct = productData.find(
    // (product) => product.id === parseInt(productId)
    (product) => product.id === productId
  );
 
  const similarProducts = productData.filter(
    (product) =>
      product.category === selectedProduct.category &&
      product.id !== parseInt(productId)
  );
  const { addToCart } = useContext(CartContext);
  if (!selectedProduct) {
    return <div>Product not found</div>;

  }

  return (
    <ProductDetailsWrapper>
      <ProductImageWrapper>
        <ProductImage src={selectedProduct.photo} alt={selectedProduct.name} />
      </ProductImageWrapper>
      <ProductInfo>
        <h2>{selectedProduct.name}</h2>
        <p>Price: {selectedProduct.price} DA</p>
        {/* Add other product details */}
        <button
          className="button-ani"
          onClick={() => addToCart(selectedProduct)}
        >
          Ajouter au panier
        </button>
      </ProductInfo>

      <h3>Similar Products</h3>
      <SimilarProductsWrapper>
        {similarProducts.map((product) => (
          <Link to={`/product-details/${product.id}`} key={product.id}>
          <>
            <SimilarProductCard>
              <SimilarProductImage src={product.photo} alt={product.name} />
              <SimilarProductInfo>
                <h4>{product.name}</h4>
                <p>Price: {product.price} DA</p>
              </SimilarProductInfo>
              <button
                className="button-ani"
                onClick={() => addToCart(selectedProduct)}
              >
                Ajouter au panier
              </button>
            </SimilarProductCard>
            </>
           </Link>
        ))}
      </SimilarProductsWrapper>
    </ProductDetailsWrapper>
  );
};

export default ProductDetailsPage;

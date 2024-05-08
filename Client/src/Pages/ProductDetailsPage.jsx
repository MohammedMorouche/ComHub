import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductData from "../Components/Data/ProductData";
import styled from "styled-components";
import { CartContext } from "../Components/Cart/CartUtils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../App.css"

const ProductDetailsContainer = styled.div`
    display: flex;
    margin-top: 40px;
    color: black;
    margin-bottom: 50px;
`;

const ProductImage = styled.img`
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
    margin-right: 40px;
    margin-left: 30px;
`;

const ProductInfo = styled.div`
    flex: 1;
    color: black;
`;

const SimilarProductsContainer = styled.div`
    margin: 20px;
`;

const SimilarProductCard = styled.div`
    backdrop-filter: blur(10px);
    padding: 20px 20px 10px;
    margin-bottom: 15px;
    background-color: black;
    margin-right: 20px;
    text-align: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease;
    border-radius: 9px;
    position: relative;
    color: white;
    border: 1px solid gray;
    cursor: pointer;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scaleY(1) scaleX(1.25);
        top: 100%;
        width: 140%;
        height: 180%;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    &:after {
        content: '';
        position: absolute;
        left: 55%;
        transform: translateX(-50%) scaleY(1) scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background-color: #979797;
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    &:hover {
        transform: translateY(-5px);
        color: #0c0527;
        border: 1px solid white;

        &:before {
            top: -35%;
            background-color: #2b2b2b;
            transform: translate(calc(var(--x, 50%) * -1), calc(var(--y, 50%) * -1)) scaleY(1.3) scaleX(0.8);
        }

        &:after {
            top: -45%;
            background-color: #323232;
            transform: translate(calc(var(--x, 50%) * -1), calc(var(--y, 50%) * -1)) scaleY(1.3) scaleX(0.8);
        }
    }

    @media (max-width: 767px) {
        width: 50%; /* On smaller screens, display two products per line */
    }

    @media (max-width: 480px) {
        width: 100%; /* On very small screens, display one product per line */
    }
`;

const SimilarProductImage = styled.img`
    max-width: 150px;
    max-height: 150px;
    object-fit: contain;
`;

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;
const ProductDetailsPage = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { productId } = useParams();
    const [productData, setProductData] = useState([]);

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
        (product) => product.id === productId
    );

    const similarProducts = productData.filter(
        (product) =>
            product.category === selectedProduct?.category &&
            product.id !== productId
    );
    const { addToCart } = useContext(CartContext);

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <ProductDetailsContainer>
                <ProductImage src={selectedProduct.photo} alt={selectedProduct.name} />
                <ProductInfo>
                    <h2>{selectedProduct.name}</h2>
                    <p className="Price">Price: {selectedProduct.price} DA</p>
                    <h5>{selectedProduct.description}</h5>
                    <ActionButtons>
                        <button className="button-ani" onClick={() => addToCart(selectedProduct)}>
                            Add to Cart
                        </button>
                    </ActionButtons>
                </ProductInfo>
            </ProductDetailsContainer>
            <SimilarProductsContainer>
                <h3>Similar Products</h3>
                <div style={{ display: 'flex', overflowX: 'auto' , flexWrap: 'wrap'}}>
                    {similarProducts.map((product) => (
                        <SimilarProductCard key={product.id}>
                            <Link to={`/product-details/${product.id}`}>
                                <SimilarProductImage src={product.photo} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p className = "Price">Price: {product.price} DA</p>
                            </Link>
                            <button
                                className="button-ani"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </SimilarProductCard>
                    ))}
                </div>
            </SimilarProductsContainer>
        </div>
    );
};

export default ProductDetailsPage;

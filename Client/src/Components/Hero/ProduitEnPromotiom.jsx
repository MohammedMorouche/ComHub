import image1 from "../../images/produits/img1.jpg";
import image2 from "../../images/produits/img2.jpg";
import image3 from "../../images/produits/img3.jpg";
import image4 from "../../images/produits/img4.jpg";
import Produit from "./Produit";
import ProductData from "../Data/ProductData.jsx";
import { useState } from "react";
import { useEffect } from "react";
const ProduitEnPromotion = () => {
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
  }, []);
  return (
    <div className="produitAlaUne">
      <div className="container">
        <h1>PRODUITS EN PROMOTION</h1>
        <div className="produits">
          {productData.map((product) =>
            product.promotion ? (
              <div className="propro"
                key={product.id}
                style={{ position: "relative", display: "inline-block" }}
              >
                <span className="sold-sticker">Sold!</span>
                <Produit
                  key={product.id}
                  image={product.photo}
                  name={product.name}
                  price={product.price}
                  product={product}
                  style={{ position: "relative" }} // Ensure the product itself remains positioned relatively
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ProduitEnPromotion;

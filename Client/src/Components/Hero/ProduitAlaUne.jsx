// ProduitALaLune.jsx
import React from "react";
import ProductData from "../Data/ProductData.jsx";
import Produit from "./Produit.jsx";
import image1 from "../../images/produits/img1.jpg";
import image2 from "../../images/produits/img2.jpg";
import image3 from "../../images/produits/img3.jpg";
import image4 from "../../images/produits/img4.jpg";
import { useState } from "react";
import { useEffect } from "react";
const ProduitALaLune = () => {
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
        <h1>PRODUITS A LA UNE</h1>
        <div className="produits">
          {productData.slice(-4).map((product) => (
            // eslint-disable-next-line react/jsx-key
            // <ScrollToTop to={`/product-details/${product.id}`}>
            <Produit
              key={product.id}
              image={product.photo}
              name={product.name}
              price={product.price}
              // addToCart={addToCart}
              product={product} // Passing the addToCart function as a prop
            />
            // </ScrollToTop>
          ))}
          {/* <Produit  
                        image={image1}
                        name="ASUS 24″ LED – TUF VG249Q1A"
                        price="37900"
                        product={productData[1]}
                    />
                    <Produit
                        image={image2}
                        name="Intel Core i5-13400F (2.5 GHz / 4.6 GHz)"
                        price="41900"
                        product={productData[2]}
                    />
                    <Produit
                        image={image3}
                        name="FSP Hydro M Pro 800W"
                        price="16900"
                        product={productData[3]}
                    />
                    <Produit
                        image={image4}
                        name="AMD Ryzen 7 5800X (3.8 GHz / 4.7 GHz) TRAY"
                        price="48900"
                        product={productData[4]}
                    /> */}
        </div>
      </div>
    </div>
  );
};

export default ProduitALaLune;

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
          {productData.slice(0,4).map((product) => (
            <Produit
              key={product.id}
              image={product.photo}
              name={product.name}
              price={product.price}
         
              product={product} 
            />
           
          ))}
        
        </div>
      </div>
    </div>
  );
};

export default ProduitALaLune;

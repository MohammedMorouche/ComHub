import image1 from "../../images/produits/img1.jpg";
import image2 from "../../images/produits/img2.jpg";
import image3 from "../../images/produits/img3.jpg";
import image4 from "../../images/produits/img4.jpg";
import Produit from "./Produit";
const ProduitEnPromotion = ()=>{
    return(
        <div className="produitAlaUne">
        <div className="container">
          <h1>PRODUITS EN PROMOTION</h1>
          <div className="produits">
            <Produit
              imgSrc={image1}
              titreProduit="ASUS 24″ LED – TUF VG249Q1A"
              prixProduit="37900 DA"
            />
            <Produit
              imgSrc={image2}
              titreProduit="Intel Core i5-13400F (2.5 GHz / 4.6 GHz)"
              prixProduit="41900 DA"
            />
            <Produit
              imgSrc={image3}
              titreProduit="FSP Hydro M Pro 800W"
              prixProduit="16900 DA"
            />
            <Produit
              imgSrc={image4}
              titreProduit="AMD Ryzen 7 5800X (3.8 GHz / 4.7 GHz) TRAY"
              prixProduit="48900 DA"
            />
          </div>
        </div>
      </div> 
    );
};

export default ProduitEnPromotion;
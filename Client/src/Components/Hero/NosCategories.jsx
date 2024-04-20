import Category from "./Category";
import img1 from "../../images/categories/1-pinta.jpg";
import img1Hover from "../../images/categories/1-1-pinta.jpg";

import img2 from "../../images/categories/2-pinta.jpg";
import img2Hover from "../../images/categories/2-2-pinta.jpg";

import img3 from "../../images/categories/3-3-pinta.jpg";
import img3Hover from "../../images/categories/3-pinta.jpg";

import img4 from "../../images/categories/4-pinta.jpg";
import img4Hover from "../../images/categories/4-4-pinta.jpg";

const NosCategories = () => {
  return (  
    <div className="NosCategories">
      <div className="container">
        <h1>Nos Catégories</h1>
        <div className="categories-container">
          <Category
            cat="shop/laptops"
            title="Laptops"
            image={img1}
            imageHover={img1Hover}
          />
          <Category
            cat="shop/composants"
            title="Composants"
            image={img2}
            imageHover={img2Hover}
          />
          <Category
            cat="shop/peripheriques"
            title="Périphériques"
            image={img3}
            imageHover={img3Hover}
          />
          <Category
            cat="shop/accesoires"
            title="Accessoires"
            image={img4}
            imageHover={img4Hover}  
          />
        </div>
      </div>
    </div>
  );
};

export default NosCategories;

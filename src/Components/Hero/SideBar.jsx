import { useState, useEffect } from "react";
import Produit from "./Produit";
import image1 from "../../images/produits/img1.jpg";
import image2 from "../../images/produits/img2.jpg";
import image3 from "../../images/produits/img3.jpg";
import image4 from "../../images/produits/img4.jpg";
import ActiveLink from "../ActiveLink";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [sortOrder, setSortOrder] = useState("latest");
  const { pathname } = useLocation();

  useEffect(() => {
    // Generate random product data
    const randomProducts = [
      {
        id: 1,
        imgSrc: image1,
        titreProduit: "Laptop 1",
        prixProduit: 999.99,
        category: "laptops",
      },
      {
        id: 2,
        imgSrc: image2,
        titreProduit: "Component 1",
        prixProduit: 149.99,
        category: "composants",
      },
      {
        id: 3,
        imgSrc: image3,
        titreProduit: "Peripheral 1",
        prixProduit: 79.99,
        category: "peripheriques",
      },
      {
        id: 4,
        imgSrc: image4,
        titreProduit: "Accessory 1",
        prixProduit: 29.99,
        category: "accesoires",
      },
      {
        id: 5,
        imgSrc: image1,
        titreProduit: "Laptop 2",
        prixProduit: 1299.99,
        category: "laptops",
      },
      {
        id: 6,
        imgSrc: image2,
        titreProduit: "Component 2",
        prixProduit: 199.99,
        category: "composants",
      },
      {
        id: 7,
        imgSrc: image3,
        titreProduit: "Peripheral 2",
        prixProduit: 99.99,
        category: "peripheriques",
      },
      {
        id: 8,
        imgSrc:image4,
        titreProduit: "Accessory 2",
        prixProduit: 39.99,
        category: "accesoires",
      },
      {
        id: 9,
        imgSrc: image1,
        titreProduit: "Laptop 3",
        prixProduit: 1499.99,
        category: "laptops",
      },
      {
        id: 10,
        imgSrc: image2,
        titreProduit: "Component 3",
        prixProduit: 249.99,
        category: "composants",
      },
    ];

    setProducts(randomProducts);
    setFilteredProducts(randomProducts);

    // Set initial active filter state based on current category from URL path
    const currentCategory = pathname.split("/").pop();
    setActiveFilter(currentCategory || "all");
  }, [pathname]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (activeFilter !== "all") {
      filtered = filtered.filter((product) => product.category === activeFilter);
    }

    // Filter by price
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.prixProduit);
      return price >= priceFilter.min && price <= priceFilter.max;
    });

    // Sort by price
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "latest") {
        return b.createdAt - a.createdAt;
      } else if (sortOrder === "asc") {
        return parseFloat(a.prixProduit) - parseFloat(b.prixProduit);
      } else {
        return parseFloat(b.prixProduit) - parseFloat(a.prixProduit);
      }
    });

    setFilteredProducts(filtered);
  }, [products, activeFilter, priceFilter, sortOrder]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlePriceFilterChange = (min, max) => {
    setPriceFilter({ min, max });
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="shop-container">
      <div className="container">
        <div className="pathSidebar">
          <p>Acceuil</p>
          <span>/</span>
          <p className="shopp"> Shop</p>
        </div>
        <div className="shop">
          <div className="sidebar">
            <ul>
              <li>
                <a href="" onClick={() => handleFilterChange("all")}>
                  <ActiveLink to="/shop/all">Tous</ActiveLink>
                </a>
              </li>
              <li>
                <a href="" onClick={() => handleFilterChange("laptops")}>
                  <ActiveLink to="/shop/laptops">Laptops</ActiveLink>
                </a>
              </li>
              <li>
                <a href="" onClick={() => handleFilterChange("composants")}>
                  <ActiveLink to="/shop/composants">Composants</ActiveLink>
                </a>
              </li>
              <li>
                <a href="" onClick={() => handleFilterChange("peripheriques")}>
                  <ActiveLink to="/shop/peripheriques">Périphériques</ActiveLink>
                </a>
              </li>
              <li>
                <a href="" onClick={() => handleFilterChange("accesoires")}>
                  <ActiveLink to="/shop/accesoires">Accessoires</ActiveLink>
                </a>
              </li>
            </ul>
            <h3>Filtres</h3>
            <h3>Prix</h3>
            <div>
              <label htmlFor="min-price">Min:</label>
              <input
                type="number"
                id="min-price"
                value={priceFilter.min}
                onChange={(e) =>
                  handlePriceFilterChange(e.target.value, priceFilter.max)
                }
              />
            </div>
            <div>
              <label htmlFor="max-price">Max:</label>
              <input
                type="number"
                id="max-price"
                value={priceFilter.max}
                onChange={(e) =>
                  handlePriceFilterChange(priceFilter.min, e.target.value)
                }
              />
            </div>
            <h3>Trier par</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="sort-order"
                  checked={sortOrder === "latest"}
                  onChange={() => handleSortOrderChange("latest")}
                />
                Derniers ajoutés
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="sort-order"
                  checked={sortOrder === "asc"}
                  onChange={() => handleSortOrderChange("asc")}
                />
                Prix croissant
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="sort-order"
                  checked={sortOrder === "desc"}
                  onChange={() => handleSortOrderChange("desc")}
                />
                Prix décroissant
              </label>
            </div>
          </div>
          <div className="products-container">
            {filteredProducts.map((product) => (
              <Produit
                key={product.id}
                imgSrc={product.imgSrc}
                titreProduit={product.titreProduit}
                prixProduit={product.prixProduit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;


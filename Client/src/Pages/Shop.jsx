import { useState, useEffect, useContext } from "react";
import Produit from "../Components/Hero/Produit";
import image1 from "../images/produits/img1.jpg";
import image2 from "../images/produits/img2.jpg";
import image3 from "../images/produits/img3.jpg";
import image4 from "../images/produits/img4.jpg";
import ProductData from "../Components/Data/ProductData.jsx";
import ActiveLink from "../Components/ActiveLink";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTop from "../Components/ScrollToTop.jsx";
// import data from "../Components/Data/data.jsx";
import {
  faMagnifyingGlass,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { auth, fs } from "../firebase.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Components/Cart/CartUtils.jsx";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { pathname } = useLocation();
  
  // const { data, isLoading, error } = ProductData();


  // const [user] = useAuthState(auth);
  // // const user = auth.currentUser;
  // const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  // setProducts(data);
  useEffect(() => {
    // const { data, isLoading, error } = ProductData();
    // const fetchCommandes = async () => {
    //   const commandesCollectionRef = collection(fs, "products");
    //   const querySnapshot = await getDocs(commandesCollectionRef);
    //   const commandesData = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   console.log(commandesData);
    //   setData(commandesData);
    // };
    // fetchCommandes();
    // if (!user) {
    //   navigate("/Connexion");
    // }
    // Generate random product data
    // setProducts(data);
    const fetchData = async () => {
      try {
        
        const data = await ProductData();  
        setProducts(data);
      } catch (err) {
      console.log("error");
      }
    };

    fetchData();

    // Set initial active filter state based on current category from URL path
    const currentCategory = pathname.split("/").pop();
    setActiveFilter(currentCategory || "all");
  }, [pathname]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === activeFilter
      );
    }

    // Filter by price
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price);
      return price >= priceFilter.min && price <= priceFilter.max;
    });
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ); // Filter by search query

    // Sort by price
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "latest") {
        return b.createdAt - a.createdAt;
      } else if (sortOrder === "asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else {
        return parseFloat(b.price) - parseFloat(a.price);
      }
    });

    setFilteredProducts(filtered);
  }, [products, activeFilter, priceFilter, sortOrder, searchQuery]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlePriceFilterChange = (min, max) => {
    setPriceFilter({ min, max });
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleReset = () => {
    // Reset the price filter to default values
    setPriceFilter({ min: 0, max: Infinity });
    setIsFilterOpen(false);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handlefix = () => {
    setIsFilterOpen(false);
  };
  const location = useLocation();
  useEffect(() => {
    setIsFilterOpen(false);
  }, [location]);

  return (
    <>
      <div className={`fax ${isFilterOpen ? "fixa" : ""}`} onClick={handlefix}>
        <FontAwesomeIcon icon={faXmark} />
      </div>

      <div className="shop-container">
        <div className="container">
          <div className="before">
            <div className="pathSidebar">
              <p>Acceuil</p>
              <span>/</span>
              <p className="shopp"> Shop</p>
            </div>
            <div className="searchBar">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={`faMagnifyShop ${
                  searchQuery.length === 0 ? "" : "hidden"
                }`}
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="filtrer" onClick={handleToggleFilter}>
              <FontAwesomeIcon icon={faFilter} />
              <strong>Filtrer</strong>
            </div>
          </div>
          <div className="shop">
            <div className={`${isFilterOpen ? "open" : "sidebar"}`}>
              <ul>
                <li>
                  <a href="" onClick={() => handleFilterChange("all")}>
                    <ActiveLink to="/shop/all">Tous</ActiveLink>
                  </a>
                </li>
                <li>
                  <ActiveLink
                    onClick={() => handleFilterChange("pc")}
                    to="/shop/pc"
                  >
                    Laptops
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    onClick={() => handleFilterChange("composants")}
                    to="/shop/composants"
                  >
                    Composants
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    onClick={() => handleFilterChange("peripheriques")}
                    to="/shop/peripheriques"
                  >
                    Périphériques
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    onClick={() => handleFilterChange("accessoires")}
                    to="/shop/accessoires"
                  >
                    Accessoires
                  </ActiveLink>
                </li>
              </ul>
              <h3 className="filtH3">Filtres</h3>
              <div className="filters">
                <div className="parPrix">
                  <h3>Prix</h3>
                  <div className="parPrixContain">
                    <div>
                      <label htmlFor="min-price">Min:</label>
                      <input
                        type="number"
                        id="min-price"
                        value={priceFilter.min}
                        onChange={(e) =>
                          handlePriceFilterChange(
                            e.target.value,
                            priceFilter.max
                          )
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
                          handlePriceFilterChange(
                            priceFilter.min,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <button onClick={handleReset}>Reset</button>{" "}
                    {/* Reset button */}
                  </div>
                </div>
                <div className="parTrier">
                  <h3>Trier par</h3>
                  <div className="parTrierContain">
                    <div>
                      <label className="radio-label ">
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
                </div>
              </div>
            </div>
            <div className="products-container">
              {filteredProducts.map((product) => (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

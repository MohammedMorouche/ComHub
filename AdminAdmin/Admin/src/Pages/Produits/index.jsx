import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

function Produits() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="dash1-container">
        <div className="dash1">Product List</div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Prix en promotion</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                {product.promotion ? (
                  <td style={{ color: "red" }}>{product.newprice}</td>
                ) : (
                  <td>/</td>
                )}
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <img src={product.photo} alt={product.name} width="50" />
                </td>
                <td>
                  <span
                    onClick={() => handleDelete(product.id)}
                    style={{ cursor: "pointer", marginRight: "8px" }}
                  >
                    <FaTrash />
                  </span>
                  <Link to={`/modifier/${product.id}`}>
                    <span style={{ marginRight: "8px" }}>
                      <FaEdit />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          {" "}
          Précédent{" "}
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          {" "}
          Suivant{" "}
        </button>
      </div>
    </div>
  );
}

export default Produits;

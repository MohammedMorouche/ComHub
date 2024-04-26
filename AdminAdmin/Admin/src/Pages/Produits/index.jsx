import { Typography } from "antd";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Produits(){

   
    const [products, setProducts] = useState([
    { id: 1, name: 'Pc Lenovo', price: 50000, description: '256 G , Sdd, Fast charger', category: 'PC', photo: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Apple AirPods', price: 6000, description: 'Bon AirPods', category: 'Accessoires', photo: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Flash disque ', price: 2000, description: 'flash disque de 16 G', category: 'Accessoires', photo: 'https://via.placeholder.com/150' },
    { id: 4, name: 'chargeur ', price: 2500, description: '65 w', category: 'Accessoires', photo: 'https://via.placeholder.com/150' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3); // je peux les changer
  const [searchTerm, setSearchTerm] = useState('');

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const filteredProducts = currentProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="dash1-container">
        <div className="dash1">Product Liste</div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar" // css
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td><img src={product.photo} alt={product.name} width="50" /></td>
                <td>
                  <span onClick={() => handleDelete(product.id)} style={{ cursor: 'pointer', marginRight: '8px' }}><FaTrash /></span>
                  <Link to={`/UpdateProduct/${product.id}`}><span style={{ marginRight: '8px' }}><FaEdit /></span></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Précédent
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Suivant
        </button>
      </div>
    </div>
  );

}
export default Produits
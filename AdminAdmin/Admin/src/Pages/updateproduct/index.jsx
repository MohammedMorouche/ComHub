import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    photo: '',
  });
  const { id } = useParams();
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Ici, vous pouvez récupérer les données du produit correspondant à l'ID depuis votre source de données.
    // Pour cet exemple, je vais juste initialiser le produit avec des valeurs factices.
    setProduct({
      id: id,
      name: 'Produit 1',
      description: 'Description produit 1',
      price: '100',
      category: 'pc', // "pc" au lieu de "PC" pour correspondre à la valeur de l'état
      photo: 'https://via.placeholder.com/150',
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, photo: file });
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produit mis à jour:', product);
  };

  return (
    <div>
      <h2>Mettre à jour le produit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={product.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="pc">PC</option>
            <option value="accessoires">Accessoires</option>
            <option value="peripheriques">Périphériques</option>
            <option value="composants">Composants</option>
          </select>
        </div>
        <div>
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <button type="button" onClick={handlePhotoClick}>
            Importer une photo
          </button>
          {product.photo && (
            <p>
              Fichier sélectionné :{' '}
              {typeof product.photo === 'string'
                ? product.photo
                : product.photo.name}
            </p>
          )}
        </div>
        <button type="submit">Mettre à jour le produit</button>
      </form>
    </div>
  );
}

export default UpdateProduct;

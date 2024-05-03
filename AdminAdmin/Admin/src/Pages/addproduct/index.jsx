import { useState, useRef } from 'react';
import { db, storage } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function AddProduct() {

  const uploadPhoto = async (file) => {
    if (!file) return null;
  
    const storageRef = ref(storage, `photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    try {
      const snapshot = await uploadTask;
      const photoUrl = await getDownloadURL(snapshot.ref);
      return photoUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      return null;
    }
  };

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    photo: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name !== 'photo') {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, photo: file });
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const photoUrl = await uploadPhoto(product.photo);
  
      const newProduct = {
        ...product,
        photo: photoUrl || '',
      };
  
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log('New product added with ID:', docRef.id);
      // Reset the form or perform any additional actions
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <div className="dash1-container">
        <div className="dash1">Add Product</div>
      </div>
      <form onSubmit={handleSubmit}>
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
          {product.photo && <p>Fichier sélectionné : {product.photo.name}</p>}
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Ajouter le produit</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

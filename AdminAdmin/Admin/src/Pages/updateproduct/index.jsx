import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function UpdateProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    photo: '',
  });
  const { id } = useParams();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch the product document from Firestore
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        // Check if the document exists
        if (docSnap.exists()) {
          // If it exists, set the product state with the document data
          const data = docSnap.data();
          setProduct({
            name: data.name || '',
            description: data.description || '',
            price: data.price || '',
            category: data.category || '',
            photo: data.photo || '',
          });
        } else {
          console.log('No such product document!');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchProductData();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      const snapshot = await uploadTask;
      const photoUrl = await getDownloadURL(snapshot.ref);
      setProduct({ ...product, photo: photoUrl });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, product);
      console.log('Product updated successfully:', product);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <div className="dash1-container">
        <div className="dash1">Product Liste</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
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
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="pc">PC</option>
            <option value="accessories">Accessories</option>
            <option value="peripherals">Peripherals</option>
            <option value="components">Components</option>
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
            Upload Photo
          </button>
          {product.photo && (
            <p>Selected File: {typeof product.photo === 'string' ? product.photo : product.photo.name}</p>
          )}
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;

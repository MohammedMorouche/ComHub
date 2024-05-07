import image1 from "../../images/produits/img1.jpg";
import image2 from "../../images/produits/img2.jpg";
import image3 from "../../images/produits/img3.jpg";
import image4 from "../../images/produits/img4.jpg";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, fs } from "../../firebase";
import { useState, useEffect, useContext } from "react";
const ProductData = async () => {
    try {
      const productsCollectionRef = collection(fs, "products");
      const querySnapshot = await getDocs(productsCollectionRef);
      const productsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(productsData);
      return productsData;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  export default ProductData;

// const ProductData = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async() => {
//       try {
//         const productsCollectionRef = collection(fs, "products");
//         const querySnapshot = await getDocs(productsCollectionRef);
//         const productsData = querySnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         setData(productsData);
//       } catch (err) {
//         setError(err.message);
//         console.log("we are heere");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);
//   return { data, isLoading, error };
// };

// export default ProductData;
// const productData = [
//     {
//         id: 1,
//         photo: image1,
//         name: "Laptop 1",
//         price: 999.99,
//         category: "laptops",
//     },
//     {
//         id: 2,
//         photo: image2,
//         name: "Component 1",
//         price: 149.99,
//         category: "composants",
//     },
//     {
//         id: 3,
//         photo: image3,
//         name: "Peripheral 1",
//         price: 79.99,
//         category: "peripheriques",
//     },
//     {
//         id: 4,
//         photo: image4,
//         name: "Accessory 1",
//         price: 29.99,
//         category: "accessoires",
//     },
//     {
//         id: 5,
//         photo: image1,
//         name: "Laptop 2",
//         price: 1299.99,
//         category: "laptops",
//     },
//     {
//         id: 6,
//         photo: image2,
//         name: "Component 2",
//         price: 199.99,
//         category: "composants",
//     },
//     {
//         id: 7,
//         photo: image3,
//         name: "Peripheral 2",
//         price: 99.99,
//         category: "peripheriques",
//     },
//     {
//         id: 8,
//         photo: image4,
//         name: "Accessory 2",
//         price: 39.99,
//         category: "accessoires",
//     },
//     {
//         id: 9,
//         photo: image1,
//         name: "Laptop 3",
//         price: 1499.99,
//         category: "laptops",
//     },
//     {
//         id: 10,
//         photo: image2,
//         name: "Component 3",
//         price: 249.99,
//         category: "composants",
//     },
// ];

// export default productData;

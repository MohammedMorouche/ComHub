
// import {
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { auth, fs } from "../../firebase";
// const ProductData = async () => {
//     try {
//       const productsCollectionRef = collection(fs, "products");
//       const querySnapshot = await getDocs(productsCollectionRef);
//       const productsData = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       console.log(productsData);
//       return productsData;
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   };
  
//   export default ProductData;
import { collection, getDocs } from "firebase/firestore";
import { fs } from "../../firebase";

const ProductData = async () => {
  try {
    const productsCollectionRef = collection(fs, "products");
    const querySnapshot = await getDocs(productsCollectionRef);
    const productsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return productsData;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export default ProductData;


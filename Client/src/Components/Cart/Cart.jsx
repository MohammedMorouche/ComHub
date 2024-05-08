import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaTrashAlt, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { CartContext } from "./CartUtils.jsx";
import ProductData from "../Data/ProductData.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from 'firebase/auth';


import { auth } from "../../firebase.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { fs } from "../../firebase.jsx";
import { getDocs } from "firebase/firestore";
// import firebase from 'firebase/app';

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #44518d;
  transition: color 0.3s ease;

  &:hover {
    color: #566296;
  }
`;

const QuantityValue = styled.span`
  margin: 0 10px;
  color: white;
`;

const TotalPrice = styled.p`
  font-weight: bold;
  margin-top: 20px;
  color: white;
  background-color: #06122f;
  border-radius: 9px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Emptycart = styled.div`
  font-weight: bold;
  color: black;
  font-size: 25px;
  margin-bottom: 100px;
  margin-top: 100px;
  margin-left: 660px;
`;

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [user] = useAuthState(auth);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const user = auth.currentUser;
  const navigate = useNavigate();
  const [usere, setUsere] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
    setUsere(currentUser);
  });


  return () => {
    unsubscribe();
  };
}, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductData();
        setProductData(data);
        setIsLoading(false); // Set loading state to false when data is fetched
      } catch (err) {
        console.log("error");
        setIsLoading(false); // Set loading state to false in case of an error
      }
    };
    fetchData();

    if (!user) {
      navigate("/Connexion");
    }
  }, []);
  const getUserProfile = async (uid) => {
    try {
      const usersCollectionRef = collection(fs, "users");
      const querySnapshot = await getDocs(usersCollectionRef, {
        where: ["uid", "==", uid],
      });
      // const userDoc = querySnapshot.docs[0];
      let userDoc;
      querySnapshot.forEach((doc) => {
          if (doc.data().id === uid) {
              userDoc = doc;
          }
      });
      const userData = userDoc.data();
      return {
        FullName: userData.FullName || null,
        Telephone: userData.Telephone || null,
        Adresse : userData.Adresse
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return { FullName: null, telephone: null };
    }
  };
// const usere = auth.currentUser;

  const handleCheckout = async () => {
    try {
      
      // Check if user is authenticated
      // const user = firebase.auth().currentUser;
      // if (!user) {
      //   navigate('/Connexion');
      //   return;
      // }
      
      const userProfile = await getUserProfile(usere.uid);

      // Prepare order data
      const order = {
        date: new Date(),
        price: totalPrice.toFixed(2),
        products: cartItems.map((item) => ({
          id: item.id,
          name: productData.find((product) => product.id === item.id)?.name,
          quantity: item.quantity,
          total_price: item.price,
        })),
        name_user: userProfile.FullName || user.email, // Use the user's full name or email
        Telephone: userProfile.Telephone || null,
        Adresse : userProfile.Adresse,
        delivery: false, // Set delivery status to false by default
      };

  
      const docRef = await addDoc(collection(fs, "Commandes"), order);
      console.log("Order saved with ID:", docRef.id);

    

      navigate("/Checkout");


      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error processing checkout:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <CartContainer>
      {cartItems.length === 0 ? (
        <Emptycart>
          Your
          <FaShoppingCart color="red" /> is empty!
        </Emptycart>
      ) : isLoading ? ( // Render a loading state while fetching data
        <div>Loading...</div>
      ) : (
        <div>
          {cartItems.map((item) => {
            const product = productData.find((p) => p.id === item.id);
            return product ? ( // Check if product exists before rendering
              <CartItem key={item.id}>
                <CartItemImage src={product.photo} alt={product.name} />
                <CartItemInfo>
                  <h3>{product.name}</h3>
                  <p>{product.price} DA</p>
                  <CartItemQuantity>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </QuantityButton>
                    <QuantityValue>{item.quantity}</QuantityValue>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </QuantityButton>
                  </CartItemQuantity>
                </CartItemInfo>
                <CartItemActions>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <FaTrashAlt />
                  </RemoveButton>
                </CartItemActions>
              </CartItem>
            ) : null; // If product doesn't exist, render nothing
          })}
          <TotalPrice>Total Price: {totalPrice.toFixed(2)} DA</TotalPrice>
          <CheckoutButton onClick={handleCheckout}>
            <FaShoppingCart size={20} /> Valider la commande
          </CheckoutButton>
        </div>
      )}
    </CartContainer>
  );
}

const CartContainer = styled.div`
  margin-top: 40px;
`;

const CartItem = styled.div`
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #06122f;
  margin-bottom: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  margin-left: 10px;
  margin-right: 10px;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemActions = styled.div`
  display: flex;
  align-items: center;
`;
const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fd021a;
  transition: color 0.3s ease;
  &:hover {
    color: #a71d2a;
  }
`;
const CheckoutButton = styled(Link)`
  display: inline-block;
  background-color: #06122f;
  color: #fff;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  border-radius: 9px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  padding: 10px 20px;
  margin-bottom: 100px;
  &:hover:after {
    top: -45%;
    background-color: white;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;
export default Cart;

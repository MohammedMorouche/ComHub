import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
// import { CartContext } from "./CartUtils.jsx";
import { CartContext } from "./Cart/CartUtils";
// eslint-disable-next-line no-unused-vars
import React from "react";
const Text = styled.div`
  display: flex;
  color: black;
  font-size: 30px;
  justify-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    // Simulate a delivery delay of 3 seconds
    const timer = setTimeout(() => {
      clearCart(); // Clear the cart
      navigate("/"); // Redirect to the home page
    }, 3000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  return (
    <>
    <div style={{ height: '100vh' }}>
      <h1>Commande validée avec succès !</h1>
       <div className="success-animation">
          {/* Add your animation or validation message here */}
          {/* For example, you can use a simple CSS animation */}
          <div className="success-icon">&#10003;</div>
        </div>
    </div>
      {/* <Text>Your goods are in delivery...</Text> */}
      {/* <Text>You will be redirected to the home page shortly.</Text> */}
    </>
  );
};

export default Checkout;

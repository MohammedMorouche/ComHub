import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {FaTrashAlt, FaShoppingCart, FaMinus, FaPlus} from 'react-icons/fa';
import { CartContext } from './CartUtils.jsx';


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
  color : white;  
`;

const TotalPrice = styled.p`
  font-weight: bold;
  margin-top: 20px;
  color : white; 
  background-color: #06122f;
  border-radius: 9px;
  margin-left: 10px;
  margin-right: 10px;  
`;

function Cart() {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    return (
        <CartContainer>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <CartItem key={item.id}>
                            <CartItemImage src={item.image} alt={item.name} />
                            <CartItemInfo>
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <CartItemQuantity>
                                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                        <FaMinus />
                                    </QuantityButton>
                                    <QuantityValue>{item.quantity}</QuantityValue>
                                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
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
                    ))}
                    <TotalPrice>Total Price: ${totalPrice.toFixed(2)}</TotalPrice>
                    <CheckoutButton to="/checkout">
                        <FaShoppingCart size={20} /> Checkout
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
    transition: background-color 0.3s ease;
    border-radius: 9px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
    padding: 10px 20px;
    margin-bottom: 100px;
    hover:after {
        top: -45%;
        background-color: white;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
`;
export default Cart;
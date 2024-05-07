// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ product, removeFromCart, updateQuantity }) => {
    const { id, imgSrc, titreProduit, prixProduit, quantity } = product;

    const handleRemoveFromCart = () => {
        removeFromCart(id);
    };  

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        updateQuantity(id, newQuantity);
    };

    return (
        <li>
            <img src={imgSrc} alt={titreProduit} />
            <div>
                <h3>{titreProduit}</h3>
                <p>Price: {prixProduit} DA</p>
                <p>
                    Quantity:
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </p>
                <button onClick={handleRemoveFromCart}>Remove</button>
            </div>
        </li>
    );
};  

CartItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgSrc: PropTypes.string.isRequired,
        titreProduit: PropTypes.string.isRequired,
        prixProduit: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired,
};

export default CartItem;
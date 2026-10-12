import React from 'react';
import { CartItem } from '../../core/models/cart-item.model';
import { useCart } from '../../core/context/CartContext';

interface CartItemProps {
  item: CartItem;
}

export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { decrease, increase, remove } = useCart();

  return (
    <article className="cart-item">
      <div className="mini" style={{ background: item.product.accent }}>
        <img src={item.product.image} alt={item.product.name} />
      </div>
      <div className="details">
        <h3>{item.product.name}</h3>
        <span>{item.product.category}</span>
        <strong>₹{item.product.price.toLocaleString('en-IN')}</strong>
      </div>
      <div className="controls">
        <button onClick={() => decrease(item.product.id)}>−</button>
        <b>{item.quantity}</b>
        <button onClick={() => increase(item.product.id)}>+</button>
      </div>
      <button className="remove" onClick={() => remove(item.product.id)}>
        Remove
      </button>
    </article>
  );
};

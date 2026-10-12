import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../core/models/product.model';
import { useCart } from '../../core/context/CartContext';
import { useWishlist } from '../../core/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onAdded?: (message: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdded }) => {
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const handleAddToCart = () => {
    add(product);
    onAdded?.(`${product.name} added to your bag`);
  };

  const isWishlisted = has(product.id);

  return (
    <article className="card">
      <Link
        to={`/products/${product.id}`}
        className="visual"
        style={{ background: product.accent }}
      >
        <span className="badge">{product.category}</span>
        <img src={product.image} alt={product.name} className="product-img" />
        <button
          className="heart"
          onClick={(e) => {
            e.preventDefault();
            toggle(product);
          }}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </Link>

      <div className="info">
        <div>
          <h3>{product.name}</h3>
          <p>★ {product.rating}</p>
        </div>
        <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
      </div>

      <button className="add" onClick={handleAddToCart}>
        Add to bag <span>↗</span>
      </button>
    </article>
  );
};

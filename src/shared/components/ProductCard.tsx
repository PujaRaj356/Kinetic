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
  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddToCart = () => {
    add(product);
    onAdded?.(`${product.name} added to your bag`);
  };

  const isWishlisted = has(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const displayImage = isHovered && images.length > 1 ? images[1] : images[0];

  return (
    <article
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/products/${product.id}`}
        className="visual"
        style={{ background: product.accent }}
      >
        <span className="badge">{product.category}</span>
        {images.length > 1 && (
          <span className="angles-badge">{images.length} Angles</span>
        )}
        <img src={displayImage} alt={product.name} className="product-img" />
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

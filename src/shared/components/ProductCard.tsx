import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../core/models/product.model';
import { useCart } from '../../core/context/CartContext';
import { useWishlist } from '../../core/context/WishlistContext';
import { PriceAlertModal } from './PriceAlertModal';

interface ProductCardProps {
  product: Product;
  onAdded?: (message: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdded }) => {
  const { items, add, increase, decrease } = useCart();
  const { has, toggle, getAlert } = useWishlist();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const qtyInBag = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    add(product);
    onAdded?.(`${product.name} added to your bag`);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    if (qtyInBag < product.stock) {
      increase(product.id);
      onAdded?.(`Added another ${product.name} (Total: ${qtyInBag + 1})`);
    } else {
      onAdded?.(`Maximum stock reached for ${product.name}`);
    }
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    decrease(product.id);
    if (qtyInBag === 1) {
      onAdded?.(`Removed ${product.name} from bag`);
    } else {
      onAdded?.(`Reduced ${product.name} (Total: ${qtyInBag - 1})`);
    }
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
        {getAlert(product.id) && (
          <span className="card-alert-badge" title={`Price alert set at ₹${getAlert(product.id)!.targetPrice}`}>
            🔔 ₹{getAlert(product.id)!.targetPrice.toLocaleString('en-IN')}
          </span>
        )}
        <img src={displayImage} alt={product.name} className="product-img" />
        <div className="card-top-actions" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <button
            type="button"
            className={`card-bell-btn ${getAlert(product.id) ? 'has-alert' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAlertModalOpen(true);
            }}
            title={getAlert(product.id) ? `Alert active at ₹${getAlert(product.id)!.targetPrice} (Click to edit)` : 'Set Price Alert'}
            aria-label="Set price alert"
          >
            🔔
          </button>
          <button
            type="button"
            className="heart"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(product);
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        </div>
      </Link>

      <PriceAlertModal
        product={product}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />

      <div className="info">
        <div>
          <h3>{product.name}</h3>
          <p>★ {product.rating}</p>
        </div>
        <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
      </div>

      {qtyInBag === 0 ? (
        <button className="add" onClick={handleAddToCart}>
          Add to bag <span>↗</span>
        </button>
      ) : (
        <div className="card-qty-control">
          <button
            type="button"
            className="card-qty-btn dec"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            title="Decrease quantity"
          >
            −
          </button>
          <div className="card-qty-label">
            <span className="qty-count">{qtyInBag}</span>
            <span className="qty-text">IN BAG</span>
          </div>
          <button
            type="button"
            className="card-qty-btn inc"
            onClick={handleIncrease}
            disabled={qtyInBag >= product.stock}
            aria-label="Increase quantity"
            title={qtyInBag >= product.stock ? 'Maximum stock reached' : 'Increase quantity'}
          >
            +
          </button>
        </div>
      )}
    </article>
  );
};

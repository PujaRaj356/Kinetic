import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addProductReview } from '../core/services/productService';
import { useCart } from '../core/context/CartContext';
import { useWishlist } from '../core/context/WishlistContext';
import { useCompare } from '../core/context/CompareContext';
import { useToast } from '../core/context/ToastContext';
import { Review } from '../core/models/product.model';
import { PriceAlertModal } from '../shared/components/PriceAlertModal';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialProduct = getProductById(Number(id));
  const { items, add, increase, decrease } = useCart();
  const { has, toggle, getAlert } = useWishlist();
  const { isInCompare, toggleCompare, getSimilarProducts, addToCompare } = useCompare();
  const { showToast } = useToast();

  const [product, setProduct] = useState(initialProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const cartItem = items.find((i) => i.product.id === product?.id);
  const qtyInBag = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const handleStockChange = () => {
      const fresh = getProductById(Number(id));
      if (fresh) setProduct(fresh);
    };
    window.addEventListener('kinetic-stock-updated', handleStockChange);
    return () => window.removeEventListener('kinetic-stock-updated', handleStockChange);
  }, [id]);

  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return <div className="not-found">Product not found.</div>;
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const similarItems = getSimilarProducts(product, 3);

  const handleAdd = () => {
    add(product);
    showToast('Added to your bag');
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: 'rev_' + Date.now(),
      user: reviewerName.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      comment: reviewComment.trim()
    };

    const saved = await addProductReview(product.id, newReview);
    if (saved) {
      setProduct(saved);
    }
    setReviewerName('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSubmitted(true);
    showToast('Thank you! Your review has been permanently saved.');
  };

  const isWishlisted = has(product.id);

  return (
    <section className="detail">
      <Link to="/products" className="back">
        ← Back to shop
      </Link>

      <div className="detail-grid">
        <div className="product-gallery-column">
          <div className="big-visual" style={{ background: product.accent }}>
            <img
              src={productImages[activeImageIndex] || product.image}
              alt={`${product.name} angle ${activeImageIndex + 1}`}
              className="main-gallery-img"
            />
            <b>{product.category}</b>
            {productImages.length > 1 && (
              <span className="gallery-counter-badge">
                {activeImageIndex + 1} / {productImages.length}
              </span>
            )}
          </div>

          {productImages.length > 1 && (
            <div className="gallery-thumbnails-strip">
              {productImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`gallery-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  onMouseEnter={() => setActiveImageIndex(idx)}
                  title={`View image ${idx + 1}`}
                >
                  <img src={imgUrl} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="copy">
          <p className="eyebrow">
            {product.category} / 0{product.id}
          </p>
          <h1>{product.name}</h1>
          <div className="rating">
            ★ {product.rating} / 5 ({product.reviews ? product.reviews.length : 0} customer reviews)
          </div>

          <p className="description">{product.description}</p>

          <div className="buy-row">
            <strong>₹{product.price.toLocaleString('en-IN')}</strong>
            {product.oldPrice && (
              <span className="old-price">₹{product.oldPrice.toLocaleString('en-IN')}</span>
            )}
            <span className="stock-badge">{product.stock} in stock</span>
          </div>

          <div className="actions">
            {qtyInBag === 0 ? (
              <button className="add" onClick={handleAdd}>
                Add to bag ↗
              </button>
            ) : (
              <div className="detail-qty-group">
                <div className="card-qty-control detail-qty">
                  <button
                    type="button"
                    className="card-qty-btn dec"
                    onClick={() => {
                      decrease(product.id);
                      showToast(qtyInBag === 1 ? 'Removed from your bag' : 'Reduced quantity');
                    }}
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
                    onClick={() => {
                      if (qtyInBag < product.stock) {
                        increase(product.id);
                        showToast(`Added another (Total: ${qtyInBag + 1})`);
                      } else {
                        showToast('Maximum available stock reached');
                      }
                    }}
                    disabled={qtyInBag >= product.stock}
                    title={qtyInBag >= product.stock ? 'Maximum stock reached' : 'Increase quantity'}
                  >
                    +
                  </button>
                </div>
                <Link to="/cart" className="view-bag-link-btn">
                  View in Bag →
                </Link>
              </div>
            )}
            <button className="save" onClick={() => toggle(product)}>
              {isWishlisted ? '♥ Saved' : '♡ Save'}
            </button>
            <button
              type="button"
              className={`product-compare-action-btn ${isInCompare(product.id) ? 'active' : ''}`}
              onClick={() => toggleCompare(product)}
              title={isInCompare(product.id) ? 'Remove from comparison' : 'Add to product comparison'}
            >
              {isInCompare(product.id) ? '✓ Comparing' : '⇄ Compare'}
            </button>
            <button
              type="button"
              className={`product-price-alert-btn ${getAlert(product.id) ? 'active' : ''}`}
              onClick={() => setIsAlertModalOpen(true)}
              title="Set target price alert"
            >
              {getAlert(product.id)
                ? `🔔 Alert: ₹${getAlert(product.id)!.targetPrice.toLocaleString('en-IN')}`
                : '🔔 Price Alert'}
            </button>
          </div>
        </div>
      </div>

      <PriceAlertModal
        product={product}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />

      {/* Highlights & Specs Section */}
      <div className="extra-info-grid">
        <div className="highlights-box">
          <h2>Key Highlights</h2>
          <ul>
            {product.highlights?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="specs-box">
          <h2>Specifications</h2>
          <table className="specs-table">
            <tbody>
              {product.specs &&
                Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{val}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart Similar Products Comparison Section */}
      {similarItems.length > 0 && (
        <div className="similar-compare-section">
          <div className="similar-compare-header">
            <div>
              <p className="eyebrow">SMART COMPARISON</p>
              <h2>Compare With Similar {product.category} Items</h2>
            </div>
            <Link
              to="/compare"
              className="view-full-compare-link"
              onClick={() => {
                addToCompare(product);
                similarItems.forEach((item) => addToCompare(item));
              }}
            >
              Open Full Matrix ↗
            </Link>
          </div>

          <div className="similar-compare-grid">
            {/* Current Item Card */}
            <div className="similar-compare-card is-current">
              <span className="current-badge">Currently Viewing</span>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <div className="similar-price">₹{product.price.toLocaleString('en-IN')}</div>
              <div className="similar-rating">★ {product.rating}</div>
              <div className="similar-stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</div>
              <button
                type="button"
                className={`similar-compare-btn ${isInCompare(product.id) ? 'active' : ''}`}
                onClick={() => toggleCompare(product)}
              >
                {isInCompare(product.id) ? '✓ In Compare' : '+ Add to Compare'}
              </button>
            </div>

            {/* Similar Items */}
            {similarItems.map((item) => {
              const diff = item.price - product.price;
              const diffPercent = Math.round((Math.abs(diff) / product.price) * 100);
              return (
                <div className="similar-compare-card" key={item.id}>
                  {diff < 0 ? (
                    <span className="price-tag-badge cheaper">₹{Math.abs(diff).toLocaleString('en-IN')} cheaper (-{diffPercent}%)</span>
                  ) : diff > 0 ? (
                    <span className="price-tag-badge higher">+₹{diff.toLocaleString('en-IN')} (+{diffPercent}%)</span>
                  ) : (
                    <span className="price-tag-badge same">Same Price</span>
                  )}
                  <Link to={`/products/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <h4>
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </h4>
                  <div className="similar-price">₹{item.price.toLocaleString('en-IN')}</div>
                  <div className="similar-rating">★ {item.rating}</div>
                  <div className="similar-stock">{item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}</div>
                  <button
                    type="button"
                    className={`similar-compare-btn ${isInCompare(item.id) ? 'active' : ''}`}
                    onClick={() => toggleCompare(item)}
                  >
                    {isInCompare(item.id) ? '✓ In Compare' : '+ Add to Compare'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <div>
            <p className="eyebrow">FEEDBACK</p>
            <h2>Customer Reviews</h2>
          </div>
          <div className="rating-score">
            <span>★ {product.rating}</span>
            <small>Based on {product.reviews?.length || 0} reviews</small>
          </div>
        </div>

        {/* Add Review Form */}
        <div className="add-review-box">
          <h3>Leave a Review</h3>
          <form onSubmit={handleAddReview}>
            <div className="two">
              <label>
                Your Name
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  required
                />
              </label>

              <label>
                Rating
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star ★☆☆☆☆</option>
                </select>
              </label>
            </div>

            <label>
              Your Feedback
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share what you liked or experienced with this product..."
                rows={3}
                required
              />
            </label>

            <button type="submit" className="submit-review-btn">
              Post Review →
            </button>
          </form>
        </div>

        {/* Review Cards List */}
        <div className="reviews-list">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div className="review-card" key={rev.id}>
                <div className="review-card-head">
                  <div className="user-badge">
                    <span className="avatar-initial">{rev.user.charAt(0)}</span>
                    <div>
                      <strong>{rev.user}</strong>
                      <span className="review-date">{rev.date}</span>
                    </div>
                  </div>
                  <div className="review-stars">
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))
          ) : (
            <div className="no-reviews">No reviews yet. Be the first to review this product!</div>
          )}
        </div>
      </div>
    </section>
  );
};

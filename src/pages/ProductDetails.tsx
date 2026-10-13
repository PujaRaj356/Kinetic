import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addProductReview } from '../core/services/productService';
import { useCart } from '../core/context/CartContext';
import { useWishlist } from '../core/context/WishlistContext';
import { useToast } from '../core/context/ToastContext';
import { Review } from '../core/models/product.model';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialProduct = getProductById(Number(id));
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(initialProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
            <button className="add" onClick={handleAdd}>
              Add to bag ↗
            </button>
            <button className="save" onClick={() => toggle(product)}>
              {isWishlisted ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      </div>

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

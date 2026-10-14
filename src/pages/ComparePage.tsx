import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../core/context/CompareContext';
import { useCart } from '../core/context/CartContext';
import { useWishlist } from '../core/context/WishlistContext';
import { useToast } from '../core/context/ToastContext';
import { getAllProducts } from '../core/services/productService';
import { Product } from '../core/models/product.model';
import { PriceAlertModal } from '../shared/components/PriceAlertModal';

export const ComparePage: React.FC = () => {
  const {
    compareItems,
    removeFromCompare,
    clearCompare,
    addToCompare,
    getSimilarProducts
  } = useCompare();

  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { showToast } = useToast();

  const [selectedAlertProduct, setSelectedAlertProduct] = useState<Product | null>(null);
  const allProducts = getAllProducts();

  // Find lowest price and highest rating among compared items
  const lowestPrice = compareItems.length > 0 ? Math.min(...compareItems.map((p) => p.price)) : 0;
  const highestRating = compareItems.length > 0 ? Math.max(...compareItems.map((p) => p.rating || 0)) : 0;

  // Gather all unique specification keys across all compared items
  const allSpecKeys = Array.from(
    new Set(
      compareItems.flatMap((p) => (p.specs ? Object.keys(p.specs) : []))
    )
  );

  // Collect similar products to recommend based on the first or all compared items
  const similarProducts = compareItems.length > 0
    ? getSimilarProducts(compareItems[0], 4)
    : allProducts.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    add(product);
    showToast(`Added "${product.name}" to Bag!`);
  };

  const handleAddSimilar = (product: Product) => {
    const success = addToCompare(product);
    if (success) {
      showToast(`Added "${product.name}" to comparison table!`);
    } else {
      showToast('Maximum 4 items can be compared at once. Remove one first.');
    }
  };

  return (
    <section className="compare-page">
      {/* Breadcrumbs */}
      <div className="cart-nav-breadcrumbs">
        <Link to="/home" className="cart-back-link">
          🏠 Home
        </Link>
        <span className="crumb-sep">/</span>
        <Link to="/products" className="cart-back-link">
          ⚡ Shop All
        </Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">Product Comparison</span>
      </div>

      <div className="compare-header-row">
        <div>
          <p className="eyebrow">SMART SPECIFICATION MATRIX</p>
          <h1>
            Side-by-side<br />
            <span>Comparison.</span>
          </h1>
          <p className="compare-sub">
            Contrast prices, technical specifications, real user ratings, and inventory status in a unified view.
          </p>
        </div>

        {compareItems.length > 0 && (
          <div className="compare-top-actions">
            <span className="compare-items-indicator">
              Comparing <b>{compareItems.length}</b> of 4 max items
            </span>
            <button type="button" className="compare-clear-top-btn" onClick={clearCompare}>
              Clear Table
            </button>
          </div>
        )}
      </div>

      {compareItems.length >= 2 ? (
        <div className="compare-matrix-wrapper">
          <div className="compare-table-container">
            <table className="compare-matrix-table">
              {/* Product Header Row */}
              <thead>
                <tr>
                  <th className="feature-label-col">Product Info</th>
                  {compareItems.map((product) => {
                    const isLowest = product.price === lowestPrice && compareItems.length > 1;
                    const isHighestRated = (product.rating || 0) === highestRating && compareItems.length > 1;
                    const isWishlisted = has(product.id);

                    return (
                      <th key={product.id} className="product-compare-head">
                        <div className="compare-card-head">
                          <button
                            type="button"
                            className="compare-remove-cross"
                            onClick={() => removeFromCompare(product.id)}
                            title={`Remove ${product.name}`}
                          >
                            ✕
                          </button>

                          <div
                            className="compare-visual-box"
                            style={{ background: product.accent || '#eee' }}
                          >
                            <span className="compare-cat-pill">{product.category}</span>
                            <Link to={`/products/${product.id}`}>
                              <img src={product.image} alt={product.name} />
                            </Link>
                          </div>

                          <div className="compare-title-block">
                            <Link to={`/products/${product.id}`} className="compare-prod-link">
                              <h3>{product.name}</h3>
                            </Link>
                          </div>

                          <div className="compare-price-block">
                            <div className="compare-price-val">
                              ₹{product.price.toLocaleString('en-IN')}
                            </div>
                            {product.oldPrice && (
                              <div className="compare-old-price">
                                ₹{product.oldPrice.toLocaleString('en-IN')}
                              </div>
                            )}
                            {isLowest && (
                              <span className="compare-badge best-price">
                                🏷️ Best Value
                              </span>
                            )}
                          </div>

                          <div className="compare-rating-block">
                            <span className="compare-stars">★ {product.rating || 5.0}</span>
                            <span className="compare-rev-count">
                              ({product.reviews?.length || 1} reviews)
                            </span>
                            {isHighestRated && (
                              <span className="compare-badge top-rated">
                                🏆 Highest Rated
                              </span>
                            )}
                          </div>

                          <div className="compare-availability-block">
                            {product.stock > 0 ? (
                              <span className="stock-in">
                                In Stock ({product.stock} units)
                              </span>
                            ) : (
                              <span className="stock-out">Out of Stock</span>
                            )}
                          </div>

                          <div className="compare-cta-block">
                            <button
                              type="button"
                              className="compare-add-bag"
                              onClick={() => handleAddToCart(product)}
                            >
                              🛍️ Add to Bag
                            </button>
                            <div className="compare-secondary-btns">
                              <button
                                type="button"
                                className="compare-sec-btn alert"
                                onClick={() => setSelectedAlertProduct(product)}
                                title="Set target price alert"
                              >
                                🔔 Alert
                              </button>
                              <button
                                type="button"
                                className="compare-sec-btn wish"
                                onClick={() => toggle(product)}
                                title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
                              >
                                {isWishlisted ? '♥ Saved' : '♡ Save'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {/* Highlights Row */}
                <tr className="section-divider-row">
                  <td colSpan={compareItems.length + 1}>
                    <strong>Key Features & Highlights</strong>
                  </td>
                </tr>
                <tr>
                  <td className="feature-label-col">Overview</td>
                  {compareItems.map((product) => (
                    <td key={`desc-${product.id}`} className="compare-data-cell">
                      <p className="compare-desc-snippet">{product.description}</p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="feature-label-col">Core Highlights</td>
                  {compareItems.map((product) => (
                    <td key={`high-${product.id}`} className="compare-data-cell">
                      <ul className="compare-highlights-list">
                        {(product.highlights || []).map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Technical Specifications Rows */}
                {allSpecKeys.length > 0 && (
                  <>
                    <tr className="section-divider-row">
                      <td colSpan={compareItems.length + 1}>
                        <strong>Technical Specifications</strong>
                      </td>
                    </tr>
                    {allSpecKeys.map((specKey) => {
                      // Check if all products have different values for this spec
                      const values = compareItems.map((p) => p.specs?.[specKey] || '—');
                      const hasDifferences = new Set(values).size > 1;

                      return (
                        <tr
                          key={specKey}
                          className={hasDifferences ? 'spec-row differing' : 'spec-row'}
                        >
                          <td className="feature-label-col">
                            {specKey}
                            {hasDifferences && (
                              <span className="diff-pill" title="Values differ across compared products">
                                Diff
                              </span>
                            )}
                          </td>
                          {compareItems.map((product) => {
                            const val = product.specs?.[specKey];
                            return (
                              <td key={`${product.id}-${specKey}`} className="compare-data-cell">
                                <span className={val ? 'spec-val' : 'spec-na'}>
                                  {val || '—'}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : compareItems.length === 1 ? (
        <div className="compare-single-prompt">
          <div className="compare-single-card">
            <span className="single-icon">⇄</span>
            <h2>Select one more product to compare</h2>
            <p>
              You currently have <b>{compareItems[0].name}</b> selected. Add another item from the similar products below or browse the store.
            </p>
          </div>
        </div>
      ) : (
        <div className="empty compare-empty">
          <div className="empty-compare-icon">⇄</div>
          <h2>No products in comparison queue</h2>
          <p>
            Browse the store and click the <b>⇄</b> button on any product card, or choose from our featured recommendations below.
          </p>
          <div className="empty-actions-row">
            <Link to="/products" className="empty-action-primary">
              Browse All Products →
            </Link>
          </div>
        </div>
      )}

      {/* Smart Similar Recommendations Shelf */}
      {similarProducts.length > 0 && compareItems.length < 4 && (
        <div className="compare-similar-section">
          <div className="similar-section-header">
            <div>
              <p className="eyebrow">SMART RECOMMENDATIONS</p>
              <h2>Add Similar Items to this Comparison</h2>
            </div>
            <span className="similar-hint">
              Showing top alternatives in matching categories
            </span>
          </div>

          <div className="compare-similar-grid">
            {similarProducts.map((p) => {
              const alreadyIn = compareItems.some((item) => item.id === p.id);

              return (
                <article key={p.id} className="similar-card">
                  <div className="similar-visual" style={{ background: p.accent || '#eee' }}>
                    <span className="similar-cat">{p.category}</span>
                    <Link to={`/products/${p.id}`}>
                      <img src={p.image} alt={p.name} />
                    </Link>
                  </div>
                  <div className="similar-body">
                    <Link to={`/products/${p.id}`}>
                      <h4>{p.name}</h4>
                    </Link>
                    <div className="similar-meta">
                      <span className="similar-price">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="similar-rating">★ {p.rating}</span>
                    </div>
                    <button
                      type="button"
                      disabled={alreadyIn || compareItems.length >= 4}
                      className={`btn-add-compare-shelf ${alreadyIn ? 'added' : ''}`}
                      onClick={() => handleAddSimilar(p)}
                    >
                      {alreadyIn ? '✓ In Comparison' : '+ Compare This Product'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Alert Modal */}
      {selectedAlertProduct && (
        <PriceAlertModal
          product={selectedAlertProduct}
          isOpen={!!selectedAlertProduct}
          onClose={() => setSelectedAlertProduct(null)}
        />
      )}
    </section>
  );
};

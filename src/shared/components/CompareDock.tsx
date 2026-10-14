import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCompare } from '../../core/context/CompareContext';

export const CompareDock: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const location = useLocation();

  // Hide the dock on the actual compare page itself to avoid duplication
  const isComparePage = location.pathname.toLowerCase().includes('/compare');
  if (compareItems.length === 0 || isComparePage) {
    return null;
  }

  const MAX_SLOTS = 4;
  const emptySlotsCount = Math.max(0, MAX_SLOTS - compareItems.length);

  return (
    <aside className="compare-dock" aria-label="Product comparison dock">
      <div className="compare-dock-inner">
        <div className="compare-dock-head">
          <div className="compare-dock-badge">
            <span className="compare-icon">⇄</span>
            <span>COMPARE TRAY</span>
            <span className="compare-count-pill">{compareItems.length}/4</span>
          </div>
          <button
            type="button"
            className="compare-clear-btn"
            onClick={clearCompare}
            title="Clear all compared items"
          >
            Clear All
          </button>
        </div>

        <div className="compare-dock-slots">
          {compareItems.map((product) => (
            <div key={product.id} className="compare-slot filled">
              <img
                src={product.image}
                alt={product.name}
                className="compare-slot-img"
                style={{ background: product.accent || '#eee' }}
              />
              <button
                type="button"
                className="compare-slot-remove"
                onClick={() => removeFromCompare(product.id)}
                title={`Remove ${product.name} from comparison`}
                aria-label={`Remove ${product.name}`}
              >
                ✕
              </button>
              <div className="compare-slot-info">
                <span className="slot-title">{product.name}</span>
                <span className="slot-price">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}

          {Array.from({ length: emptySlotsCount }).map((_, idx) => (
            <div key={`empty-${idx}`} className="compare-slot empty">
              <span className="empty-slot-plus">+</span>
              <span className="empty-slot-text">Add Item</span>
            </div>
          ))}
        </div>

        <div className="compare-dock-actions">
          <Link
            to="/compare"
            className={`compare-launch-btn ${compareItems.length < 2 ? 'disabled' : ''}`}
            title={compareItems.length < 2 ? 'Select at least 2 items to compare' : 'View comparison matrix'}
          >
            {compareItems.length < 2 ? (
              <span>Add 1 More to Compare</span>
            ) : (
              <span>Compare {compareItems.length} Products ↗</span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

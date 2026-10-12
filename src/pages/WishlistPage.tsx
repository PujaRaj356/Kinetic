import React from 'react';
import { useWishlist } from '../core/context/WishlistContext';
import { ProductCard } from '../shared/components/ProductCard';
import { useToast } from '../core/context/ToastContext';

export const WishlistPage: React.FC = () => {
  const { items } = useWishlist();
  const { showToast } = useToast();

  return (
    <section className="wish">
      <p className="eyebrow">SAVED ITEMS</p>
      <h1>
        Your<br />
        selection.
      </h1>
      {items.length > 0 ? (
        <div className="grid">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onAdded={showToast} />
          ))}
        </div>
      ) : (
        <div className="empty">Nothing saved yet. Tap ♡ on anything you love.</div>
      )}
    </section>
  );
};

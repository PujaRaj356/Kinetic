import React, { useState } from 'react';
import { getCategories, searchProducts } from '../core/services/productService';
import { ProductCard } from '../shared/components/ProductCard';
import { useToast } from '../core/context/ToastContext';

export const Products: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const { showToast } = useToast();

  const categories = getCategories();
  const filtered = searchProducts(query, category);

  return (
    <section className="products-page">
      <header className="products-head">
        <div>
          <p className="eyebrow">THE STORE</p>
          <h1>
            Everything<br />
            <span>interesting.</span>
          </h1>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
      </header>

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? 'selected' : ''}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="count">{filtered.length} pieces found</div>

      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAdded={showToast} />
          ))
        ) : (
          <div className="empty">Nothing matched. Try another search.</div>
        )}
      </div>
    </section>
  );
};

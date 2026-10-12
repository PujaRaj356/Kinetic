import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../core/services/productService';
import { ProductCard } from '../shared/components/ProductCard';
import { IdleSphere } from '../shared/components/IdleSphere';
import { useToast } from '../core/context/ToastContext';

export const Home: React.FC = () => {
  const { showToast } = useToast();
  const allProducts = getAllProducts();
  const featured = allProducts.filter((p) => p.featured);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">THE 2026 EDIT / 01</p>
          <h1>
            SHOP<br />
            <em>DIFFERENT.</em>
          </h1>
          <p className="lead">
            Objects with personality and tactile web presence. Interactive transparent glass orb with floating kinetic products.
          </p>
          <div className="hero-cta-group">
            <Link to="/products" className="hero-btn">
              Explore the drop ↗
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <IdleSphere />
        </div>
      </section>

      <section className="featured">
        <div className="section-head">
          <div>
            <p className="eyebrow">CURATED</p>
            <h2>Fresh picks</h2>
          </div>
          <Link to="/products">View all →</Link>
        </div>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onAdded={showToast} />
          ))}
        </div>
      </section>
    </>
  );
};

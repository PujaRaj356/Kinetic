import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FloatingProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  angle: number; // base angle in degrees
  accent: string;
}

const floatingProducts: FloatingProduct[] = [
  {
    id: 1,
    name: 'Air Jordan 1',
    price: '₹12,499',
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
    angle: 30,
    accent: '#ff7a5c',
  },
  {
    id: 4,
    name: 'Apple AirPods',
    price: '₹11,999',
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
    angle: 90,
    accent: '#d7ff4f',
  },
  {
    id: 6,
    name: 'MacBook Pro 14"',
    price: '₹1,69,999',
    image: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
    angle: 150,
    accent: '#b5f6d2',
  },
  {
    id: 9,
    name: 'Rolex Cellini',
    price: '₹89,999',
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp',
    angle: 210,
    accent: '#ffe5d9',
  },
  {
    id: 13,
    name: 'iPhone 13 Pro',
    price: '₹69,999',
    image: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
    angle: 270,
    accent: '#e9ecef',
  },
  {
    id: 17,
    name: 'Classic Sunglasses',
    price: '₹2,499',
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp',
    angle: 330,
    accent: '#ffcc80',
  },
];

export const IdleSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Smooth orbital drift around the globe
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setRotationOffset((prev) => (prev + delta * 9) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });

    if (isDragging && videoRef.current) {
      const deltaX = e.clientX - dragStartX;
      const duration = videoRef.current.duration || 10;
      videoRef.current.currentTime = (videoRef.current.currentTime + deltaX * 0.01 + duration) % duration;
      setDragStartX(e.clientX);
    }
  };

  const handleMouseEnter = () => {
    setIsExpanded(true); // Images disperse outward on hover
  };

  const handleMouseLeave = () => {
    setIsExpanded(false); // Images converge back to the globe
    setIsDragging(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="idle-sphere-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* 3D Tilting Stage with Globe & Surrounding Floating Images */}
      <div
        className={`idle-sphere-stage ${isExpanded ? 'expanded' : 'converged'}`}
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0.8, 0.4, 1)',
        }}
      >
        {/* Central Rotating 3D Globe */}
        <div className="globe-anchor">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/sphere-white-poster.jpg"
            className="idle-sphere-video"
            src="/videos/sphere-white.mp4"
          />
        </div>

        {/* Surrounding Floating Image Cards Around the Globe */}
        <div className="surrounding-images-layer">
          {floatingProducts.map((item) => {
            const currentAngle = (item.angle + rotationOffset) * (Math.PI / 180);

            // Base radius (close to globe) vs Expanded radius (moving out on hover)
            const baseRadius = 158;
            const expandedRadius = 228;
            const currentRadius = isExpanded ? expandedRadius : baseRadius;

            // Parametric 3D elliptical placement
            const x = Math.cos(currentAngle) * currentRadius;
            const y = Math.sin(currentAngle) * (currentRadius * 0.72);
            const depth = Math.sin(currentAngle); // -1 (back) to +1 (front)
            const scale = 0.85 + depth * 0.15;
            const zIndex = depth > 0 ? 15 : 2;

            return (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="floating-product-card"
                style={{
                  transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`,
                  zIndex,
                  boxShadow: `4px 4px 0 ${item.accent}`,
                  transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
                title={`${item.name} - ${item.price}`}
              >
                <div className="card-img-wrap">
                  <img src={item.image} alt={item.name} draggable={false} />
                </div>
                <div className="card-pill-label">
                  <b>{item.name}</b>
                  <span>{item.price}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

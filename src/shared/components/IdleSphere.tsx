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
    name: 'Orbit Headphones',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    angle: 30,
    accent: '#d7ff4f',
  },
  {
    id: 2,
    name: 'Mono Runner',
    price: '₹3,299',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    angle: 90,
    accent: '#ff7a5c',
  },
  {
    id: 3,
    name: 'Grid Backpack',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    angle: 150,
    accent: '#8bd3ff',
  },
  {
    id: 4,
    name: 'Pixel Watch X',
    price: '₹7,499',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    angle: 210,
    accent: '#c9a7ff',
  },
  {
    id: 6,
    name: 'Cloud Keyboard',
    price: '₹4,199',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    angle: 270,
    accent: '#b5f6d2',
  },
  {
    id: 9,
    name: 'Cyber Shades',
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    angle: 330,
    accent: '#ff9ebb',
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

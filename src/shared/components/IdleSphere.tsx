import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface OrbitItem {
  id: number;
  name: string;
  price: string;
  image: string;
  angle: number; // base angle in degrees
  accent: string;
}

const orbitingProducts: OrbitItem[] = [
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
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Subtle continuous orbital drift
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      // Gently advance orbital angle
      setRotationOffset((prev) => (prev + delta * 8) % 360);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });

    if (isDragging && videoRef.current) {
      const deltaX = e.clientX - dragStartX;
      const duration = videoRef.current.duration || 10;
      videoRef.current.currentTime = (videoRef.current.currentTime + (deltaX * 0.01) + duration) % duration;
      setDragStartX(e.clientX);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsExpanded(true); // Disperse outwards when hovering
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsExpanded(false); // Converge back to sphere when cursor leaves
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

  const togglePulse = () => {
    setIsExpanded((prev) => !prev);
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
    >
      {/* 3D Tilting Stage containing Sphere and Surrounding Images */}
      <div
        className={`idle-sphere-stage ${isExpanded ? 'expanded' : 'converged'}`}
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0.8, 0.4, 1)',
        }}
      >
        <div className="sphere-glow-ring" />

        {/* Central Rotating Globe / Sphere */}
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

        <div className="sphere-ambient-shadow" />

        {/* Surrounding Orbiting Image Cards */}
        <div className="orbiting-satellites-layer">
          {orbitingProducts.map((item, index) => {
            const currentAngle = (item.angle + rotationOffset) * (Math.PI / 180);
            
            // Base radius (when close to sphere) vs Expanded radius (when moving out)
            const baseRadius = 155;
            const expandedRadius = 225;
            const currentRadius = isExpanded ? expandedRadius : baseRadius;

            // Parametric ellipse positioning for perspective depth
            const x = Math.cos(currentAngle) * currentRadius;
            const y = Math.sin(currentAngle) * (currentRadius * 0.72); // slightly squashed for 3D look
            const depth = Math.sin(currentAngle); // -1 (back) to +1 (front)
            const scale = 0.85 + depth * 0.15;
            const zIndex = depth > 0 ? 15 : 2;

            return (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="orbiting-product-card"
                style={{
                  transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`,
                  zIndex,
                  boxShadow: `4px 4px 0 ${item.accent}`,
                  transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onClick={(e) => e.stopPropagation()}
                title={`${item.name} - ${item.price}`}
              >
                <div className="satellite-img-wrap">
                  <img src={item.image} alt={item.name} draggable={false} />
                </div>
                <div className="satellite-pill-label">
                  <b>{item.name}</b>
                  <span>{item.price}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Interactive Micro-Controls below Sphere */}
      <div className="idle-meta-overlay">
        <button
          type="button"
          className={`idle-pulse-btn ${isExpanded ? 'active' : ''}`}
          onClick={togglePulse}
          title="Click to pulse / expand cards"
        >
          <span className="pulse-indicator" />
          <span>{isExpanded ? '✦ SATELLITES EXPANDED' : '✦ SATELLITES ORBITING'}</span>
        </button>
      </div>
    </div>
  );
};

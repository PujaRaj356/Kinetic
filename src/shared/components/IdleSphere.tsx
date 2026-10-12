import React, { useRef, useState } from 'react';

export const IdleSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Smooth mouse tilt parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });

    if (isDragging && videoRef.current) {
      const deltaX = e.clientX - dragStartX;
      const duration = videoRef.current.duration || 10;
      videoRef.current.currentTime = (videoRef.current.currentTime + deltaX * 0.01 + duration) % duration;
      setDragStartX(e.clientX);
    }
  };

  const handleMouseEnter = () => {
    // Smooth hover reaction
  };

  const handleMouseLeave = () => {
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
      {/* 3D Tilting Stage with the Sphere */}
      <div
        className="idle-sphere-stage"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0.8, 0.4, 1)',
        }}
      >
        {/* Central Rotating 3D Sphere */}
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

        {/* Ambient floor shadow */}
        <div className="sphere-ambient-shadow" />
      </div>
    </div>
  );
};

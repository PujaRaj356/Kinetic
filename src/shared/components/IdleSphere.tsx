import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

interface ProductItem {
  id: number;
  name: string;
  price: string;
  image: string;
  accent: string;
}

const SPHERE_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: 'Orbit Wireless Headphones',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    accent: '#d7ff4f'
  },
  {
    id: 2,
    name: 'Mono Runner Sneaker',
    price: '₹3,299',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    accent: '#ff7a5c'
  },
  {
    id: 3,
    name: 'Grid Minimalist Backpack',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    accent: '#8bd3ff'
  },
  {
    id: 4,
    name: 'Pixel Smart Watch',
    price: '₹7,499',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    accent: '#c9a7ff'
  },
  {
    id: 5,
    name: 'Lumos Minimalist Lamp',
    price: '₹1,899',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    accent: '#ffd166'
  },
  {
    id: 6,
    name: 'Cloud Mechanical Keyboard',
    price: '₹4,199',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    accent: '#b5f6d2'
  },
  {
    id: 7,
    name: 'Studio Audio Monitor',
    price: '₹8,999',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    accent: '#ff9ebb'
  },
  {
    id: 8,
    name: 'Minimal Card Wallet',
    price: '₹999',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    accent: '#e2d4c0'
  },
  {
    id: 9,
    name: 'Cyber Acetate Shades',
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    accent: '#d7ff4f'
  },
  {
    id: 10,
    name: 'Heavyweight Canvas Tote',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    accent: '#ff7a5c'
  },
  {
    id: 11,
    name: 'Matte Ceramic Mug',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    accent: '#8bd3ff'
  },
  {
    id: 12,
    name: 'Insulated Travel Flask',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    accent: '#c9a7ff'
  },
  // Additional high-aesthetic items to create a dense 32-tile globe
  {
    id: 1,
    name: 'Orbit Wireless Headphones',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    accent: '#d7ff4f'
  },
  {
    id: 2,
    name: 'Mono Runner Sneaker',
    price: '₹3,299',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    accent: '#ff7a5c'
  },
  {
    id: 3,
    name: 'Grid Minimalist Backpack',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    accent: '#8bd3ff'
  },
  {
    id: 4,
    name: 'Pixel Smart Watch',
    price: '₹7,499',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    accent: '#c9a7ff'
  },
  {
    id: 5,
    name: 'Lumos Minimalist Lamp',
    price: '₹1,899',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    accent: '#ffd166'
  },
  {
    id: 6,
    name: 'Cloud Mechanical Keyboard',
    price: '₹4,199',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    accent: '#b5f6d2'
  },
  {
    id: 7,
    name: 'Studio Audio Monitor',
    price: '₹8,999',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    accent: '#ff9ebb'
  },
  {
    id: 8,
    name: 'Minimal Card Wallet',
    price: '₹999',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    accent: '#e2d4c0'
  },
  {
    id: 9,
    name: 'Cyber Acetate Shades',
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    accent: '#d7ff4f'
  },
  {
    id: 10,
    name: 'Heavyweight Canvas Tote',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    accent: '#ff7a5c'
  },
  {
    id: 11,
    name: 'Matte Ceramic Mug',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    accent: '#8bd3ff'
  },
  {
    id: 12,
    name: 'Insulated Travel Flask',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    accent: '#c9a7ff'
  },
  {
    id: 1,
    name: 'Orbit Wireless Headphones',
    price: '₹4,999',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    accent: '#d7ff4f'
  },
  {
    id: 2,
    name: 'Mono Runner Sneaker',
    price: '₹3,299',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    accent: '#ff7a5c'
  },
  {
    id: 3,
    name: 'Grid Minimalist Backpack',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    accent: '#8bd3ff'
  },
  {
    id: 4,
    name: 'Pixel Smart Watch',
    price: '₹7,499',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    accent: '#c9a7ff'
  },
  {
    id: 5,
    name: 'Lumos Minimalist Lamp',
    price: '₹1,899',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    accent: '#ffd166'
  },
  {
    id: 6,
    name: 'Cloud Mechanical Keyboard',
    price: '₹4,199',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    accent: '#b5f6d2'
  },
  {
    id: 7,
    name: 'Studio Audio Monitor',
    price: '₹8,999',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    accent: '#ff9ebb'
  },
  {
    id: 8,
    name: 'Minimal Card Wallet',
    price: '₹999',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    accent: '#e2d4c0'
  }
];

// Helper: Generates an ultra-crisp, anti-aliased card texture with cover aspect-ratio
function createCrispCardTexture(imageUrl: string, maxAnisotropy: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 400;
  const ctx = canvas.getContext('2d')!;

  const drawCard = (imageObj?: HTMLImageElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Card background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(6, 6, 308, 388, 14);
    ctx.fill();

    if (imageObj) {
      // Clipped inner image area with 8px margin
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(12, 12, 296, 376, 10);
      ctx.clip();

      // Aspect ratio cover calculation
      const hRatio = 296 / imageObj.width;
      const vRatio = 376 / imageObj.height;
      const ratio = Math.max(hRatio, vRatio);
      const shiftX = (296 - imageObj.width * ratio) / 2;
      const shiftY = (376 - imageObj.height * ratio) / 2;

      ctx.drawImage(
        imageObj,
        0, 0, imageObj.width, imageObj.height,
        12 + shiftX, 12 + shiftY, imageObj.width * ratio, imageObj.height * ratio
      );
      ctx.restore();
    } else {
      // Clean placeholder while loading
      ctx.fillStyle = '#f6f1e7';
      ctx.beginPath();
      ctx.roundRect(12, 12, 296, 376, 10);
      ctx.fill();
    }

    // Crisp high-contrast card border
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(6, 6, 308, 388, 14);
    ctx.stroke();
  };

  drawCard();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = maxAnisotropy;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    drawCard(img);
    texture.needsUpdate = true;
  };
  img.src = imageUrl;

  return texture;
}

export const IdleSphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [hoveredProduct, setHoveredProduct] = useState<ProductItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const sphereGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<{ mesh: THREE.Mesh; product: ProductItem; originalPos: THREE.Vector3 }[]>([]);

  // Smooth rotation & radius physics
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.15, y: 0 });
  const currentRotationRef = useRef({ x: 0.15, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.003 });

  // Tighter, closer base radius for a dense, cohesive photo globe
  const currentRadiusRef = useRef(162);
  const targetRadiusRef = useRef(162);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 1, 2000);
    camera.position.z = 490;
    cameraRef.current = camera;

    // 2. High-DPI WebGL Renderer with full transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // 3. Central Rotational Group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    sphereGroupRef.current = sphereGroup;

    // 4. Subtle, delicate glass contour lines for the sphere
    const ringGeo = new THREE.BufferGeometry();
    const ringPoints: THREE.Vector3[] = [];
    const segments = 120;
    const ringRadius = 160;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * ringRadius, 0, Math.sin(theta) * ringRadius));
    }
    ringGeo.setFromPoints(ringPoints);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.08
    });
    const equatorRing = new THREE.Line(ringGeo, ringMat);
    sphereGroup.add(equatorRing);

    const meridianRing = new THREE.Line(ringGeo, ringMat);
    meridianRing.rotation.x = Math.PI / 2;
    sphereGroup.add(meridianRing);

    // 5. Dense Fibonacci Sphere Distribution
    // Card geometry: well-proportioned portrait cards (80 x 100)
    const cardGeo = new THREE.PlaneGeometry(80, 100);
    const count = SPHERE_PRODUCTS.length;
    const baseRadius = 162; // Dense, tightly nestled together

    meshesRef.current = [];

    SPHERE_PRODUCTS.forEach((product, i) => {
      // Golden Ratio / Fibonacci mapping
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = baseRadius * Math.cos(theta) * Math.sin(phi);
      const y = baseRadius * Math.sin(theta) * Math.sin(phi);
      const z = baseRadius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      const texture = createCrispCardTexture(product.image, maxAnisotropy);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.96,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(cardGeo, material);
      mesh.position.copy(pos);

      // Orient mesh outward tangent to the sphere surface
      mesh.lookAt(pos.clone().multiplyScalar(2));
      mesh.userData = { product, index: i };

      sphereGroup.add(mesh);
      meshesRef.current.push({ mesh, product, originalPos: pos });
    });

    // 6. Raycasting for hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = clientX - pointerStartRef.current.x;
        const deltaY = clientY - pointerStartRef.current.y;

        velocityRef.current.y = deltaX * 0.005;
        velocityRef.current.x = deltaY * 0.005;

        targetRotationRef.current.y += deltaX * 0.008;
        targetRotationRef.current.x += deltaY * 0.008;

        pointerStartRef.current = { x: clientX, y: clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sphereGroup.children);
      const hit = intersects.find((h) => h.object.userData && h.object.userData.product);

      if (hit) {
        container.style.cursor = 'pointer';
        const prod = hit.object.userData.product as ProductItem;
        setHoveredProduct(prod);
        setTooltipPos({ x: clientX - rect.left, y: clientY - rect.top });
      } else {
        container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
        setHoveredProduct(null);
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      container.style.cursor = 'grab';
    };

    const onMouseEnter = () => {
      targetRadiusRef.current = 180; // Gentle expansion on hover
    };

    const onMouseLeave = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      setHoveredProduct(null);
      targetRadiusRef.current = 162; // Return to dense compact shell
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sphereGroup.children);
      const hit = intersects.find((h) => h.object.userData && h.object.userData.product);

      if (hit) {
        const prod = hit.object.userData.product as ProductItem;
        navigate(`/products/${prod.id}`);
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('click', onClick);

    // 7. Animation Loop with smooth inertia
    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);
      lastTime = time;

      if (!isDraggingRef.current) {
        targetRotationRef.current.y += 0.0022; // Gentle constant rotation
        targetRotationRef.current.y += velocityRef.current.y;
        targetRotationRef.current.x += velocityRef.current.x;
        velocityRef.current.x *= 0.94;
        velocityRef.current.y *= 0.94;
      }

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.1;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.1;

      sphereGroup.rotation.x = currentRotationRef.current.x;
      sphereGroup.rotation.y = currentRotationRef.current.y;

      currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * 0.08;
      const radiusRatio = currentRadiusRef.current / baseRadius;

      // Update positions and depth effects
      meshesRef.current.forEach(({ mesh, originalPos }) => {
        mesh.position.copy(originalPos).multiplyScalar(radiusRatio);

        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);

        // Distance from camera: front cards are vivid and larger, back cards are transparent
        const zDepth = worldPos.z;
        const normalizedDepth = (zDepth + 160) / 320; // 0 (back) to 1 (front)

        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.52 + Math.max(0, Math.min(1, normalizedDepth)) * 0.48;

        const scale = 0.92 + Math.max(0, Math.min(1, normalizedDepth)) * 0.22;
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [navigate]);

  return (
    <div
      ref={mountRef}
      className="transparent-sphere-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '540px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      {hoveredProduct && (
        <div
          className="sphere-product-tooltip"
          style={{
            position: 'absolute',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 42}px`,
            transform: 'translate(-50%, -100%)',
            background: '#ffffff',
            border: '2px solid #111111',
            boxShadow: `4px 4px 0px ${hoveredProduct.accent || '#d7ff4f'}`,
            padding: '8px 14px',
            pointerEvents: 'none',
            zIndex: 100,
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
          }}
        >
          <strong style={{ fontSize: '12px', fontWeight: 900, color: '#111' }}>
            {hoveredProduct.name}
          </strong>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#666' }}>
            {hoveredProduct.price} · Click to view
          </span>
        </div>
      )}

      {/* Subtle floor contact shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          width: '220px',
          height: '20px',
          background: 'radial-gradient(ellipse at center, rgba(17,17,17,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
};

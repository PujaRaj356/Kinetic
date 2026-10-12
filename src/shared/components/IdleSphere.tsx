import React, { useRef, useEffect, useState, useCallback } from 'react';
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
    name: 'Lumos Desk Lamp',
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
  // Repeat curated items around the sphere to reach 24 balanced points
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
    name: 'Lumos Desk Lamp',
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
  }
];

export const IdleSphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [hoveredProduct, setHoveredProduct] = useState<ProductItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // References for Three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const sphereGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<{ mesh: THREE.Mesh; product: ProductItem; originalPos: THREE.Vector3 }[]>([]);

  // Physics & interaction tracking
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.1, y: 0 });
  const currentRotationRef = useRef({ x: 0.1, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.003 });
  const currentRadiusRef = useRef(210);
  const targetRadiusRef = useRef(210);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.z = 620;
    cameraRef.current = camera;

    // 2. High-performance WebGL Renderer with full alpha transparency
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

    // 3. Central Rotational Group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    sphereGroupRef.current = sphereGroup;

    // 4. Subtle, delicate transparent glass curvature rings for spatial depth
    const ringGeo = new THREE.BufferGeometry();
    const ringPoints: THREE.Vector3[] = [];
    const segments = 120;
    const ringRadius = 208;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * ringRadius, 0, Math.sin(theta) * ringRadius));
    }
    ringGeo.setFromPoints(ringPoints);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.12
    });
    const equatorRing = new THREE.Line(ringGeo, ringMat);
    sphereGroup.add(equatorRing);

    // Secondary vertical meridian contour ring
    const meridianRing = new THREE.Line(ringGeo, ringMat);
    meridianRing.rotation.x = Math.PI / 2;
    sphereGroup.add(meridianRing);

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // 6. Fibonacci Sphere Distribution of Image Tiles
    const count = SPHERE_PRODUCTS.length;
    const baseRadius = 210;
    const cardGeo = new THREE.PlaneGeometry(68, 82);

    meshesRef.current = [];

    SPHERE_PRODUCTS.forEach((product, i) => {
      // Golden Spiral / Fibonacci points on 3D sphere surface
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = baseRadius * Math.cos(theta) * Math.sin(phi);
      const y = baseRadius * Math.sin(theta) * Math.sin(phi);
      const z = baseRadius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);

      // Load texture with fallback
      const texture = textureLoader.load(product.image);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      // Card material: double-sided so back cards are visible through the transparent sphere
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.94,
        depthWrite: false
      });

      const mesh = new THREE.Mesh(cardGeo, material);
      mesh.position.copy(pos);

      // Orient tangent to sphere (looking outward from center)
      mesh.lookAt(pos.clone().multiplyScalar(2));

      // Save metadata for raycasting & scaling
      mesh.userData = { product, index: i };

      sphereGroup.add(mesh);
      meshesRef.current.push({ mesh, product, originalPos: pos });
    });

    // 7. Raycaster for hover & click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      // Handle drag rotation
      if (isDraggingRef.current) {
        const deltaX = clientX - pointerStartRef.current.x;
        const deltaY = clientY - pointerStartRef.current.y;

        velocityRef.current.y = deltaX * 0.005;
        velocityRef.current.x = deltaY * 0.005;

        targetRotationRef.current.y += deltaX * 0.008;
        targetRotationRef.current.x += deltaY * 0.008;

        pointerStartRef.current = { x: clientX, y: clientY };
      }

      // Check hover intersection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(sphereGroup.children);

      const hitMesh = intersects.find((hit) => hit.object.userData && hit.object.userData.product);

      if (hitMesh) {
        container.style.cursor = 'pointer';
        const prod = hitMesh.object.userData.product as ProductItem;
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
      isHoveredRef.current = true;
      targetRadiusRef.current = 245; // Smoothly expand outward on hover
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      isDraggingRef.current = false;
      setIsDragging(false);
      setHoveredProduct(null);
      targetRadiusRef.current = 210; // Converge back to base sphere radius
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

    // 8. Animation & Render Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Natural idle drift when not actively dragging
      if (!isDraggingRef.current) {
        targetRotationRef.current.y += 0.0025;
        // Dampen any residual drag velocity
        targetRotationRef.current.y += velocityRef.current.y;
        targetRotationRef.current.x += velocityRef.current.x;
        velocityRef.current.x *= 0.93;
        velocityRef.current.y *= 0.93;
      }

      // Smooth lerp rotation for liquid physical response
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.1;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.1;

      sphereGroup.rotation.x = currentRotationRef.current.x;
      sphereGroup.rotation.y = currentRotationRef.current.y;

      // Smooth radius expansion & convergence (breathing effect)
      currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * 0.08;
      const radiusRatio = currentRadiusRef.current / baseRadius;

      // Update positions & depth opacities
      meshesRef.current.forEach(({ mesh, originalPos }) => {
        mesh.position.copy(originalPos).multiplyScalar(radiusRatio);

        // Calculate world position to determine front vs back depth
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);

        // Distance from camera: front cards are vivid, back cards are softer & transparent
        const zDepth = worldPos.z; // Range: roughly -200 to +200
        const normalizedDepth = (zDepth + 200) / 400; // 0 (back) to 1 (front)

        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.55 + Math.max(0, Math.min(1, normalizedDepth)) * 0.45;

        // Subtle scale emphasis for front cards
        const scale = 0.88 + Math.max(0, Math.min(1, normalizedDepth)) * 0.28;
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 9. Resize observer for flawless responsive scaling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 520;
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
      {/* Floating Hover Tooltip */}
      {hoveredProduct && (
        <div
          className="sphere-product-tooltip"
          style={{
            position: 'absolute',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 48}px`,
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

      {/* Subtle Bottom Ambient Floor Reflection */}
      <div
        style={{
          position: 'absolute',
          bottom: '25px',
          width: '240px',
          height: '24px',
          background: 'radial-gradient(ellipse at center, rgba(17,17,17,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
};

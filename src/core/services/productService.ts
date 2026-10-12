import { Product } from '../models/product.model';

export const productList: Product[] = [
  {
    id: 1,
    name: 'Orbit Wireless Headphones',
    category: 'Audio',
    price: 4999,
    oldPrice: 6499,
    rating: 4.8,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    accent: '#d7ff4f',
    featured: true,
    description: 'Engineered for audio purists and daily commuters alike, the Orbit Wireless Headphones blend custom 40mm neodymium drivers with active noise cancellation. Enjoy crystal-clear highs, deep warm sub-bass, and ergonomic memory-foam ear cushions designed for all-day listening sessions without fatigue.',
    highlights: [
      'Hybrid Active Noise Cancellation with Transparency Mode',
      'Up to 32 hours of continuous playback on a single charge',
      'Ultra-soft protein leather memory foam ear cups',
      'Multipoint Bluetooth 5.2 for seamless device switching'
    ],
    specs: {
      'Driver Size': '40mm Neodymium',
      'Battery Life': '32 Hours (ANC On)',
      'Charging Port': 'USB-C Fast Charge',
      'Weight': '245g',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    reviews: [
      {
        id: 'r1',
        user: 'Aarav Sharma',
        rating: 5,
        date: 'Sept 28, 2026',
        comment: 'The noise cancellation is astonishing for this price point. Deep bass without muddying the vocal mids. Battery easily lasts 3 full days of work calls.'
      },
      {
        id: 'r2',
        user: 'Rhea Kapoor',
        rating: 4,
        date: 'Sept 15, 2026',
        comment: 'Extremely comfortable for long flights. Swapping between my laptop and smartphone is instant.'
      }
    ]
  },
  {
    id: 2,
    name: 'Mono Runner Sneaker',
    category: 'Footwear',
    price: 3299,
    oldPrice: 3999,
    rating: 4.6,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    accent: '#ff7a5c',
    featured: true,
    description: 'Crafted with breathable knit uppers and responsive dual-density foam midsoles, the Mono Runner delivers incredible responsiveness for daily urban runs and casual weekend wear. Reinforced rubber outsoles ensure maximum grip on wet city pavement.',
    highlights: [
      'Breathable engineered mesh upper for cooling airflow',
      'Cushioned dual-density EVA midsole for maximum impact absorption',
      'High-traction rubber outsole tread pattern',
      'Reflective heel accents for low-light visibility'
    ],
    specs: {
      'Upper Material': 'Engineered FlyKnit Mesh',
      'Sole Material': 'Dual-density EVA & Rubber',
      'Closure': 'Lace-Up',
      'Weight': '290g per shoe',
      'Care Instructions': 'Hand wash cool'
    },
    reviews: [
      {
        id: 'r3',
        user: 'Vikram Mehta',
        rating: 5,
        date: 'Sept 24, 2026',
        comment: 'Unbelievably light on the feet! Wore these on a 10km city walk and had zero soreness or blisters.'
      }
    ]
  },
  {
    id: 3,
    name: 'Grid Minimalist Backpack',
    category: 'Bags',
    price: 2499,
    rating: 4.7,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    accent: '#8bd3ff',
    featured: true,
    description: 'Designed for modern digital nomads, the Grid Backpack combines a weather-resistant Cordura exterior with dedicated shockproof compartments for up to a 16-inch laptop, tablet, chargers, and daily carry items.',
    highlights: [
      'Water-repellent 900D Cordura nylon shell',
      'Padded 16" laptop sleeve with faux-fur lining',
      'Hidden RFID-blocking passport pocket on back panel',
      'Ergonomic shoulder straps with magnetic sternum clip'
    ],
    specs: {
      'Capacity': '20 Liters',
      'Laptop Compatibility': 'Up to 16" MacBook Pro',
      'Dimensions': '45cm x 30cm x 15cm',
      'Water Resistance': 'IPX4 Water Repellent',
      'Warranty': '2 Year Limited'
    },
    reviews: [
      {
        id: 'r4',
        user: 'Neha Patel',
        rating: 5,
        date: 'Sept 19, 2026',
        comment: 'Sleek design with tons of smart organization pockets. Fits my laptop, camera gear, and lunch box perfectly.'
      }
    ]
  },
  {
    id: 4,
    name: 'Pixel Smartwatch Series X',
    category: 'Wearables',
    price: 7499,
    oldPrice: 8499,
    rating: 4.5,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    accent: '#c9a7ff',
    description: 'Track your health metrics, continuous heart rate, SpO2 oxygen levels, and sleep cycles with pinpoint accuracy. The Pixel Smartwatch features a stunning 1.4" Always-On AMOLED screen enclosed in an aerospace-grade aluminum casing.',
    highlights: [
      'Ultra-bright 1000-nits AMOLED display',
      'Real-time heart rate, SpO2, and advanced sleep tracking',
      '50m Water Resistance (5 ATM) suitable for swimming',
      'Fast magnetic wireless charging in 45 minutes'
    ],
    specs: {
      'Display': '1.4" AMOLED (454 x 454)',
      'Water Resistance': '5 ATM / 50 meters',
      'Connectivity': 'Bluetooth 5.3 & Wi-Fi',
      'Battery Life': 'Up to 7 Days',
      'OS Compatibility': 'iOS & Android'
    },
    reviews: [
      {
        id: 'r5',
        user: 'Karan Malhotra',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'Display is super crisp even under direct sunlight. Battery lasts nearly a full week with heart rate monitoring on.'
      }
    ]
  },
  {
    id: 5,
    name: 'Studio Architectural Lamp',
    category: 'Home',
    price: 1899,
    rating: 4.4,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    accent: '#ffd66b',
    description: 'Elevate your desk setup with this flexible dual-arm LED studio lamp. Touch-sensitive dimming controls allow you to switch seamlessly between warm amber reading light and crisp cool white task illumination.',
    highlights: [
      'Eye-care flicker-free LED panel with CRI > 90',
      '5 Color Temperatures & 10 Brightness Levels',
      'Precision counter-balanced spring arm',
      'Integrated 10W wireless smartphone charger on base'
    ],
    specs: {
      'Power Output': '12W LED (800 Lumens)',
      'Color Temperature': '2700K - 6500K',
      'Material': 'Anodized Aluminum & Steel',
      'Base Diameter': '18cm',
      'Lifespan': '50,000 Hours'
    },
    reviews: [
      {
        id: 'r6',
        user: 'Simran Gill',
        rating: 4,
        date: 'Aug 30, 2026',
        comment: 'Love the minimalist matte black aesthetic! The warm light mode is super gentle on the eyes during late night coding.'
      }
    ]
  },
  {
    id: 6,
    name: 'Cloud Mechanical Keyboard',
    category: 'Tech',
    price: 4199,
    rating: 4.9,
    stock: 11,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    accent: '#b5f6d2',
    description: 'Built for typists and enthusiasts, the Cloud Keyboard features hot-swappable tactile mechanical switches, sound-absorbing acoustic foam layers, and customizable per-key RGB backlighting encased in a solid CNC aluminum body.',
    highlights: [
      '75% Compact layout with volume rotary knob',
      'Hot-swappable PCB supporting 3-pin & 5-pin switches',
      'Double-shot PBT keycaps resistant to shine',
      'Triple connection modes: Bluetooth 5.0, 2.4GHz Wireless & Type-C'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Switches': 'Custom Pre-lubed Tactile Cream',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Battery': '4000mAh Rechargeable',
      'Weight': '980g'
    },
    reviews: [
      {
        id: 'r7',
        user: 'Devansh Roy',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'The acoustics on this out-of-the-box keyboard are insane. Deep marble sound profile without needing custom mods!'
      }
    ]
  },
  {
    id: 7,
    name: 'Field Stainless Thermal Bottle',
    category: 'Lifestyle',
    price: 899,
    oldPrice: 1199,
    rating: 4.3,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    accent: '#a8e6ff',
    description: 'Constructed from food-grade 18/8 stainless steel, the Field Thermal Bottle utilizes vacuum insulation to keep water ice-cold for 24 hours or coffee piping hot for up to 12 hours.',
    highlights: [
      'Double-wall vacuum insulation tech',
      '100% Leakproof BPA-free cap with carabiner loop',
      'Powder-coated non-slip matte exterior',
      'Sweat-proof condensation-free design'
    ],
    specs: {
      'Capacity': '750 ml',
      'Material': '18/8 Food-Grade Stainless Steel',
      'Cold Retention': '24 Hours',
      'Hot Retention': '12 Hours',
      'Dishwasher Safe': 'Yes (Top Rack)'
    },
    reviews: [
      {
        id: 'r8',
        user: 'Ananya Roy',
        rating: 4,
        date: 'Sept 10, 2026',
        comment: 'Keeps water cold through entire gym sessions and outdoor hikes. Very sturdy powder coat finish.'
      }
    ]
  },
  {
    id: 8,
    name: 'Frame Sculptural Lounge Chair',
    category: 'Home',
    price: 8999,
    rating: 4.7,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    accent: '#ffb7d5',
    description: 'A masterpiece of contemporary interior architecture, the Frame Chair pairs a powder-coated tubular steel frame with high-resilience foam cushioning upholstered in textured boucle fabric.',
    highlights: [
      'Sculptural geometric steel frame chassis',
      'Stain-resistant premium woven boucle upholstery',
      'Ergonomic angled back support',
      'Non-marking floor protector feet'
    ],
    specs: {
      'Frame Material': 'Heavy-Gauge Steel',
      'Fabric': 'Premium Textured Boucle',
      'Dimensions': '78cm x 72cm x 75cm',
      'Max Weight Capacity': '150 kg',
      'Assembly': 'Pre-assembled'
    },
    reviews: [
      {
        id: 'r9',
        user: 'Pooja V.',
        rating: 5,
        date: 'Sept 04, 2026',
        comment: 'The centerpiece of my living room! Gets compliments from everyone who visits. Super comfortable for reading.'
      }
    ]
  },
  {
    id: 9,
    name: 'Cyber Geometric Sunglasses',
    category: 'Eyewear',
    price: 1999,
    oldPrice: 2599,
    rating: 4.9,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    accent: '#ff9ebb',
    featured: true,
    description: 'Make a futuristic statement with Cyber Shades. Meticulously handcrafted from Italian Mazzucchelli acetate, these glasses feature TAC polarized lenses providing 100% UV400 radiation protection.',
    highlights: [
      'Category 3 TAC Polarized Lenses',
      '100% UV400 UVA & UVB Protection',
      'Hand-polished Italian Acetate frame',
      'Durable 5-barrel stainless steel hinges'
    ],
    specs: {
      'Frame Width': '142 mm',
      'Bridge Width': '19 mm',
      'Lens Type': 'Polarized Anti-Glare',
      'Includes': 'Hard Case & Microfiber Cleaning Cloth',
      'Gender': 'Unisex'
    },
    reviews: [
      {
        id: 'r10',
        user: 'Siddharth Nair',
        rating: 5,
        date: 'Sept 18, 2026',
        comment: 'Build quality feels luxurious. Extremely stylish shape and optics are crystal clear with zero distortion.'
      }
    ]
  },
  {
    id: 10,
    name: 'Acoustic Wireless Earbuds',
    category: 'Audio',
    price: 3499,
    oldPrice: 4299,
    rating: 4.7,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    accent: '#ffe66d',
    featured: true,
    description: 'Equipped with custom graphene dynamic drivers, the Acoustic Pods deliver immersive 3D spatial audio performance. Features low-latency gaming mode and quadruple beamforming mics for HD call voice clarity.',
    highlights: [
      'Graphene dynamic drivers for crisp acoustic clarity',
      'Active ENC (Environmental Noise Cancellation) for calls',
      'IPX5 Sweat & Rain resistant rating',
      '28 Hours total battery life with fast charge case'
    ],
    specs: {
      'Bluetooth Version': 'v5.3',
      'Latency': '45ms Low Latency Mode',
      'Case Battery': '450 mAh',
      'Playtime': '7 Hours (28 Hrs total)',
      'Waterproof Rating': 'IPX5'
    },
    reviews: [
      {
        id: 'r11',
        user: 'Tanya Sengupta',
        rating: 5,
        date: 'Aug 29, 2026',
        comment: 'Great fit for workouts! Never drop connection and sound separation is excellent for acoustic acoustics and jazz.'
      }
    ]
  },
  {
    id: 11,
    name: 'Vibe 360 Portable Speaker',
    category: 'Audio',
    price: 5299,
    rating: 4.8,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    accent: '#a2d2ff',
    description: 'Fill any room or outdoor gathering with room-shaking 360-degree sound. Dual passive radiators deliver deep thumping bass, while the IPX7 waterproof casing handles pool splashes effortlessly.',
    highlights: [
      'Omnidirectional 360° sound dispersion',
      'Dual passive bass radiators for chest-thumping low end',
      'IPX7 100% Waterproof & Dustproof',
      'TWS Party mode link: Connect 2 speakers for stereo sound'
    ],
    specs: {
      'Power Output': '25W RMS',
      'Playtime': '16 Hours',
      'Wireless Range': '30 meters / 100 ft',
      'Weight': '520g',
      'Charging Time': '2.5 Hours'
    },
    reviews: [
      {
        id: 'r12',
        user: 'Rahul Saxena',
        rating: 5,
        date: 'Sept 01, 2026',
        comment: 'Punches way above its weight! Took it on a beach trip and the volume and clarity outdoor were incredible.'
      }
    ]
  },
  {
    id: 12,
    name: 'Urban Heavyweight Hoodie',
    category: 'Apparel',
    price: 2799,
    oldPrice: 3499,
    rating: 4.6,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    accent: '#b8c0ff',
    description: 'Cut from 450 GSM French terry organic cotton, this boxy street hoodie offers structured warmth and comfort. Double-lined hood, dropped shoulders, and ribbed cuffs complete the modern relaxed silhouette.',
    highlights: [
      '450 GSM Heavyweight 100% Organic French Terry Cotton',
      'Pre-shrunk fabric for lasting true fit',
      'Double-stitched kangaroo pocket & reinforced seams',
      'Unisex oversized boxy fit'
    ],
    specs: {
      'Fabric Weight': '450 GSM',
      'Material': '100% Organic Cotton',
      'Fit': 'Oversized Boxy',
      'Care': 'Machine wash cold inside out',
      'Origin': 'Ethically Manufactured'
    },
    reviews: [
      {
        id: 'r13',
        user: 'Zaid Khan',
        rating: 4,
        date: 'Sept 14, 2026',
        comment: 'Thick, premium fabric that keeps its structured shape after washing. Highly recommended!'
      }
    ]
  },
  {
    id: 13,
    name: 'Minimalist Aluminum Cardholder',
    category: 'Accessories',
    price: 1299,
    rating: 4.5,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    accent: '#e7c6ff',
    description: 'Ditch bulky traditional wallets. This sleek aviation-grade aluminum cardholder features a push-up trigger mechanism that fans out up to 8 cards for instant one-handed access.',
    highlights: [
      'Instant push-button card ejection mechanism',
      'Integrated RFID & NFC blocking shield against wireless theft',
      'Flexible silicone cash strap holds folded bills securely',
      'Ultra-thin 12mm profile fits front pockets seamlessly'
    ],
    specs: {
      'Card Capacity': '1 to 8 Cards',
      'Material': 'Aerospace Anodized Aluminum',
      'Dimensions': '10cm x 6.2cm x 1.2cm',
      'Weight': '65g',
      'Security': 'RFID Blocking Tech'
    },
    reviews: [
      {
        id: 'r14',
        user: 'Mohit Rao',
        rating: 5,
        date: 'Sept 26, 2026',
        comment: 'Game changer for front pocket carry. Cards pop out smoothly with the lever.'
      }
    ]
  },
  {
    id: 14,
    name: 'Ergo Precision Wireless Mouse',
    category: 'Tech',
    price: 2899,
    oldPrice: 3499,
    rating: 4.8,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    accent: '#c8e6c9',
    description: 'Sculpted to match the natural posture of your hand, the Ergo Precision Mouse reduces wrist strain during long work sessions. Features a hyper-fast electromagnetic scroll wheel and silent click switches.',
    highlights: [
      'Ergonomic 57° vertical palm grip angle',
      'Quiet-click buttons (90% noise reduction)',
      '4000 DPI high-precision optical tracking sensor',
      'Connect up to 3 devices with seamless Flow switching'
    ],
    specs: {
      'DPI Range': '200 to 4000 DPI',
      'Connectivity': 'Bluetooth Low Energy & 2.4G Receiver',
      'Battery Life': 'Up to 70 days on full charge',
      'Recharge Time': 'Quick charge (3 min charge = 1 day use)',
      'Compatibility': 'Windows, Mac, iPadOS, ChromeOS'
    },
    reviews: [
      {
        id: 'r15',
        user: 'Meera Iyer',
        rating: 5,
        date: 'Sept 11, 2026',
        comment: 'Cured my wrist pain after switching to this! Silent clicks are great for working in quiet office environments.'
      }
    ]
  },
  {
    id: 15,
    name: 'Smart Temperature Flask',
    category: 'Lifestyle',
    price: 1499,
    rating: 4.4,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    accent: '#ffcc80',
    description: 'Touch the sleek lid to instantly reveal the internal liquid temperature on a bright HD LED display. Built with double-wall copper-plated insulation to preserve beverage temperature for hours.',
    highlights: [
      'Touch-activated LED lid temperature display',
      '316 Medical-grade stainless steel inner liner',
      'Removable tea filter infuser basket included',
      'Long-life CR2450 battery lasts up to 2 years'
    ],
    specs: {
      'Capacity': '500 ml',
      'Liner Material': '316 Medical-grade Stainless Steel',
      'Display': 'OLED Touch Screen',
      'Retention': 'Hot 12h / Cold 24h',
      'BPA Free': 'Yes'
    },
    reviews: [
      {
        id: 'r16',
        user: 'Gaurav Joshi',
        rating: 4,
        date: 'Sept 07, 2026',
        comment: 'Very handy for making green tea on the go. Temperature display is responsive and accurate.'
      }
    ]
  },
  {
    id: 16,
    name: 'Heavyweight Canvas Carry Tote',
    category: 'Bags',
    price: 1199,
    oldPrice: 1599,
    rating: 4.7,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    accent: '#fff59d',
    description: 'Constructed from heavy 16oz cotton duck canvas, this structured tote carries groceries, books, or beach essentials with ease. Features an inner zippered pocket and key leash lanyard.',
    highlights: [
      'Heavy-duty 16oz 100% Cotton Duck Canvas',
      'Reinforced double-stitched webbing handles',
      'Internal zip pocket for phone & wallet security',
      'Flat reinforced base stands upright'
    ],
    specs: {
      'Material': '16oz Natural Cotton Canvas',
      'Dimensions': '40cm x 35cm x 14cm',
      'Handle Drop': '26 cm',
      'Closure': 'Magnetic Snap Top',
      'Washable': 'Machine Wash Gentle'
    },
    reviews: [
      {
        id: 'r17',
        user: 'Divya Nair',
        rating: 5,
        date: 'Sept 02, 2026',
        comment: 'Super sturdy tote! Holds my 15-inch laptop, water bottle, and sweater without sagging.'
      }
    ]
  },
  {
    id: 17,
    name: 'Reflective Night Windbreaker',
    category: 'Apparel',
    price: 4599,
    rating: 4.9,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    accent: '#d1c4e9',
    featured: true,
    description: 'Designed for nocturnal urban explorers, this windbreaker features 3M Scotchlite 360-degree reflective patterns that glow intensely under city lights, combined with a DWR water-repellent coating.',
    highlights: [
      '3M Scotchlite high-visibility reflective print',
      'DWR (Durable Water Repellent) stormproof shell',
      'Packable into its own chest pocket with sling strap',
      'Adjustable toggle hood and elasticated cuffs'
    ],
    specs: {
      'Shell': '100% Ripstop Nylon with DWR',
      'Reflectivity': '3M Scotchlite 360°',
      'Weight': '210g ultra-light packable',
      'Zippers': 'YKK Aquaguard Waterproof',
      'Fit': 'Athletic Cut'
    },
    reviews: [
      {
        id: 'r18',
        user: 'Arjun Das',
        rating: 5,
        date: 'Sept 25, 2026',
        comment: 'Insane reflective effect at night! Perfect for evening cycling and running in rainy weather.'
      }
    ]
  },
  {
    id: 18,
    name: 'Ambient RGB Monitor Light Bar',
    category: 'Home',
    price: 2199,
    oldPrice: 2799,
    rating: 4.6,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    accent: '#b2dfdb',
    description: 'Eliminate screen glare and brighten your workstation. Mounts effortlessly to curved or flat monitors, offering asymmetric optical light forward while projecting vibrant ambient RGB backlighting.',
    highlights: [
      'Asymmetric optical light design (zero screen glare)',
      'Rear ambient RGB lighting with music sync mode',
      'Wireless desktop magnetic touch puck control',
      'USB-powered directly from monitor or PC'
    ],
    specs: {
      'Length': '45 cm / 17.7 inches',
      'Monitor Thickness': 'Fits 0.5cm - 4.5cm',
      'Power Input': '5V 2A USB Type-C',
      'Light Output': 'CRI Ra > 95 High Color Accuracy',
      'Controls': 'Wireless Desktop Remote Dial'
    },
    reviews: [
      {
        id: 'r19',
        user: 'Tarun Kapoor',
        rating: 5,
        date: 'Sept 17, 2026',
        comment: 'Drastically reduced my eye strain during night gaming and editing sessions. Wireless dial controller is super sleek!'
      }
    ]
  }
];

export const PRODUCTS_KEY = 'kinetic-products-catalog';

export function getAllProducts(): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productList));
      return productList;
    }
    const parsed = JSON.parse(stored) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productList));
      return productList;
    }
    return parsed.map((p, idx) => ({
      ...p,
      id: Number(p.id) || idx + 1,
      name: p.name || 'Untitled Product',
      category: p.category || 'General',
      price: Number(p.price) || 0,
      stock: Number(p.stock) || 0,
      rating: Number(p.rating) || 5.0,
      image: p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      accent: p.accent || '#d7ff4f',
      description: p.description || '',
      highlights: Array.isArray(p.highlights) ? p.highlights : [],
      reviews: Array.isArray(p.reviews) ? p.reviews : []
    }));
  } catch {
    return productList;
  }
}


export function getCategories(): string[] {
  const list = getAllProducts();
  return ['All', ...Array.from(new Set(list.map(p => p.category)))];
}

export const categories = ['All', ...Array.from(new Set(productList.map(p => p.category)))];

export function getProductById(id: number): Product | undefined {
  const list = getAllProducts();
  return list.find(p => p.id === id);
}

export function searchProducts(query: string, category: string): Product[] {
  const q = query.trim().toLowerCase();
  const list = getAllProducts();
  return list.filter(p =>
    (category === 'All' || p.category === category) &&
    (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  );
}

export function addProduct(
  product: Omit<Product, 'id' | 'rating' | 'reviews'> & Partial<Pick<Product, 'id' | 'rating' | 'reviews'>>
): Product {

  const list = getAllProducts();
  const nextId = product.id ?? (list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 1);
  const newProduct: Product = {
    ...product,
    id: nextId,
    rating: product.rating ?? 5.0,
    reviews: product.reviews ?? []
  };
  const updated = [newProduct, ...list];
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  return newProduct;
}

export function updateProduct(product: Product): Product {
  const list = getAllProducts();
  const index = list.findIndex(p => p.id === product.id);
  if (index !== -1) {
    list[index] = product;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
  }
  return product;
}

export function deleteProduct(id: number): boolean {
  const list = getAllProducts();
  const filtered = list.filter(p => p.id !== id);
  if (filtered.length !== list.length) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
}


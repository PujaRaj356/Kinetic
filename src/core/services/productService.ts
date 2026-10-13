import { Product } from '../models/product.model';

export const productList: Product[] = [
  // --- FOOTWEAR ---
  {
    id: 1,
    name: 'Nike Air Jordan 1 Retro (Red & Black)',
    category: 'Footwear',
    price: 12499,
    oldPrice: 14999,
    rating: 4.8,
    stock: 14,
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp'
    ],
    accent: '#ff7a5c',
    featured: true,
    description: 'The iconic high-top basketball silhouette in the classic red, black, and white colorway. Premium full-grain leather upper paired with encapsulated Air-Sole cushioning in the heel for lasting shock absorption and timeless street style.',
    highlights: [
      '100% Genuine full-grain leather overlays',
      'Encapsulated Air-Sole unit for lightweight responsive cushioning',
      'Solid rubber outsole with deep flex grooves for maximum grip',
      'Padded high-cut collar for ankle support and comfort'
    ],
    specs: {
      'Silhouette': 'High-Top Basketball Sneaker',
      'Upper': 'Full-grain Leather',
      'Cushioning': 'Air-Sole Capsule',
      'Colorway': 'Varsity Red / Black / White',
      'Closure': '8-Eyelet Lace-Up'
    },
    reviews: [
      {
        id: 'r1',
        user: 'Aarav Sharma',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'Leather quality on this pair is top tier. The red and black contrast turns heads everywhere.'
      },
      {
        id: 'r2',
        user: 'Elena Long',
        rating: 5,
        date: 'Sept 28, 2026',
        comment: 'Fits true to size and looks incredible with wide-leg pants or denim.'
      }
    ]
  },
  {
    id: 2,
    name: 'Puma Future Rider Casual Trainers',
    category: 'Footwear',
    price: 4999,
    oldPrice: 6499,
    rating: 4.7,
    stock: 22,
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/4.webp'
    ],
    accent: '#d7ff4f',
    featured: true,
    description: 'Born in 1980 and revived for modern city life, the Future Rider features a slim silhouette with shock-absorbing Federbein outsole studs and vibrant retro color blocking.',
    highlights: [
      'Super-light nylon upper with suede and synthetic leather overlays',
      'Rider Foam midsole provides cloud-like energy return',
      'Slim Federbein rubber studded outsole for all-day traction',
      'Breathable mesh lining prevents heat buildup'
    ],
    specs: {
      'Upper': 'Nylon, Suede & Leather',
      'Midsole': 'IMEVA Rider Foam',
      'Outsole': 'Federbein Rubber Studs',
      'Weight': '280g',
      'Origin': 'Imported'
    },
    reviews: [
      {
        id: 'r3',
        user: 'Vikram Mehta',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'Amazingly light! Walked 15,000 steps on day one without any foot fatigue.'
      }
    ]
  },
  {
    id: 3,
    name: 'Nike Field Performance Cleats',
    category: 'Footwear',
    price: 5499,
    rating: 4.6,
    stock: 10,
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/4.webp'
    ],
    accent: '#8bd3ff',
    description: 'Engineered for explosive acceleration on turf and natural grass. Molded TPU cleat configuration provides razor-sharp traction for cutting, sprinting, and lateral stops.',
    highlights: [
      'Molded TPU studded cleat plate for maximum burst speed',
      'Breathable synthetic upper with reinforced drag-resistant toe cap',
      'Phylon foam cushioning dampens stud pressure',
      'Padded mesh tongue with lace lock'
    ],
    specs: {
      'Surface': 'Firm Turf / Natural Field',
      'Stud Material': 'Molded TPU',
      'Cushioning': 'Full-length Phylon Midsole',
      'Closure': 'Asymmetrical Lace-Up'
    },
    reviews: [
      {
        id: 'r4',
        user: 'Aaron Cook',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'Great lock-down feel around the ankles. Studs bite into wet grass without slipping.'
      }
    ]
  },

  // --- AUDIO ---
  {
    id: 4,
    name: 'Apple AirPods True Wireless Earphones',
    category: 'Audio',
    price: 11999,
    oldPrice: 13999,
    rating: 4.9,
    stock: 25,
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/2.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/3.webp'
    ],
    accent: '#d7ff4f',
    featured: true,
    description: 'Instant effortless setup with all your devices. Powered by the custom Apple H1 headphone chip, delivering rich high-quality AAC audio, optical sensors for auto-play/pause, and up to 24 hours total battery life with the wireless charging case.',
    highlights: [
      'Apple H1 headphone chip for ultra-low latency & fast device switching',
      'Dual beamforming microphones filter out background noise on calls',
      'Optical sensors detect when earbuds are placed in or removed from ears',
      'Quick 15-minute charge in case delivers 3 hours of listening'
    ],
    specs: {
      'Chipset': 'Apple H1 Audio Chip',
      'Connectivity': 'Bluetooth 5.0 Wireless',
      'Battery Life': 'Up to 5h listening (24h with case)',
      'Charging': 'Lightning & Qi Wireless Case',
      'Sensors': 'Dual Optical & Motion Accelerometers'
    },
    reviews: [
      {
        id: 'r5',
        user: 'Emma Wilson',
        rating: 5,
        date: 'Oct 06, 2026',
        comment: 'Pairing is instantaneous across my Mac and phone. Voice call clarity is the best in the market.'
      }
    ]
  },
  {
    id: 5,
    name: 'Amazon Echo Studio Smart Speaker',
    category: 'Audio',
    price: 8999,
    oldPrice: 10999,
    rating: 4.8,
    stock: 12,
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp'
    ],
    accent: '#c9a7ff',
    featured: true,
    description: 'Immersive 360-degree room-filling audio featuring a 3.0" neodymium woofer and 0.8" high-frequency tweeter. Built-in Smart Home Hub automatically senses room acoustics and fine-tunes playback in real time.',
    highlights: [
      'Dolby-tuned 360° omnidirectional sound dispersion',
      'Integrated Zigbee smart home hub for zero-hub light & plug pairing',
      'Far-field microphone array hears commands across large living rooms',
      'Supports lossless HD audio streaming via Wi-Fi and Bluetooth'
    ],
    specs: {
      'Woofer': '3.0" Neodymium Woofer with Bass Reflex Port',
      'Tweeter': '0.8" High-Resolution Silk Dome',
      'Connectivity': 'Dual-band Wi-Fi & Bluetooth',
      'Voice Assistant': 'Alexa Built-In',
      'Weight': '780g'
    },
    reviews: [
      {
        id: 'r6',
        user: 'Karan Malhotra',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'Audio quality easily beats speakers twice its price tag. The bass port produces astonishing warmth.'
      }
    ]
  },

  // --- TECH & LAPTOPS ---
  {
    id: 6,
    name: 'Apple MacBook Pro 14" Space Grey',
    category: 'Tech',
    price: 169999,
    oldPrice: 184999,
    rating: 4.9,
    stock: 8,
    image: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp'
    ],
    accent: '#b5f6d2',
    featured: true,
    description: 'Engineered for pro workflows with Apple silicon architecture. Features the breathtaking Liquid Retina XDR display with 120Hz ProMotion, studio-grade 3-mic array, six-speaker sound system with force-cancelling woofers, and full suite of pro ports.',
    highlights: [
      'Liquid Retina XDR display with 1,000,000:1 contrast & 1600 nits peak brightness',
      'Hardware-accelerated ProRes video encode and decode engines',
      'MagSafe 3 fast-charging port, 3x Thunderbolt 4 ports, HDMI & SDXC reader',
      'Up to 18 hours of real-world battery life on a single charge'
    ],
    specs: {
      'Display': '14.2" Liquid Retina XDR (3024 x 1964) 120Hz ProMotion',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB High-Speed NVMe SSD',
      'Chassis': '100% Recycled CNC Aluminum',
      'Weight': '1.6 kg'
    },
    reviews: [
      {
        id: 'r7',
        user: 'Hazel Evans',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'The XDR display is unbelievable for video color grading. Fans literally never turn on during daily development work.'
      }
    ]
  },
  {
    id: 7,
    name: 'Dell XPS 13 InfinityEdge Ultrabook',
    category: 'Tech',
    price: 114999,
    oldPrice: 129999,
    rating: 4.7,
    stock: 11,
    image: 'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp'
    ],
    accent: '#ffd66b',
    description: 'A masterclass in laptop industrial design. Precision-cut from a single block of aerospace aluminum with aerospace carbon fiber composite palm rest and a 4-sided borderless 16:10 InfinityEdge screen.',
    highlights: [
      'Four-sided virtually borderless 16:10 InfinityEdge display',
      'Machined aluminum chassis with black carbon fiber composite interior',
      'Edge-to-edge MagLev keyboard with 17% larger glass touchpad',
      'Dual thermal fans and hidden exhaust vents maximize cooling efficiency'
    ],
    specs: {
      'Display': '13.4" FHD+ (1920 x 1200) Anti-Glare 500 nits',
      'Processor': 'Intel Core i7 10-Core Processor',
      'RAM': '16GB LPDDR5 Dual-Channel',
      'Storage': '512GB PCIe 4.0 SSD',
      'Weight': '1.2 kg'
    },
    reviews: [
      {
        id: 'r8',
        user: 'Alice Smith',
        rating: 5,
        date: 'Sept 24, 2026',
        comment: 'The carbon fiber wrist rest is so comfortable to type on. Ultra light to carry in my commuter backpack.'
      }
    ]
  },
  {
    id: 8,
    name: 'Asus Zenbook Pro Duo Dual-Screen',
    category: 'Tech',
    price: 139999,
    oldPrice: 154999,
    rating: 4.8,
    stock: 6,
    image: 'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp'
    ],
    accent: '#ff9ebb',
    featured: true,
    description: 'Revolutionize your creative workflow with dual interactive touchscreens. Features a secondary full-width ScreenPad Plus secondary display that tilts up automatically to optimize viewing ergonomics and thermal airflow.',
    highlights: [
      'Tilting ScreenPad Plus 12.6" secondary touchscreen display',
      'OLED HDR primary display with cinema-grade 100% DCI-P3 color gamut',
      'AAS Ultra thermal mechanism increases cooling airflow by 38%',
      'Includes active stylus pen with 4096 pressure levels'
    ],
    specs: {
      'Primary Display': '14.5" 2.8K 120Hz OLED Touchscreen',
      'Secondary Display': '12.7" IPS ScreenPad Plus Touchscreen',
      'Graphics': 'NVIDIA GeForce RTX Studio GPU',
      'RAM': '32GB LPDDR5',
      'Storage': '1TB NVMe Gen4 SSD'
    },
    reviews: [
      {
        id: 'r9',
        user: 'Zoe Bennett',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'Having timeline controls and reference documents open on the bottom screen while editing 4K footage is a revelation.'
      }
    ]
  },

  // --- HOROLOGY & WATCHES ---
  {
    id: 9,
    name: 'Rolex Cellini Moonphase Complication',
    category: 'Horology',
    price: 89999,
    oldPrice: 99999,
    rating: 4.9,
    stock: 4,
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/3.webp'
    ],
    accent: '#ffe5d9',
    featured: true,
    description: 'A celebration of astronomical precision and classical watchmaking. Displays the cycle of lunar phases on an enamelled blue disc at 6 o’clock with a genuine meteorite moon applique, framed in a fluted 18 ct gold bezel.',
    highlights: [
      'Genuine Gibeon meteorite moon applique on blue enamelled disc',
      'Date indicated on perimeter of dial via center hand with crescent tip',
      'Self-winding mechanical caliber certified as Superlative Chronometer',
      'Supple brown alligator leather strap with 18 ct gold Crownclasp'
    ],
    specs: {
      'Case Diameter': '39 mm',
      'Case Material': '18 ct Everose Gold',
      'Crystal': 'Domed Scratch-resistant Sapphire',
      'Power Reserve': 'Approximately 48 Hours',
      'Water Resistance': '50 meters / 5 ATM'
    },
    reviews: [
      {
        id: 'r10',
        user: 'Leo Rivera',
        rating: 5,
        date: 'Sept 15, 2026',
        comment: 'The meteorite moon disc in person has depth and iridescence that photos can barely capture. Masterpiece.'
      }
    ]
  },
  {
    id: 10,
    name: 'Rolex Submariner Date Diver Watch',
    category: 'Horology',
    price: 74999,
    oldPrice: 82999,
    rating: 4.9,
    stock: 5,
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/3.webp'
    ],
    accent: '#a8dadc',
    featured: true,
    description: 'The archetype of the diver watch. Unidirectional rotatable Cerachrom ceramic bezel with 60-minute graduations, solid Oystersteel bracelet with Oysterlock safety clasp, and legendary 300-meter water resistance.',
    highlights: [
      'Unidirectional 60-minute Cerachrom ceramic bezel with platinum numerals',
      'Chromalight display with long-lasting blue luminescent markers',
      'Oystersteel 904L aerospace alloy resistant to ocean corrosion',
      'Glidelock extension system allows fine adjustment over wetsuits'
    ],
    specs: {
      'Case Diameter': '41 mm',
      'Material': 'Oystersteel (904L Stainless)',
      'Water Resistance': '300 meters / 1,000 feet',
      'Bezel': 'Cerachrom Ceramic Insert',
      'Movement': 'Rolex Calibre 3235 Automatic'
    },
    reviews: [
      {
        id: 'r11',
        user: 'Hannah Robinson',
        rating: 5,
        date: 'Oct 03, 2026',
        comment: 'Robust yet slides easily under a dress cuff. The ceramic bezel click is sharp and tactile.'
      }
    ]
  },
  {
    id: 11,
    name: 'Longines Master Collection Chronometer',
    category: 'Horology',
    price: 28999,
    oldPrice: 34999,
    rating: 4.8,
    stock: 12,
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/3.webp'
    ],
    accent: '#b8c0ff',
    description: 'Classical Swiss horology at its finest. Silver barleycorn textured dial, painted Arabic numerals, blued steel hands, and transparent exhibition caseback revealing the automatic balance wheel.',
    highlights: [
      'Barleycorn guilloche engraved dial texture with heat-blued hands',
      'Exhibition sapphire caseback displays Geneva stripes on rotor',
      'Automatic self-winding caliber beating at 28,800 vibrations/hour',
      'Genuine brown calf leather strap with triple folding safety clasp'
    ],
    specs: {
      'Case Diameter': '40 mm',
      'Dial': 'Silver "Barleycorn" with Blued Steel Hands',
      'Movement': 'Automatic Calibre L888',
      'Power Reserve': '72 Hours',
      'Glass': 'Scratch-resistant Sapphire'
    },
    reviews: [
      {
        id: 'r12',
        user: 'Nathan Reed',
        rating: 5,
        date: 'Sept 19, 2026',
        comment: 'The blued steel hands against the barleycorn textured dial look sublime when catching light.'
      }
    ]
  },
  {
    id: 12,
    name: 'Classic Stitched Leather Heritage Watch',
    category: 'Horology',
    price: 6499,
    oldPrice: 7999,
    rating: 4.6,
    stock: 20,
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/3.webp'
    ],
    accent: '#d4a373',
    description: 'Timeless vintage aesthetic for everyday gentleman wear. Features a sunray dial, baton indices, quick-set date complication, and thick vegetable-tanned stitched leather strap that patinas gracefully with age.',
    highlights: [
      'Vegetable-tanned full-grain leather strap with reinforced stitching',
      'Polished 316L stainless steel case with coin-edge crown',
      'Hardened mineral crystal with anti-glare undercoating',
      'Japanese high-precision quartz movement accurate to ±10s/month'
    ],
    specs: {
      'Case Size': '42 mm',
      'Strap Width': '22 mm Genuine Leather',
      'Movement': 'Precision Quartz Movement',
      'Battery Life': '3 Years',
      'Water Resistance': '30 meters / 3 ATM'
    },
    reviews: [
      {
        id: 'r13',
        user: 'David Martinez',
        rating: 5,
        date: 'Sept 26, 2026',
        comment: 'The leather band broke in after just two days and is super supple now. Great daily beater watch.'
      }
    ]
  },

  // --- SMARTPHONES & MOBILE ---
  {
    id: 13,
    name: 'Apple iPhone 13 Pro (Alpine Silver)',
    category: 'Smartphones',
    price: 69999,
    oldPrice: 79999,
    rating: 4.8,
    stock: 9,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp'
    ],
    accent: '#e9ecef',
    featured: true,
    description: 'Pro camera system with 3x optical zoom telephoto, macro photography capabilities, Cinematic mode in 1080p 30fps, and Super Retina XDR display with ProMotion 120Hz adaptive refresh rate.',
    highlights: [
      'Super Retina XDR OLED display with ProMotion up to 120Hz',
      'Pro 12MP camera array (Telephoto, Wide, Ultra Wide) with LiDAR scanner',
      'A15 Bionic chip with 5-core GPU for lightning gaming and rendering',
      'Ceramic Shield front cover and surgical-grade stainless steel frame'
    ],
    specs: {
      'Display': '6.1" Super Retina XDR OLED 120Hz',
      'Processor': 'Apple A15 Bionic (6-Core CPU, 5-Core GPU)',
      'Water Resistance': 'IP68 (6 meters for up to 30 mins)',
      'Storage': '256GB NVMe',
      'Frame': 'Surgical-Grade Stainless Steel'
    },
    reviews: [
      {
        id: 'r14',
        user: 'Christian Perez',
        rating: 5,
        date: 'Oct 05, 2026',
        comment: 'ProMotion 120Hz makes everyday scrolling butter smooth. Macro camera mode is astonishingly sharp.'
      }
    ]
  },
  {
    id: 14,
    name: 'Apple Watch Series 4 Gold Edition',
    category: 'Smartphones',
    price: 24999,
    oldPrice: 29999,
    rating: 4.7,
    stock: 15,
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/2.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/3.webp'
    ],
    accent: '#ffd166',
    featured: true,
    description: 'Fundamentally redesigned with edge-to-edge curved OLED screen, electrical heart sensor capable of generating an ECG, haptic Digital Crown with click feedback, and comprehensive activity ring tracking.',
    highlights: [
      'Curved OLED Retina display with 30% more screen real estate',
      'Electrical and optical heart sensors with low/high heart rate notifications',
      'Fall detection with automatic Emergency SOS call routing',
      'Water resistant to 50 meters, ready for open water swim tracking'
    ],
    specs: {
      'Case Size': '44 mm Anodized Gold Aluminum',
      'Display': 'LTPO OLED Retina with Force Touch (1000 nits)',
      'Sensors': 'ECG Sensor, Optical Heart Sensor, Accelerometer',
      'Connectivity': 'GPS, Wi-Fi, Bluetooth 5.0',
      'Battery': 'All-Day 18 Hours'
    },
    reviews: [
      {
        id: 'r15',
        user: 'Nicholas Bailey',
        rating: 5,
        date: 'Sept 20, 2026',
        comment: 'Gold finish looks very premium on the wrist. Haptic feedback on the digital crown is a delight.'
      }
    ]
  },
  {
    id: 15,
    name: 'Apple MagSafe Magnetic Battery Pack',
    category: 'Smartphones',
    price: 5999,
    oldPrice: 7499,
    rating: 4.6,
    stock: 28,
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/2.webp'
    ],
    accent: '#e7c6ff',
    description: 'Snap on to charge wirelessly. Perfectly aligned magnets attach securely to your iPhone, providing safe and reliable wireless power on the move without pressing buttons or carrying cables.',
    highlights: [
      'Zero-button magnetic snap-on wireless charging',
      'Pass-through charging: charges both pack and phone simultaneously',
      'Intelligent battery widget integration in iOS lock screen',
      'Soft-touch matte exterior provides comfortable palm grip'
    ],
    specs: {
      'Capacity': '1460 mAh (11.13 Wh)',
      'Charging Speed': 'Up to 15W with 20W+ adapter',
      'Compatibility': 'iPhone 12, 13, 14, 15 series',
      'Weight': '115g'
    },
    reviews: [
      {
        id: 'r16',
        user: 'Cameron Burke',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'Essential accessory for full travel days. Magnets grip strong and it fits flat in your pocket.'
      }
    ]
  },
  {
    id: 16,
    name: 'MagSafe Silicone Protective Case (Plum)',
    category: 'Smartphones',
    price: 1999,
    oldPrice: 2499,
    rating: 4.8,
    stock: 35,
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/2.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/3.webp',
      'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/4.webp'
    ],
    accent: '#d1c4e9',
    description: 'Silky, soft-touch finish of the silicone exterior feels great in your hand, while soft microfiber lining inside protects the glass back from scratches. Embedded MagSafe magnets ensure fast magnetic alignment.',
    highlights: [
      'Built-in neodymium magnets align with MagSafe chargers & wallets',
      'Soft-touch liquid silicone exterior resists fingerprints and lint',
      'Internal microfiber velvet lining prevents micro-abrasions',
      'Raised camera bevel protects sapphire lenses from table scratches'
    ],
    specs: {
      'Material': 'Liquid Silicone & Microfiber Lining',
      'Drop Protection': 'Military Standard Drop Tested',
      'MagSafe Compatible': 'Yes (Built-in ring)',
      'Color': 'Deep Plum Purple'
    },
    reviews: [
      {
        id: 'r17',
        user: 'Isabella Anderson',
        rating: 5,
        date: 'Sept 27, 2026',
        comment: 'The plum shade is gorgeous in person! Grippy texture and fits like a second skin.'
      }
    ]
  },

  // --- EYEWEAR ---
  {
    id: 17,
    name: 'Classic Minimalist UV Sunglasses',
    category: 'Eyewear',
    price: 2499,
    oldPrice: 3199,
    rating: 4.7,
    stock: 24,
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/2.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/3.webp'
    ],
    accent: '#ffcc80',
    featured: true,
    description: 'A timeless silhouette engineered with hand-finished cellulose acetate and TAC polarized lenses. Provides full UV400 radiation filtering and glare reduction for coastal drives and bright city walks.',
    highlights: [
      'UV400 Polarized Triacetate Cellulose (TAC) lenses',
      'Handcrafted cellulose acetate frame with wire core temples',
      'Stainless steel 5-barrel barrel hinges for smooth hinge action',
      'Includes faux-leather collapsible travel case & cleaning cloth'
    ],
    specs: {
      'Frame Width': '142 mm',
      'Lens Width': '52 mm',
      'Bridge': '19 mm',
      'Lens Color': 'Neutral Smoke Grey',
      'Protection': '100% UVA / UVB Filtering'
    },
    reviews: [
      {
        id: 'r18',
        user: 'Julian James',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'High optical clarity without any chromatic distortion. Frame has good substantial weight.'
      }
    ]
  },
  {
    id: 18,
    name: 'Cyber Geometric Two-Tone Sunglasses',
    category: 'Eyewear',
    price: 2899,
    oldPrice: 3599,
    rating: 4.8,
    stock: 18,
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/2.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/3.webp'
    ],
    accent: '#b2dfdb',
    description: 'Distinctive architectural angles combined with contrasting two-tone emerald green and matte black Italian acetate. Dark-tinted lenses offer privacy and high-contrast acuity under direct harsh sunlight.',
    highlights: [
      'Bold beveled architectural acetate face front',
      'High-contrast Category 3 anti-reflective lenses',
      'Reinforced internal temple core wires for custom optician adjustments',
      'Laser-engraved temple logos'
    ],
    specs: {
      'Frame Material': 'Italian Mazzucchelli Acetate',
      'Lens Coating': 'Anti-scratch & Hydrophobic',
      'Gender': 'Unisex',
      'Weight': '38g'
    },
    reviews: [
      {
        id: 'r19',
        user: 'Victoria McDonald',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'Unique angular shape! Constantly get asked where I got them.'
      }
    ]
  },

  // --- BAGS & CARRY ---
  {
    id: 19,
    name: 'Prada Saffiano Sculptural Leather Handbag',
    category: 'Bags & Carry',
    price: 38999,
    oldPrice: 44999,
    rating: 4.9,
    stock: 5,
    image: 'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/3.webp'
    ],
    accent: '#ffb7d5',
    featured: true,
    description: 'Iconic luxury Italian craftsmanship. Characterized by its crosshatch textured Saffiano leather finish, double rolled leather handles, detachable shoulder strap, and signature enamelled metal triangle logo.',
    highlights: [
      'Scratch-resistant crosshatch textured Saffiano calf leather',
      'Polished gold-tone hardware and two-way zipper closure',
      'Two internal zip pockets and central compartment with logo lining',
      'Protective metal purse feet on flat base'
    ],
    specs: {
      'Dimensions': '32cm x 24cm x 14cm',
      'Material': 'Calf Saffiano Leather',
      'Hardware': '24k Gold Plated Brass',
      'Origin': 'Made in Italy',
      'Includes': 'Certificate of Authenticity & Dust Bag'
    },
    reviews: [
      {
        id: 'r20',
        user: 'Lucas Ramirez',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'Structured, timeless, and the leather texture is practically indestructible against scuffs.'
      }
    ]
  },
  {
    id: 20,
    name: 'Noir Structured Architectural Handbag',
    category: 'Bags & Carry',
    price: 8999,
    oldPrice: 10999,
    rating: 4.8,
    stock: 14,
    image: 'https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/3.webp'
    ],
    accent: '#d4a373',
    description: 'Rich top-grain cowhide leather with a warm vintage hand-waxed patina. Features multiple exterior zip organizer pockets, dual top carrying handles, and an adjustable crossbody strap.',
    highlights: [
      '100% Top-grain cowhide leather with natural pebble texture',
      'Spacious main compartment holds up to 13" laptop & notebook',
      'Heavy-duty gunmetal zipper hardware and reinforced rivets',
      'Adjustable canvas-backed leather crossbody strap'
    ],
    specs: {
      'Capacity': '15 Liters',
      'Material': 'Genuine Top-Grain Leather',
      'Dimensions': '36cm x 28cm x 12cm',
      'Pockets': '6 Total (3 Exterior, 3 Interior)'
    },
    reviews: [
      {
        id: 'r21',
        user: 'Hunter Gordon',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'Smells of wonderful real leather. Fits my tablet, water bottle, and daily wallet effortlessly.'
      }
    ]
  },
  {
    id: 21,
    name: 'Urban Faux Leather Commuter Backpack',
    category: 'Bags & Carry',
    price: 3299,
    rating: 4.6,
    stock: 20,
    image: 'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/3.webp'
    ],
    accent: '#fff59d',
    description: 'Clean architectural minimalist white backpack. Water-repellent vegan leather exterior with concealed rear anti-theft zipper pocket, padded shoulder straps, and dedicated padded tablet sleeve.',
    highlights: [
      'Clean white vegan PU leather wipes clean with a damp cloth',
      'Anti-theft rear zippered pocket keeps phone and passport safe',
      'Ergonomic padded shoulder straps with metal adjustment sliders',
      'Top grab handle for quick transit carrying'
    ],
    specs: {
      'Dimensions': '38cm x 29cm x 13cm',
      'Material': 'Waterproof PU Vegan Leather',
      'Capacity': '14 Liters',
      'Weight': '680g'
    },
    reviews: [
      {
        id: 'r22',
        user: 'Ava Harrison',
        rating: 5,
        date: 'Sept 25, 2026',
        comment: 'Looks super chic with work clothes and keeps its sharp structured shape even when empty.'
      }
    ]
  },

  // --- WORKSPACE & FURNITURE ---
  {
    id: 22,
    name: 'Knoll Saarinen Executive Chair',
    category: 'Workspace',
    price: 32999,
    oldPrice: 38999,
    rating: 4.9,
    stock: 6,
    image: 'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp'
    ],
    accent: '#ffd66b',
    featured: true,
    description: 'Designed by Eero Saarinen in 1950, this design icon revolutionized executive seating with its fluid sculptural polyurethane shell, lumbar cutout for ventilation, and plush contoured foam cushioning.',
    highlights: [
      'Sculptural reinforced molded polyurethane inner shell',
      'Lumbar opening provides cooling airflow and ergonomic flex',
      'Commercial-grade wool blend woven upholstery with welted piping',
      'Four-star polished chrome swivel base with floor glide feet'
    ],
    specs: {
      'Dimensions': '66cm W x 63cm D x 80cm H',
      'Seat Height': '46 cm',
      'Upholstery': 'KnollTextiles Premium Wool Weave',
      'Frame': 'Tubular Chrome Steel',
      'Weight Capacity': '160 kg'
    },
    reviews: [
      {
        id: 'r23',
        user: 'Elena Long',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'An absolute design icon for the home office. Supports your back during 8-hour work stretches.'
      }
    ]
  },
  {
    id: 23,
    name: 'Annibale Colombo Tailored Lounge Sofa',
    category: 'Workspace',
    price: 49999,
    oldPrice: 58999,
    rating: 4.8,
    stock: 3,
    image: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp'
    ],
    accent: '#c8e6c9',
    description: 'Handcrafted luxury Italian lounge sofa. Features high-resilience memory foam cushions wrapped in channel-quilted textile upholstery, resting atop a kiln-dried solid beechwood frame.',
    highlights: [
      'Solid kiln-dried beechwood internal frame guaranteed for 20 years',
      'Multi-density polyurethane foam core with hypoallergenic down feather topper',
      'Stain-resistant textured weave fabric with removable dry-cleanable covers',
      'Low architectural profile ideal for open-plan studios'
    ],
    specs: {
      'Dimensions': '210cm L x 95cm D x 74cm H',
      'Frame': 'FSC Certified Solid Beechwood',
      'Fabric': 'Italian Textured Linen Weave',
      'Seating Capacity': '3 Persons Comfortably'
    },
    reviews: [
      {
        id: 'r24',
        user: 'Lillian Bishop',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'The cushions have that perfect balance of cloud-like softness with firm underneath support.'
      }
    ]
  },
  {
    id: 24,
    name: 'African Cherry Wood Minimalist Nightstand',
    category: 'Workspace',
    price: 9999,
    oldPrice: 12499,
    rating: 4.7,
    stock: 12,
    image: 'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp'
    ],
    accent: '#d4a373',
    featured: true,
    description: 'Constructed from sustainably sourced African Cherry hardwood, this minimalist table features dovetailed soft-close drawer slides, open display cubby, and a satin beeswax hand-rubbed finish.',
    highlights: [
      '100% Solid African Cherry wood with rich red-amber grain',
      'Traditional English dovetail joinery drawer construction',
      'Soft-close concealed German ball-bearing drawer glides',
      'Recessed rear cable pass-through notch for phone and lamp chargers'
    ],
    specs: {
      'Dimensions': '50cm W x 42cm D x 55cm H',
      'Wood Species': 'African Cherry (Makore)',
      'Finish': 'Natural Beeswax & Linseed Oil',
      'Assembly': 'Fully Assembled'
    },
    reviews: [
      {
        id: 'r25',
        user: 'Liam Smith',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'Wood grain is breathtaking. Drawer slides shut silently with a gentle push.'
      }
    ]
  }
];

export const PRODUCTS_KEY = 'kinetic-products-catalog-v3';

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

    // Migration check: Ensure catalog stays in sync with v3 multi-angle product list
    const needsSync =
      productList.length > parsed.length ||
      parsed.some((p) => !p.images || !Array.isArray(p.images) || p.images.length < 2);

    if (needsSync) {
      const customProducts = parsed.filter(
        (p) => !productList.some((d) => d.id === Number(p.id))
      );
      const merged = [...productList, ...customProducts];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(merged));
      return merged;
    }

    return parsed.map((p, idx) => ({
      ...p,
      id: Number(p.id) || idx + 1,
      name: p.name || 'Untitled Product',
      category: p.category || 'General',
      price: Number(p.price) || 0,
      stock: Number(p.stock) || 0,
      rating: Number(p.rating) || 5.0,
      image: p.image || (p.images && p.images[0]) || '',
      images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image],
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
  const cats = Array.from(new Set(list.map((p) => p.category)));
  return ['All', ...cats];
}

export const categories = ['All', ...Array.from(new Set(productList.map((p) => p.category)))];

export function getProductById(id: number): Product | undefined {
  const list = getAllProducts();
  return list.find((p) => p.id === id);
}

export function searchProducts(query: string, category: string): Product[] {
  const q = query.trim().toLowerCase();
  const list = getAllProducts();
  return list.filter(
    (p) =>
      (category === 'All' || p.category.toLowerCase() === category.toLowerCase()) &&
      (!q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)))
  );
}

export function addProduct(
  product: Omit<Product, 'id' | 'rating' | 'reviews'> & Partial<Pick<Product, 'id' | 'rating' | 'reviews'>>
): Product {
  const list = getAllProducts();
  const nextId = product.id ?? (list.length > 0 ? Math.max(...list.map((p) => p.id)) + 1 : 1);
  const newProduct: Product = {
    ...product,
    id: nextId,
    images: product.images && product.images.length > 0 ? product.images : [product.image],
    rating: product.rating ?? 5.0,
    reviews: product.reviews ?? []
  };
  const updated = [newProduct, ...list];
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  return newProduct;
}

export function updateProduct(product: Product): Product {
  const list = getAllProducts();
  const index = list.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    list[index] = {
      ...product,
      images: product.images && product.images.length > 0 ? product.images : [product.image]
    };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
  }
  return product;
}

export function deleteProduct(id: number): boolean {
  const list = getAllProducts();
  const filtered = list.filter((p) => p.id !== id);
  if (filtered.length !== list.length) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
}

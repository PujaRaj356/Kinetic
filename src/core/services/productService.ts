import { Product } from '../models/product.model';
import { getApiBase } from './apiConfig';

export const productList: Product[] = [
  // ==========================================
  // --- 1. APPAREL & MERCH (7 Items) ---
  // ==========================================
  {
    id: 1,
    name: 'Kinetic Heavyweight Cyber Graphic Merch Tee',
    category: 'Apparel & Merch',
    price: 2499,
    oldPrice: 3199,
    rating: 4.9,
    stock: 45,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/4.webp'
    ],
    accent: '#ff7a5c',
    featured: true,
    description: 'Official Kinetic Studio merch. Custom milled in-house from ultra-heavyweight 280 GSM combed organic cotton. Features dropped streetwear shoulders, thick ribbed collar binding, and high-density screenprinted Kinetic cyber-industrial graphics that never crack.',
    highlights: [
      'Manufactured by Kinetic Studio with 100% pre-shrunk 280 GSM organic cotton',
      'Relaxed boxy streetwear fit with dropped shoulder seams',
      'High-density tactile chest and back graphics in signature cyber orange',
      'Double-needle chainstitched hem and cuffs for lifelong durability'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio (In-House Merch)',
      'Fabric Weight': '280 GSM Heavyweight Jersey',
      'Composition': '100% Combed Organic Cotton',
      'Fit': 'Boxy / Oversized Drop-Shoulder',
      'Care': 'Machine wash cold inside-out'
    },
    reviews: [
      {
        id: 'r-m1',
        user: 'Devansh K.',
        rating: 5,
        date: 'Oct 11, 2026',
        comment: 'The collar and fabric thickness are insane. Easily the best graphic merch tee in my wardrobe.'
      }
    ]
  },
  {
    id: 2,
    name: 'Kinetic Studio Plaid Flannel Over-Shirt',
    category: 'Apparel & Merch',
    price: 3899,
    oldPrice: 4799,
    rating: 4.8,
    stock: 28,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp'
    ],
    accent: '#8bd3ff',
    featured: true,
    description: 'Designed and manufactured by Kinetic Studio. Crafted from custom double-brushed cotton twill flannel in our signature blue-and-charcoal geometric grid. Features dual flap utility chest pockets and custom matte black Kinetic hardware buttons.',
    highlights: [
      'Custom woven by Kinetic with double-brushed heavyweight 320 GSM flannel',
      'Laser-engraved matte black Kinetic branded snap buttons',
      'Dual chest pockets with hidden pencil stall and gusseted seams',
      'Curved scalloped hem engineered for layering over Kinetic hoodies and tees'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Material': '320 GSM Brushed Cotton Flannel',
      'Hardware': 'Custom Matte Black Kinetic Snap Buttons',
      'Pattern': 'Signature Kinetic Blue & Charcoal Grid',
      'Fit': 'Relaxed Over-Shirt Silhouette'
    },
    reviews: [
      {
        id: 'r-m2',
        user: 'Rohan Verma',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'Super warm and heavy. Fits perfectly over the Kinetic graphic tee for cold evening rides.'
      }
    ]
  },
  {
    id: 3,
    name: 'Kinetic Utility Heavyweight Work Flannel',
    category: 'Apparel & Merch',
    price: 3999,
    oldPrice: 4899,
    rating: 4.7,
    stock: 20,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/4.webp'
    ],
    accent: '#ffe5d9',
    description: 'Kinetic workshop flannel shirt constructed for rugged studio work. Features heavy-gauge cotton yarn, reinforced elbow patches, and dual buttoned chest pockets with bar-tack reinforcements.',
    highlights: [
      'Thick brushed cotton yarn with anti-pilling wash',
      'Reinforced double-layered elbow zones for extended studio life',
      'Subtle Kinetic tonal logo embroidery at the left hip',
      'Traditional point collar with sturdy interior interlining'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Fabric': '100% Heavy Brushed Cotton Twill',
      'Weight': '340 GSM',
      'Collar': 'Structured Point Collar',
      'Fit': 'Classic Workwear Fit'
    },
    reviews: [
      {
        id: 'r-m3',
        user: 'Vikram Mehta',
        rating: 5,
        date: 'Oct 07, 2026',
        comment: 'Heavy duty construction! The reinforced elbows are a great practical touch.'
      }
    ]
  },
  {
    id: 4,
    name: 'Kinetic Minimalist Resort Camp-Collar Merch Shirt',
    category: 'Apparel & Merch',
    price: 2999,
    oldPrice: 3599,
    rating: 4.7,
    stock: 32,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/4.webp'
    ],
    accent: '#ffd66b',
    description: 'An architectural summer staple tailored in Kinetic’s micro-atelier. Features a breezy, open Cuban camp collar, relaxed boxy cut, and premium garment-dyed textured weave designed for maximum airflow.',
    highlights: [
      'Bespoke Kinetic breathable linen-cotton textured weave',
      'Camp collar silhouette with concealed under-collar button',
      'Clean French seams throughout with split side vents',
      'Embroidered tonal Kinetic monogram at the lower left hem'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Fabric': '65% Garment-Dyed Cotton, 35% Belgian Linen',
      'Collar': 'Notched Cuban Camp Collar',
      'Buttons': 'Recycled Matte Urea Buttons',
      'Fit': 'Boxy Relaxed'
    },
    reviews: [
      {
        id: 'r-m4',
        user: 'Arjun Das',
        rating: 5,
        date: 'Oct 06, 2026',
        comment: 'The drape and breathability are unbelievable. Essential summer piece.'
      }
    ]
  },
  {
    id: 5,
    name: 'Kinetic Atelier Button-Down Studio Shirt',
    category: 'Apparel & Merch',
    price: 3499,
    rating: 4.6,
    stock: 18,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/4.webp'
    ],
    accent: '#d4a373',
    description: 'A sharp, tailored silhouette crafted for creative directors and studio presentations. Woven with high-twist combed cotton yarns in a monochrome micro-check weave with clean hidden placket.',
    highlights: [
      'High-twist crisp poplin cotton weave resists creasing',
      'Structured button-down collar keeps its shape without tie',
      'Curved ergonomic sleeves allow unrestricted typing mobility',
      'Tonal engraved Kinetic hardware'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Material': '100% Combed Poplin Cotton',
      'Fit': 'Tailored Modern Fit',
      'Cuff': 'Adjustable Two-Button Barrel Cuff'
    },
    reviews: [
      {
        id: 'r-m5',
        user: 'Kunal Sen',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'Crisp and sharp. Looks amazing paired with Kinetic tech trousers.'
      }
    ]
  },
  {
    id: 6,
    name: 'Kinetic Minimalist Charcoal Studio Tunic Dress',
    category: 'Apparel & Merch',
    price: 4499,
    oldPrice: 5499,
    rating: 4.8,
    stock: 16,
    image: 'https://cdn.dummyjson.com/product-images/tops/gray-dress/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/tops/gray-dress/1.webp',
      'https://cdn.dummyjson.com/product-images/tops/gray-dress/2.webp',
      'https://cdn.dummyjson.com/product-images/tops/gray-dress/3.webp',
      'https://cdn.dummyjson.com/product-images/tops/gray-dress/4.webp'
    ],
    accent: '#b8c0ff',
    featured: true,
    description: 'An architectural everyday silhouette cut from heavyweight heathered charcoal modal jersey. Features a fluid draped hemline, clean crew neck, and deep concealed side seam pockets.',
    highlights: [
      'Custom woven heavy modal jersey with liquid drape and zero cling',
      'Concealed deep side pockets hold phone and essentials securely',
      'Heat-set neck binding that never stretches out',
      'Embroidered mini Kinetic emblem at nape of neck'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Fabric': 'Modal & Spandex Comfort Knit',
      'Length': 'Midi Architectural Cut',
      'Pockets': 'Dual Deep In-Seam Pockets'
    },
    reviews: [
      {
        id: 'r-m6',
        user: 'Elena Long',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'Minimalist perfection! The fabric has substantial weight and moves gracefully.'
      }
    ]
  },
  {
    id: 7,
    name: 'Kinetic Geometric Grid Studio Slip Dress',
    category: 'Apparel & Merch',
    price: 4199,
    rating: 4.7,
    stock: 14,
    image: 'https://cdn.dummyjson.com/product-images/tops/tartan-dress/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/tops/tartan-dress/1.webp',
      'https://cdn.dummyjson.com/product-images/tops/tartan-dress/2.webp',
      'https://cdn.dummyjson.com/product-images/tops/tartan-dress/3.webp',
      'https://cdn.dummyjson.com/product-images/tops/tartan-dress/4.webp'
    ],
    accent: '#ffb7d5',
    description: 'Neo-brutalist geometric check dress featuring adjustable studio webbing straps, side zipper closure, and reinforced structured bodice designed for layering over Kinetic tees and under over-shirts.',
    highlights: [
      'Architectural geometric tartan print designed in-house',
      'Industrial webbing shoulder straps with matte metal sliders',
      'Structured bodice with clean princess seams',
      'Side slit allows free natural movement'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Fabric': 'Structured Poly-Viscose Suiting Twill',
      'Closure': 'Concealed YKK Side Zip',
      'Straps': 'Adjustable Webbing Hardware'
    },
    reviews: [
      {
        id: 'r-m7',
        user: 'Pooja R.',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'Pairs incredibly well with chunky boots or sneakers. Love the brutalist straps.'
      }
    ]
  },

  // ==========================================
  // --- 2. FOOTWEAR (6 Items) ---
  // ==========================================
  {
    id: 8,
    name: 'Kinetic Aero-Pulse Low-Top Court Trainers',
    category: 'Footwear',
    price: 6499,
    oldPrice: 7999,
    rating: 4.8,
    stock: 24,
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/4.webp'
    ],
    accent: '#ff7a5c',
    featured: true,
    description: 'Engineered and manufactured by Kinetic Footwear Labs. Features off-white full-grain leather panels accented with vibrant scarlet overlays, encapsulated Kinetic-Pulsion heel cushioning, and reinforced cupsole construction.',
    highlights: [
      'Kinetic premium leather and perforated toe paneling for airflow',
      'Encapsulated Kinetic-Pulsion air core in heel absorbs street impact',
      'High-grip vulcanized rubber outsole with multi-directional pivot tread',
      'Padded tongue and contoured arch support insole'
    ],
    specs: {
      'Manufacturer': 'Kinetic Footwear Labs',
      'Upper': 'Full-Grain Leather & Breathable Suede',
      'Midsole': 'Kinetic-Pulsion Cushioned Core',
      'Outsole': 'Non-Marking Vulcanized Rubber',
      'Closure': '7-Eyelet Flat Weave Lace-Up'
    },
    reviews: [
      {
        id: 'r-f1',
        user: 'Aarav Sharma',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'The build quality is incredible! Looks even better in person with great leather texture.'
      }
    ]
  },
  {
    id: 9,
    name: 'Kinetic Orbit Chunky Studio Runner',
    category: 'Footwear',
    price: 5999,
    oldPrice: 7499,
    rating: 4.7,
    stock: 20,
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/2.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/3.webp',
      'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/4.webp'
    ],
    accent: '#d7ff4f',
    featured: true,
    description: 'Chunky architectural runner sculpted with exaggerated sculpted EVA foam midsoles and high-contrast color blocking. Built by Kinetic Labs for ultra-plush cloud-like cushioning throughout long urban commutes.',
    highlights: [
      'Exaggerated sculpted Kinetic dual-density EVA midsole',
      'Ripstop nylon and synthetic suede abrasion-resistant overlays',
      'Deep groove flex outsole bends naturally with your foot strike',
      'Reflective heel pull tab for low-light city visibility'
    ],
    specs: {
      'Manufacturer': 'Kinetic Footwear Labs',
      'Midsole': 'Dual-Density Sculpted Kinetic-EVA',
      'Upper': 'Ripstop & Technical Suede',
      'Weight': '310g',
      'Heel Drop': '10mm Ergonomic Drop'
    },
    reviews: [
      {
        id: 'r-f2',
        user: 'Hazel Evans',
        rating: 5,
        date: 'Oct 05, 2026',
        comment: 'So comfortable! The sculpted sole absorbs all sidewalk shock effortlessly.'
      }
    ]
  },
  {
    id: 10,
    name: 'Kinetic Velocity-01 Retro Urban Trainers',
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
    description: 'Designed and manufactured in-house by Kinetic Footwear Labs. Combines ultra-lightweight ripstop nylon, buttery suede overlays, and our shock-dissipating studded outsole for effortless all-day city commuting.',
    highlights: [
      'In-house Kinetic hybrid construction: ballistic nylon & suede overlays',
      'Kinetic-Foam midsole provides 42% higher energy return',
      'Low-profile studded rubber outsole for wet pavement traction',
      'Antibacterial mesh insole prevents moisture and odor buildup'
    ],
    specs: {
      'Manufacturer': 'Kinetic Footwear Labs',
      'Upper': 'Ballistic Nylon & Suede Leather',
      'Midsole': 'Proprietary Kinetic-Foam Midsole',
      'Outsole': 'Multi-Studded Anti-Slip Rubber',
      'Weight': '275g'
    },
    reviews: [
      {
        id: 'r-f3',
        user: 'Vikram Mehta',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'Amazingly light! Walked 15,000 steps on day one without foot fatigue.'
      }
    ]
  },
  {
    id: 11,
    name: 'Kinetic Field-Grip Athletic Turf Cleats',
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
    description: 'Engineered for explosive acceleration and lateral cutting by Kinetic Performance Engineering. Features molded TPU traction studs, abrasion-resistant toe shields, and responsive dual-density sole plate.',
    highlights: [
      'Kinetic TPU stud configuration for instantaneous turf grip and release',
      'Drag-resistant composite toe cap survives intense drag and turf friction',
      'Phylon-dampened footbed reduces stud pressure on the soles of feet',
      'Asymmetrical lace routing eliminates instep pinch'
    ],
    specs: {
      'Manufacturer': 'Kinetic Performance Engineering',
      'Surface': 'Firm Turf / Natural Field',
      'Studs': 'Molded High-Density TPU',
      'Cushioning': 'Dual-Density Midsole',
      'Closure': 'Asymmetrical Speed Lace'
    },
    reviews: [
      {
        id: 'r-f4',
        user: 'Aaron Cook',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'Great lock-down feel around the ankles. Studs bite into wet grass without slipping.'
      }
    ]
  },
  {
    id: 12,
    name: 'Kinetic Minimalist Studio Slide Sandals',
    category: 'Footwear',
    price: 2199,
    rating: 4.8,
    stock: 35,
    image: 'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/3.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/4.webp'
    ],
    accent: '#d4a373',
    description: 'Contoured ergonomic slide sandals crafted with supple bridle leather straps and shock-absorbing cork-EVA footbed. The ultimate recovery footwear for relaxing around the studio.',
    highlights: [
      'Deep heel cup and anatomical arch support conform to foot contours',
      'Dual-tone vegetable tanned leather straps with soft microfiber underlay',
      'Lightweight shock-absorbing EVA bottom sole',
      'Heat-embossed Kinetic studio crest on footbed'
    ],
    specs: {
      'Manufacturer': 'Kinetic Footwear Labs',
      'Footbed': 'Anatomical Cork & Bio-Foam',
      'Straps': 'Genuine Leather with Soft Lining',
      'Sole': 'Wave-Tread EVA'
    },
    reviews: [
      {
        id: 'r-f5',
        user: 'Devika Nair',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'My go-to daily slides in the studio. Arch support is remarkably comfortable.'
      }
    ]
  },
  {
    id: 13,
    name: 'Kinetic Architectural Stiletto Evening Shoes',
    category: 'Footwear',
    price: 7999,
    oldPrice: 9499,
    rating: 4.9,
    stock: 12,
    image: 'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/3.webp',
      'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/4.webp'
    ],
    accent: '#ffe5d9',
    description: 'Sculptural luxury footwear from Kinetic Atelier. Engineered with a balanced steel-core stiletto heel, butter-soft Italian lambskin leather lining, and high-shine patent upper designed for gala openings and runway evenings.',
    highlights: [
      'Internal tempered steel shank provides unwavering arch stability',
      'Padded memory foam forefoot pad prevents pressure point soreness',
      'Ultra-glossy finish crafted in Kinetic’s footwear workshop',
      'Clean architectural pointed toe profile'
    ],
    specs: {
      'Manufacturer': 'Kinetic Atelier',
      'Heel Height': '90 mm Architectural Stiletto',
      'Lining': '100% Italian Lambskin Leather',
      'Sole': 'Polished Leather with Anti-Slip Inset'
    },
    reviews: [
      {
        id: 'r-f6',
        user: 'Natasha Bose',
        rating: 5,
        date: 'Sept 26, 2026',
        comment: 'Astonishing balance for high heels! Wore them for 5 hours at an art opening effortlessly.'
      }
    ]
  },

  // ==========================================
  // --- 3. HARDWARE & COMPUTING (6 Items) ---
  // ==========================================
  {
    id: 14,
    name: 'Kinetic Book Studio 14" Aluminum Ultrabook',
    category: 'Tech',
    price: 129999,
    oldPrice: 144999,
    rating: 4.9,
    stock: 10,
    image: 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp'
    ],
    accent: '#b5f6d2',
    featured: true,
    description: 'Engineered and manufactured by Kinetic Hardware Labs. Carved from a single CNC block of aerospace aluminum. Features a 3K 90Hz FullView 3:2 touchscreen display, quad-speaker surround sound, and all-day battery life for software engineering and creative work.',
    highlights: [
      'Manufactured by Kinetic with 100% CNC anodized unibody aluminum',
      '14.2" 3K FullView Touchscreen (3120 x 2080) with 3:2 productivity ratio',
      'High-bandwidth 16GB LPDDR5 RAM with 1TB NVMe PCIe 4.0 storage',
      'Concealed pop-up camera hardware switch and quad studio microphones'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Display': '14.2" 3K LTPS Touchscreen (3120 x 2080, 500 nits)',
      'Processor': '12-Core Kinetic High-Performance Processor',
      'RAM': '16GB LPDDR5 Dual-Channel',
      'Storage': '1TB NVMe PCIe 4.0 SSD',
      'Weight': '1.38 kg'
    },
    reviews: [
      {
        id: 'r-h1',
        user: 'Hazel Evans',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'The 3:2 aspect ratio screen is a developer dream. Keyboard feel and CNC chassis are impeccable.'
      }
    ]
  },
  {
    id: 15,
    name: 'Kinetic Flex 2-in-1 Convertible Studio Laptop',
    category: 'Tech',
    price: 119999,
    oldPrice: 134999,
    rating: 4.8,
    stock: 8,
    image: 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp'
    ],
    accent: '#ffd66b',
    description: 'An architectural 360° convertible machine engineered by Kinetic. Features our custom watchband-style multi-gear hinge that rotates effortlessly from laptop to easel to digital sketch tablet with zero wobble.',
    highlights: [
      'Kinetic bespoke multi-gear watchband hinge crafted from 813 mechanical components',
      '4K UHD borderless IPS touchscreen with active stylus pen support (4096 levels)',
      'JBL soundbar integrated directly into the rotating hinge axis',
      'Far-field voice microphones with instant biometric fingerprint wake'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Display': '13.9" 4K UHD IPS Multi-Touch (3840 x 2160)',
      'Hinge': '360° Rotating Kinetic Multi-Gear Mechanism',
      'RAM': '16GB DDR4',
      'Storage': '512GB NVMe SSD',
      'Stylus': 'Kinetic Precision Active Pen Included'
    },
    reviews: [
      {
        id: 'r-h2',
        user: 'Aditya Roy',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'The watchband hinge is a work of mechanical art. Drawing directly on the 4K panel is silky smooth.'
      }
    ]
  },
  {
    id: 16,
    name: 'Kinetic UltraBook Infinity-13 Borderless Laptop',
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
    description: 'A benchmark in ultra-portable computing from Kinetic Hardware Labs. Carved from a solid billet of aerospace aluminum with composite carbon-fiber wrist rests and a 4-sided edge-to-edge 16:10 borderless display.',
    highlights: [
      'Engineered by Kinetic with 4-sided Infinity 16:10 borderless screen',
      'CNC machined aluminum shell with aerospace carbon fiber composite interior',
      'Precision edge-to-edge magnetic keyboard with glass multi-touch trackpad',
      'Dual hidden vapor-chamber cooling vents keep performance peak without throttling'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Display': '13.4" FHD+ (1920 x 1200) Anti-Glare 500 nits',
      'CPU': '10-Core High Efficiency Performance Processor',
      'RAM': '16GB LPDDR5 Dual-Channel',
      'Storage': '512GB PCIe Gen4 SSD',
      'Weight': '1.2 kg'
    },
    reviews: [
      {
        id: 'r-h3',
        user: 'Alice Smith',
        rating: 5,
        date: 'Sept 24, 2026',
        comment: 'The carbon fiber wrist rest is so comfortable to type on. Ultra light to carry in my commuter backpack.'
      }
    ]
  },
  {
    id: 17,
    name: 'Kinetic DuoScreen Pro Dual-Display Workstation',
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
    description: 'A revolutionary creative powerhouse developed by Kinetic Labs. Features dual full-width interactive displays with an auto-tilting secondary Kinetic ScreenPad Plus that enhances ergonomics and increases cooling airflow by 38%.',
    highlights: [
      'Kinetic dual-display architecture with auto-tilting 12.7" secondary screen',
      'Primary 14.5" 2.8K 120Hz OLED display with cinema-grade 100% DCI-P3 color',
      'Integrated active digitizer support with 4096 pressure levels',
      'Dual-fan AAS Ultra thermal cooling exhaust'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Primary Screen': '14.5" 2.8K 120Hz OLED Touchscreen',
      'Secondary Screen': '12.7" Kinetic ScreenPad Plus IPS',
      'RAM': '32GB LPDDR5',
      'Storage': '1TB NVMe High-Speed SSD',
      'Graphics': 'Dedicated Studio RTX GPU'
    },
    reviews: [
      {
        id: 'r-h4',
        user: 'Zoe Bennett',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'Having timeline controls and reference documents open on the bottom screen while editing 4K footage is a revelation.'
      }
    ]
  },
  {
    id: 18,
    name: 'Kinetic Slate Pro 12.4" Creative Tablet',
    category: 'Tech',
    price: 74999,
    oldPrice: 84999,
    rating: 4.8,
    stock: 14,
    image: 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/3.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/4.webp'
    ],
    accent: '#a8dadc',
    description: 'Cinematic digital canvas engineered by Kinetic. Features a 12.4" 120Hz Super AMOLED display, ultra-low latency magnetic stylus charging slot, quad AKG-tuned stereo speakers, and ultra-wide front video calling camera.',
    highlights: [
      '12.4" Super AMOLED (2800 x 1752) 120Hz display with true infinite contrast',
      'Kinetic S-Stylus with 2.8ms pen latency writes just like pen on paper',
      'Armor aluminum unibody resists bending and corner drops',
      '10,090 mAh battery with 45W ultra-fast charging support'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Display': '12.4" Super AMOLED (120Hz, HDR10+)',
      'Memory': '8GB RAM + 256GB Storage (MicroSD expandable)',
      'Battery': '10,090 mAh Li-Po',
      'Weight': '567g'
    },
    reviews: [
      {
        id: 'r-h5',
        user: 'Rahul Iyer',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'The AMOLED screen makes reading schematics and digital illustration an absolute joy.'
      }
    ]
  },
  {
    id: 19,
    name: 'Kinetic Canvas Studio Digital Tablet',
    category: 'Tech',
    price: 49999,
    rating: 4.7,
    stock: 18,
    image: 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/2.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/3.webp',
      'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/4.webp'
    ],
    accent: '#fff59d',
    description: 'Lightweight creative companion tablet with matte white ceramic-feel backplate, vibrant high-res screen, dual stereo speakers, and seamless multi-window multitasking interface for on-the-go sketching and reading.',
    highlights: [
      'Ceramic white finish resists smudges and finger oils',
      'Split-screen tri-window multitasking workflow',
      'Dual stereo speakers with Dolby Atmos spatial staging',
      'Supports wireless keyboard cover pairing'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Display': '11.0" WQXGA IPS Screen (2560 x 1600)',
      'Processor': 'Octa-Core Kinetic Tablet SoC',
      'Storage': '128GB High-Speed Flash',
      'Weight': '498g'
    },
    reviews: [
      {
        id: 'r-h6',
        user: 'Ananya Sen',
        rating: 5,
        date: 'Sept 25, 2026',
        comment: 'Extremely lightweight and portable. Battery easily lasts 2 full days of note taking.'
      }
    ]
  },

  // ==========================================
  // --- 4. SMARTPHONES & MOBILE (6 Items) ---
  // ==========================================
  {
    id: 20,
    name: 'Kinetic Galaxy Horizon OLED Smartphone',
    category: 'Smartphones',
    price: 54999,
    oldPrice: 62999,
    rating: 4.8,
    stock: 18,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/3.webp'
    ],
    accent: '#e9ecef',
    featured: true,
    description: 'Designed and manufactured by Kinetic Mobile Labs. Features a curved Dynamic AMOLED cinematic infinity display, ultrasonic in-display biometric sensor, triple rear pro-grade cameras with ultra-wide landscape framing, and reverse wireless power sharing.',
    highlights: [
      'Dynamic AMOLED curved infinity display with HDR10+ certification',
      'Ultrasonic 3D fingerprint scanner embedded directly under the glass',
      'Triple studio cameras (12MP Wide, 12MP Telephoto, 16MP Ultra-Wide)',
      'Reverse Wireless PowerShare charges other Kinetic devices on back of phone'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Display': '6.1" Dynamic AMOLED Quad HD+ (3040 x 1440)',
      'RAM & Storage': '8GB RAM + 128GB Storage',
      'Protection': 'Corning Gorilla Glass 6 & IP68 Water Resistance',
      'Weight': '157g'
    },
    reviews: [
      {
        id: 'r-p1',
        user: 'Christian Perez',
        rating: 5,
        date: 'Oct 05, 2026',
        comment: 'The curved glass feel in hand is unmatched. Ultrasonic scanner unlocks instantly even with wet fingers.'
      }
    ]
  },
  {
    id: 21,
    name: 'Kinetic Prism Curve AMOLED Smartphone',
    category: 'Smartphones',
    price: 42999,
    oldPrice: 48999,
    rating: 4.7,
    stock: 15,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/3.webp'
    ],
    accent: '#a8dadc',
    description: 'Pioneering ergonomic curved industrial design by Kinetic. Dual-curved symmetrical glass panels melt into a polished metal center frame, delivering an edge-to-edge bezel-less viewing experience that fits comfortably in one hand.',
    highlights: [
      'Ergonomic dual-edge curved glass front and back',
      'Super AMOLED Quad HD+ display with high contrast night mode',
      'Dual-Pixel camera sensor captures crisp shots in low-light environments',
      'Fast wireless charging and IP68 dust/water submersion rating'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Display': '5.8" Super AMOLED (2960 x 1440)',
      'Camera': '12MP Dual-Pixel f/1.7 OIS',
      'Audio': '3.5mm Headphone Jack + Hi-Res DAC',
      'Weight': '155g'
    },
    reviews: [
      {
        id: 'r-p2',
        user: 'Deepak Rao',
        rating: 5,
        date: 'Sept 28, 2026',
        comment: 'The physical in-hand ergonomics are the best ever made. Gorgeous screen.'
      }
    ]
  },
  {
    id: 22,
    name: 'Kinetic CyberPhone Quad-Optic 64MP',
    category: 'Smartphones',
    price: 32999,
    oldPrice: 38999,
    rating: 4.8,
    stock: 22,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/3.webp'
    ],
    accent: '#b8c0ff',
    featured: true,
    description: 'Engineered for high-resolution photography. Features a 64MP ultra-high clarity primary quad camera array, hyperbola 3D curved glass back with light-refracting textures, and VOOC Flash Charge that powers to 50% in 30 minutes.',
    highlights: [
      '64MP Quad Studio Cameras with 4cm Super Macro lens and portrait bokeh',
      'Hyperbola 3D light-streaking curved glass back in Kinetic Pearl Blue',
      'Super AMOLED display with integrated 0.34s optical fingerprint sensor',
      'Snapdragon high-speed gaming engine with vapor-cooling gel'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Primary Camera': '64MP Samsung GW1 Sensor + 8MP Ultra-Wide + 2MP Macro',
      'Screen': '6.4" Super AMOLED FHD+ (2340 x 1080)',
      'Charging': '20W VOOC 3.0 Flash Charge Included',
      'Battery': '4000 mAh'
    },
    reviews: [
      {
        id: 'r-p3',
        user: 'Rohit K.',
        rating: 5,
        date: 'Oct 03, 2026',
        comment: 'The 64MP detail is mind blowing when zooming in. Fantastic value.'
      }
    ]
  },
  {
    id: 23,
    name: 'Kinetic Stealth Pop-Up FullView Smartphone',
    category: 'Smartphones',
    price: 29999,
    rating: 4.7,
    stock: 19,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-x/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-x/3.webp'
    ],
    accent: '#ffb7d5',
    description: 'Zero notches, zero punch-holes. Features a motorized pop-up motorized selfie camera that rises in 0.74 seconds with built-in fall detection, providing an uninterrupted 91.2% screen-to-body panoramic display.',
    highlights: [
      'Motorized mechanical pop-up front camera with sapphire lens cover',
      'True Notch-less 6.53" Super AMOLED Panoramic screen',
      '48MP Sony IMX586 primary camera with Nightscape computational AI',
      'Dolby Atmos spatial sound with dual smart PA power amplifiers'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Front Camera': '16MP Elevating Pop-Up Camera with Fall Auto-Retract',
      'Display': '6.53" True Full-Screen AMOLED (No Notch)',
      'Biometrics': 'In-Display Optical Fingerprint Scanner',
      'Battery': '3765 mAh Fast Charge'
    },
    reviews: [
      {
        id: 'r-p4',
        user: 'Simran Walia',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'Having zero hole or notch on the display makes watching full-screen movies breathtaking.'
      }
    ]
  },
  {
    id: 24,
    name: 'Kinetic Aura Gradient AMOLED Smartphone',
    category: 'Smartphones',
    price: 26999,
    oldPrice: 31999,
    rating: 4.6,
    stock: 25,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/3.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/4.webp'
    ],
    accent: '#c9a7ff',
    description: '3D gradient condensation light finish shifting between astral violet and cyan. Built with a 6.4" waterdrop AMOLED display and AI dual-sensor portrait cameras that deliver studio-grade depth and bokeh.',
    highlights: [
      '3D light condensation gradient chassis shifts colors under ambient lighting',
      'Hidden in-display fingerprint sensor beneath AMOLED glass',
      '25MP AI Beautify front-facing portrait camera with 3D modeling',
      'Snapdragon AIE multi-core processor for lag-free gaming'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Display': '6.4" Waterdrop AMOLED (2340 x 1080)',
      'Front Camera': '25MP AI HDR Sensor',
      'Rear Camera': '16MP + 2MP Depth Array',
      'RAM': '6GB + 64GB Expandable'
    },
    reviews: [
      {
        id: 'r-p5',
        user: 'Manoj Kumar',
        rating: 5,
        date: 'Sept 19, 2026',
        comment: 'The gradient color on the back turns heads every time I pull it out.'
      }
    ]
  },
  {
    id: 25,
    name: 'Kinetic Fluid 5G Studio Smartphone',
    category: 'Smartphones',
    price: 36999,
    oldPrice: 42999,
    rating: 4.8,
    stock: 16,
    image: 'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/3.webp'
    ],
    accent: '#ffd66b',
    description: 'Ultra-slim 7.8mm architectural profile with 50W Flash Charge technology and dual-view video recording that records simultaneously from front and rear cameras for creative vloggers.',
    highlights: [
      'Ultra-thin 7.8mm body weighing only 172g for featherlight pocket carry',
      '50W Flash Charge delivers 3.5 hours of talk time in just 5 minutes',
      'Dual-View Video mode captures reaction and scene simultaneously',
      '5G Seamless Link ensures zero stutter during cloud gaming'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Network': 'Dual 5G Standalone Architecture',
      'Display': '6.43" Punch-Hole Super AMOLED',
      'Camera': '48MP AI Quad Camera System',
      'Thickness': '7.8 mm Ultra-Slim'
    },
    reviews: [
      {
        id: 'r-p6',
        user: 'Tara Mehta',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'Charging is outrageously fast. The dual video recording mode is great for filming unboxings.'
      }
    ]
  },

  // ==========================================
  // --- 5. HOROLOGY & WATCHES (5 Items) ---
  // ==========================================
  {
    id: 26,
    name: 'Kinetic Ingenieur Industrial Steel Automatic Watch',
    category: 'Horology',
    price: 68999,
    oldPrice: 79999,
    rating: 4.9,
    stock: 6,
    image: 'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/3.webp'
    ],
    accent: '#a8dadc',
    featured: true,
    description: 'An icon of brutalist industrial horology crafted in Kinetic’s master atelier. Features a solid 316L steel integrated bracelet, geometric grid-textured dial, five polygonal bezel screws, and a soft-iron inner case that shields the mechanical movement from magnetic fields.',
    highlights: [
      'Crafted by Kinetic Atelier with integrated sculptural steel bracelet and butterfly clasp',
      'Soft-iron inner case protects mechanical caliber from studio magnetic fields up to 40,000 A/m',
      'Distinctive geometric grid embossed dial with luminescent baton indices',
      'Double-sided anti-reflective sapphire crystal with screw-down crown'
    ],
    specs: {
      'Manufacturer': 'Kinetic Horology Atelier',
      'Case Diameter': '40 mm',
      'Case & Bracelet': 'Solid 316L Brushed Steel with Polished Chamfers',
      'Movement': 'Kinetic Automatic Calibre K-32111 (120h Power Reserve)',
      'Water Resistance': '100 meters / 10 ATM',
      'Anti-Magnetic': 'Internal Soft-Iron Faraday Cage'
    },
    reviews: [
      {
        id: 'r-w1',
        user: 'Leo Rivera',
        rating: 5,
        date: 'Oct 06, 2026',
        comment: 'The integrated steel bracelet catches the light like liquid silver. Outstanding industrial design.'
      }
    ]
  },
  {
    id: 27,
    name: 'Kinetic Heritage Barleycorn Mechanical Chronometer',
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
    featured: true,
    description: 'An homage to classic horology from Kinetic Studio. Features a silver guilloche barleycorn dial texture, heat-blued hands, painted Arabic numerals, and transparent exhibition caseback revealing Kinetic’s decorated mechanical balance wheel.',
    highlights: [
      'Guilloche barleycorn engraved dial with thermally blued steel hands',
      'Exhibition sapphire caseback displays Geneva stripes on rotor',
      'Automatic self-winding caliber beating at 28,800 vibrations/hour',
      'Supple brown leather strap with triple folding safety deployment clasp'
    ],
    specs: {
      'Manufacturer': 'Kinetic Horology Atelier',
      'Case Diameter': '40 mm',
      'Dial': 'Silver "Barleycorn" Guilloche with Blued Hands',
      'Movement': 'Kinetic Automatic Calibre K-888',
      'Power Reserve': '72 Hours',
      'Glass': 'Scratch-resistant Sapphire'
    },
    reviews: [
      {
        id: 'r-w2',
        user: 'Nathan Reed',
        rating: 5,
        date: 'Sept 19, 2026',
        comment: 'The blued steel hands against the barleycorn textured dial look sublime when catching light.'
      }
    ]
  },
  {
    id: 28,
    name: 'Kinetic Vintage Hand-Stitched Leather Field Watch',
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
    description: 'Everyday gentleman field watch from Kinetic Goods. Features a warm sunray dial, quick-set date calendar, coin-edge crown, and thick vegetable-tanned hand-stitched leather strap that patinas richly over years of daily wear.',
    highlights: [
      'Vegetable-tanned full-grain leather strap with reinforced wax stitching',
      'Polished 316L stainless steel case with coin-edge crown',
      'Hardened mineral crystal with anti-glare undercoating',
      'High-precision quartz movement accurate to ±10 seconds/month'
    ],
    specs: {
      'Manufacturer': 'Kinetic Goods & Horology',
      'Case Size': '42 mm',
      'Strap Width': '22 mm Hand-Stitched Leather',
      'Movement': 'High-Precision Quartz Movement',
      'Battery Life': '3 Years',
      'Water Resistance': '30 meters / 3 ATM'
    },
    reviews: [
      {
        id: 'r-w3',
        user: 'David Martinez',
        rating: 5,
        date: 'Sept 26, 2026',
        comment: 'The leather band broke in after two days and is super supple now. Great daily beater watch.'
      }
    ]
  },
  {
    id: 29,
    name: 'Kinetic Minimalist Sunburst Gold Mesh Watch',
    category: 'Horology',
    price: 11999,
    oldPrice: 14499,
    rating: 4.8,
    stock: 14,
    image: 'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/3.webp'
    ],
    accent: '#ffd166',
    description: 'Refined modern luxury timepiece. Features a radiant champagne sunburst dial, ultra-slim 6.8mm profile, faceted crystal glass, and fluid Milanese gold mesh strap with adjustable slider clasp.',
    highlights: [
      'Ultra-thin 6.8mm profile slides under cuff with zero bulk',
      'Fluid woven Milanese stainless steel mesh strap electroplated in warm gold',
      'Sunburst dial with polished baton hour indicators',
      'Water resistant to 30 meters'
    ],
    specs: {
      'Manufacturer': 'Kinetic Horology Atelier',
      'Case Diameter': '36 mm',
      'Thickness': '6.8 mm Ultra-Slim Profile',
      'Strap': 'Gold Electroplated Milanese Stainless Mesh',
      'Movement': 'Japanese Slim Quartz Calibre'
    },
    reviews: [
      {
        id: 'r-w4',
        user: 'Sanya Gupta',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'The sunburst dial and fluid gold mesh bracelet are stunning with evening wear.'
      }
    ]
  },
  {
    id: 30,
    name: 'Kinetic Petite Ceramic Minimalist Watch',
    category: 'Horology',
    price: 8499,
    rating: 4.7,
    stock: 16,
    image: 'https://cdn.dummyjson.com/product-images/womens-watches/women\'s-wrist-watch/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-watches/women\'s-wrist-watch/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/women\'s-wrist-watch/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-watches/women\'s-wrist-watch/3.webp'
    ],
    accent: '#ffe5d9',
    description: 'Understated elegance crafted for quiet luxury. Features a clean stark white enamel dial, crystal-accented bezel ring, and ceramic-touch composite links with hypoallergenic folding clasp.',
    highlights: [
      'Pure minimalist dial with mirror-polished silver hands',
      'High-gloss ceramic-feel scratch-resistant link bracelet',
      'Hardened mineral crystal with anti-scratch coating',
      'Reliable Japanese quartz movement'
    ],
    specs: {
      'Manufacturer': 'Kinetic Horology Atelier',
      'Case Diameter': '32 mm',
      'Strap': 'Ceramic-Touch Composite Bracelet',
      'Clasp': 'Stainless Steel Push-Button Foldover',
      'Water Resistance': '30 meters'
    },
    reviews: [
      {
        id: 'r-w5',
        user: 'Kavita Menon',
        rating: 5,
        date: 'Sept 20, 2026',
        comment: 'Delicate yet robust. The white ceramic links stay cool to the touch all day.'
      }
    ]
  },

  // ==========================================
  // --- 6. EYEWEAR (5 Items) ---
  // ==========================================
  {
    id: 31,
    name: 'Kinetic Stealth Onyx Polarized Sunglasses',
    category: 'Eyewear',
    price: 2699,
    oldPrice: 3399,
    rating: 4.8,
    stock: 22,
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/2.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/3.webp'
    ],
    accent: '#a8dadc',
    featured: true,
    description: 'Blackout architectural eyewear handcrafted by Kinetic Optics. Features deep piano-black cellulose acetate frames, dark TAC polarized lenses that cut road glare by 99%, and reinforced 5-barrel barrel hinges.',
    highlights: [
      'High-density piano black Italian Mazzucchelli acetate',
      'TAC polarized Category 3 lenses with anti-reflective back-coating',
      'Stainless steel wire temple cores allow optician tailoring',
      'Laser-etched Kinetic typography on interior left arm'
    ],
    specs: {
      'Manufacturer': 'Kinetic Optics Studio',
      'Frame Width': '144 mm',
      'Lens Width': '54 mm',
      'Bridge': '18 mm',
      'UV Protection': '100% UV400 Filtering'
    },
    reviews: [
      {
        id: 'r-e1',
        user: 'Zaid Khan',
        rating: 5,
        date: 'Oct 07, 2026',
        comment: 'Total blackout privacy with crisp, high-definition optical clarity.'
      }
    ]
  },
  {
    id: 32,
    name: 'Kinetic Zero-01 Polarized Minimalist UV Shades',
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
    description: 'Designed and manufactured in-house by Kinetic Optics. Features hand-polished plant-based cellulose acetate frames and Triacetate Cellulose (TAC) polarized lenses with 100% UV400 radiation protection.',
    highlights: [
      'Handcrafted by Kinetic Optics with organic Mazzucchelli acetate',
      'TAC polarized Category 3 lenses eliminate harsh road and water reflections',
      '5-barrel stainless steel hinges with teflon-coated screws',
      'Includes rigid collapsible faux-leather Kinetic protective case'
    ],
    specs: {
      'Manufacturer': 'Kinetic Optics Studio',
      'Frame Width': '142 mm',
      'Lens Width': '52 mm',
      'Bridge': '19 mm',
      'Lens Tint': 'Neutral Smoke Grey (Category 3)',
      'UV Block': '100% UVA & UVB (UV400 Certified)'
    },
    reviews: [
      {
        id: 'r-e2',
        user: 'Julian James',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'High optical clarity without any chromatic distortion. Frame has good substantial weight.'
      }
    ]
  },
  {
    id: 33,
    name: 'Kinetic CyberFrame Two-Tone Geometric Acetate Shades',
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
    description: 'Brutalist architectural silhouette sculpted by Kinetic Optics. Combines bold emerald green and matte black Italian acetate layers with dark high-contrast lenses for maximum attitude and visual shielding.',
    highlights: [
      'Beveled cyber-architectural faceted front frame',
      'High-contrast Category 3 hydrophobic and anti-scratch coated lenses',
      'Reinforced interior temple wire cores for custom adjustment by opticians',
      'Laser-engraved Kinetic monogram on left temple'
    ],
    specs: {
      'Manufacturer': 'Kinetic Optics Studio',
      'Material': 'Dual-Tone Hand-Layered Acetate',
      'Lens Coating': 'Anti-Reflective & Hydrophobic Oleophobic',
      'Gender': 'Unisex Brutalist Fit',
      'Weight': '38g'
    },
    reviews: [
      {
        id: 'r-e3',
        user: 'Victoria McDonald',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'Unique angular shape! Constantly get asked where I got them.'
      }
    ]
  },
  {
    id: 34,
    name: 'Kinetic Neon Wave Festival Shield Shades',
    category: 'Eyewear',
    price: 2199,
    rating: 4.6,
    stock: 30,
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/2.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/3.webp'
    ],
    accent: '#ffd166',
    description: 'Futuristic frameless visor shield sunglasses featuring gradient mirror lenses, integrated nose bridge pads, and aerodynamic wrap-around profile made for rooftop raves and open-air summer concerts.',
    highlights: [
      'One-piece wrap-around continuous panoramic shield lens',
      'Rainbow iridescent mirror coating that shifts under festival lights',
      'Ultra-lightweight shatterproof polycarbonate construction',
      'Zero-pinch integrated silicone nose pads'
    ],
    specs: {
      'Manufacturer': 'Kinetic Optics Studio',
      'Lens': 'One-Piece Polycarbonate Shield',
      'Style': 'Wrap-Around Panoramic Visor',
      'Weight': '26g Ultra-Light'
    },
    reviews: [
      {
        id: 'r-e4',
        user: 'Sahil Kapoor',
        rating: 5,
        date: 'Sept 24, 2026',
        comment: 'The wrap around design feels like futuristic armor. Perfect festival shades.'
      }
    ]
  },
  {
    id: 35,
    name: 'Kinetic Tortoise Shell Vintage Acetate Sunglasses',
    category: 'Eyewear',
    price: 2799,
    oldPrice: 3499,
    rating: 4.7,
    stock: 20,
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/1.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/2.webp',
      'https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/3.webp'
    ],
    accent: '#d4a373',
    description: 'Warm amber tortoise shell acetate frame featuring rich amber-gold flecks, bottle-green polarized lenses, and smooth sculpted keyhole nose bridge inspired by 1960s Riviera intellectual style.',
    highlights: [
      'Custom marbled Havana tortoise shell acetate block',
      'Mineral-tinted green polarized lenses boost natural foliage contrast',
      'Sculpted keyhole bridge relieves pressure across nose bridge',
      'Double rivet pins on face front and temples'
    ],
    specs: {
      'Manufacturer': 'Kinetic Optics Studio',
      'Frame': 'Hand-Polished Havana Tortoise Acetate',
      'Lens Color': 'Classic G-15 Bottle Green Polarized',
      'Bridge Width': '20 mm Keyhole'
    },
    reviews: [
      {
        id: 'r-e5',
        user: 'Neil D.',
        rating: 5,
        date: 'Sept 21, 2026',
        comment: 'The tortoise pattern depth is gorgeous under sunlight. Very comfortable on long drives.'
      }
    ]
  },

  // ==========================================
  // --- 7. BAGS & CARRY (3 Items) ---
  // ==========================================
  {
    id: 36,
    name: 'Kinetic Indigo Sculptural Leather Shoulder Bag',
    category: 'Bags & Carry',
    price: 14999,
    oldPrice: 17999,
    rating: 4.9,
    stock: 8,
    image: 'https://cdn.dummyjson.com/product-images/womens-bags/blue-women\'s-handbag/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/womens-bags/blue-women\'s-handbag/1.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/blue-women\'s-handbag/2.webp',
      'https://cdn.dummyjson.com/product-images/womens-bags/blue-women\'s-handbag/3.webp'
    ],
    accent: '#8bd3ff',
    featured: true,
    description: 'An architectural statement piece handcrafted in Kinetic’s leather goods atelier. Cut from rich cobalt indigo boxcalf leather with rolled architectural top handles, polished silver Kinetic hardware, and a structured flat base.',
    highlights: [
      'Crafted by Kinetic Atelier from smooth-grain cobalt boxcalf leather',
      'Heavy-duty polished silver-tone zipper closure with logo pulls',
      'Split interior with padded tablet divider and zipper security compartment',
      'Detachable and adjustable leather shoulder strap'
    ],
    specs: {
      'Manufacturer': 'Kinetic Leather Atelier',
      'Dimensions': '34cm W x 25cm H x 13cm D',
      'Material': '100% Genuine Boxcalf Leather',
      'Hardware': 'Polished Nickel Plated Brass',
      'Includes': 'Kinetic Flannel Dust Bag & Care Card'
    },
    reviews: [
      {
        id: 'r-b1',
        user: 'Sunita Rao',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'The indigo cobalt shade is breathtaking. The structured shape stays crisp even when fully packed.'
      }
    ]
  },
  {
    id: 37,
    name: 'Kinetic Noir Architectural Crossbody Handbag',
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
    featured: true,
    description: 'Sculpted from rich vegetable-tanned full-grain leather by Kinetic Goods. Features multiple exterior quick-access zip pockets, ergonomic rolled carry handles, and a detachable webbing crossbody strap.',
    highlights: [
      'Constructed by Kinetic Goods with 100% full-grain pebble leather',
      'Spacious main compartment holds 13" laptop, tablet, and everyday carry',
      'Heavy-duty gunmetal zipper pulls with reinforced stress points',
      'Detachable padded crossbody shoulder strap'
    ],
    specs: {
      'Manufacturer': 'Kinetic Goods & Carry',
      'Dimensions': '36cm x 28cm x 12cm',
      'Capacity': '15 Liters',
      'Material': 'Full-Grain Pebble Leather',
      'Pockets': '6 Total (3 Exterior, 3 Interior)'
    },
    reviews: [
      {
        id: 'r-b2',
        user: 'Hunter Gordon',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'Smells of wonderful real leather. Fits my tablet, water bottle, and daily wallet effortlessly.'
      }
    ]
  },
  {
    id: 38,
    name: 'Kinetic Urban Commuter Ballistic Backpack',
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
    description: 'Clean architectural minimalist commuter backpack manufactured by Kinetic. Crafted with weather-repellent structured matte leatherette, concealed anti-theft rear passport compartment, and padded tablet sleeve.',
    highlights: [
      'Manufactured by Kinetic with wipe-clean weatherproof structured matte exterior',
      'Concealed rear zippered security pocket keeps passport and phone safe',
      'Contoured padded shoulder straps with metal adjustment hardware',
      'Padded internal tech divider protects devices up to 14"'
    ],
    specs: {
      'Manufacturer': 'Kinetic Goods & Carry',
      'Dimensions': '38cm x 29cm x 13cm',
      'Volume': '14 Liters',
      'Weight': '680g',
      'Water Resistance': 'Splash & Rain Resistant'
    },
    reviews: [
      {
        id: 'r-b3',
        user: 'Ava Harrison',
        rating: 5,
        date: 'Sept 25, 2026',
        comment: 'Looks super chic with work clothes and keeps its sharp structured shape even when empty.'
      }
    ]
  },

  // ==========================================
  // --- 8. WORKSPACE & LIVING (5 Items) ---
  // ==========================================
  {
    id: 39,
    name: 'Kinetic Sculptural Studio Task Chair',
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
    description: 'An ergonomic design statement manufactured by Kinetic Studio Furniture. Built with a fluid reinforced polyurethane shell, lumbar ventilation cutout, commercial-grade wool weave upholstery, and polished chrome steel swivel base.',
    highlights: [
      'Manufactured by Kinetic Studio with reinforced molded ergonomic inner core',
      'Lumbar opening provides passive cooling airflow and spinal articulation',
      'High-resilience woven wool upholstery with welted perimeter piping',
      'Four-star polished chrome swivel base with floor glide feet'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio Furniture',
      'Dimensions': '66cm W x 63cm D x 80cm H',
      'Seat Height': '46 cm',
      'Base': 'Tubular Chrome Steel 360° Swivel',
      'Weight Limit': '160 kg'
    },
    reviews: [
      {
        id: 'r-w-chair',
        user: 'Elena Long',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'An absolute design icon for the home office. Supports your back during 8-hour work stretches.'
      }
    ]
  },
  {
    id: 40,
    name: 'Kinetic Atelier Tailored Lounge Sofa',
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
    featured: true,
    description: 'Handcrafted luxury studio sofa by Kinetic Furniture Atelier. Built atop a kiln-dried solid beechwood frame with multi-density memory foam core cushions wrapped in tactile channel-quilted Italian linen weave.',
    highlights: [
      'Crafted by Kinetic Atelier with kiln-dried FSC certified solid beechwood',
      'Dual-density foam cushioning with hypoallergenic plush topper',
      'Stain-resistant textured linen weave with removable zip-off covers',
      'Low architectural brutalist profile ideal for open-plan lofts'
    ],
    specs: {
      'Manufacturer': 'Kinetic Furniture Atelier',
      'Dimensions': '210cm L x 95cm D x 74cm H',
      'Frame': 'FSC Certified Solid Hardwood',
      'Upholstery': 'Textured Italian Linen Weave',
      'Seating': '3 Persons Comfortably'
    },
    reviews: [
      {
        id: 'r-w-sofa',
        user: 'Lillian Bishop',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'The cushions have that perfect balance of cloud-like softness with firm underneath support.'
      }
    ]
  },
  {
    id: 41,
    name: 'Kinetic Floating Platform Studio Bed',
    category: 'Workspace',
    price: 64999,
    oldPrice: 74999,
    rating: 4.9,
    stock: 4,
    image: 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp'
    ],
    accent: '#ffe5d9',
    description: 'Sculptural cantilevered low-profile platform bed frame by Kinetic Atelier. Built with solid European walnut joinery, integrated floating side ledges, and upholstered architectural headboard.',
    highlights: [
      'Cantilevered base recessed 15cm to create a weightless floating illusion',
      'Solid European walnut hardwood construction finished in satin beeswax',
      'Slatted ergonomic birch mattress support platform promotes airflow',
      'Integrated floating night shelves along perimeter rails'
    ],
    specs: {
      'Manufacturer': 'Kinetic Furniture Atelier',
      'Size': 'King Size (215cm L x 195cm W x 85cm H)',
      'Wood': 'Solid European Walnut & Birch Slat System',
      'Weight Capacity': '350 kg'
    },
    reviews: [
      {
        id: 'r-w-bed',
        user: 'Farhan Zaidi',
        rating: 5,
        date: 'Oct 03, 2026',
        comment: 'The floating cantilever base transforms the bedroom aesthetic completely. Built like a fortress.'
      }
    ]
  },
  {
    id: 42,
    name: 'Kinetic Solid African Cherry Wood Nightstand',
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
    description: 'Constructed from sustainably harvested African Cherry hardwood by Kinetic Woodworks. Features English dovetailed joinery, soft-close concealed German drawer slides, open display cubby, and a hand-rubbed satin beeswax finish.',
    highlights: [
      'Crafted by Kinetic Woodworks with 100% solid African Cherry hardwood',
      'Traditional English dovetail joinery with soft-close concealed glides',
      'Rear cable pass-through notch for phone and lamp chargers',
      'Finished with all-natural beeswax and linseed oil'
    ],
    specs: {
      'Manufacturer': 'Kinetic Woodworks',
      'Dimensions': '50cm W x 42cm D x 55cm H',
      'Wood': 'Solid African Cherry (Makore)',
      'Finish': 'Natural Beeswax & Satin Oil',
      'Assembly': 'Fully Assembled Ready-to-Use'
    },
    reviews: [
      {
        id: 'r-w-table',
        user: 'Liam Smith',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'Wood grain is breathtaking. Drawer slides shut silently with a gentle push.'
      }
    ]
  },
  {
    id: 43,
    name: 'Kinetic Minimalist Hardwood Vanity Station',
    category: 'Workspace',
    price: 28999,
    oldPrice: 34999,
    rating: 4.8,
    stock: 5,
    image: 'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp',
      'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp',
      'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp'
    ],
    accent: '#b8c0ff',
    description: 'Architectural studio washstand crafted from solid moisture-sealed teak hardwood. Paired with a frameless round LED mirror and matte stone-resin drop-in basin with concealed drawer organizers.',
    highlights: [
      'Marine-grade sealed teak resists moisture, steam, and everyday splashes',
      'Integrated circular LED backlit vanity mirror with touch dimmer',
      'Concealed U-shaped cutout drawer glides around plumbing cleanly',
      'Pure minimalist Scandinavian industrial aesthetic'
    ],
    specs: {
      'Manufacturer': 'Kinetic Woodworks',
      'Dimensions': '75cm W x 50cm D x 85cm H',
      'Basin': 'Matte Composite Stone-Resin',
      'Wood': 'FSC Certified Solid Teak'
    },
    reviews: [
      {
        id: 'r-w-vanity',
        user: 'Mira Kapoor',
        rating: 5,
        date: 'Sept 26, 2026',
        comment: 'The teak wood warmth combined with the backlit mirror creates a spa-like haven in the master bath.'
      }
    ]
  },

  // ==========================================
  // --- 9. AUDIO & STUDIO GEAR (3 Items) ---
  // ==========================================
  {
    id: 44,
    name: 'Kinetic SoundSphere 360 Acoustic Studio Speaker',
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
    description: 'Immersive omnidirectional sound engineered by Kinetic Audio Labs. Combines a 3.0" neodymium downward woofer, silk dome high-frequency tweeter, and real-time room calibration algorithms wrapped in seamless acoustic weave.',
    highlights: [
      '360° cylindrical sound dispersion fills rooms with rich spatial sound',
      'Automatic acoustic sensing measures wall reflections and tunes EQ in real-time',
      'Supports high-res 24-bit/96kHz lossless streaming over Wi-Fi and Bluetooth',
      'Far-field microphone array with physical hardware mute toggle'
    ],
    specs: {
      'Manufacturer': 'Kinetic Audio Labs',
      'Woofer': '3.0" Neodymium Driver with Bass Reflex Port',
      'Tweeter': '0.8" High-Resolution Silk Dome',
      'Connectivity': 'Dual-Band Wi-Fi 6 & Bluetooth 5.2',
      'Weight': '780g'
    },
    reviews: [
      {
        id: 'r-a1',
        user: 'Karan Malhotra',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'Audio quality easily beats speakers twice its price tag. The bass port produces astonishing warmth.'
      }
    ]
  },
  {
    id: 45,
    name: 'Kinetic Pro-Field Full-Grain Leather Sports Glove',
    category: 'Audio',
    price: 4299,
    oldPrice: 5199,
    rating: 4.7,
    stock: 15,
    image: 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/1.webp',
      'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/2.webp',
      'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/3.webp'
    ],
    accent: '#d4a373',
    description: 'Handcrafted utility glove from Kinetic Sports Engineering. Cut from premium steerhide leather with thick leather lace webbing, padded palm pads, and quick-break-in pocket design.',
    highlights: [
      'Heavy-duty steerhide leather naturally shapes to hand contours',
      'Reinforced H-web basket holds high-velocity ball impacts',
      'Moisture-wicking wrist pad liner keeps palms dry during intense games',
      'Double-stitched leather bindings for multi-season durability'
    ],
    specs: {
      'Manufacturer': 'Kinetic Sports Engineering',
      'Size': '12.5" Professional Field Pattern',
      'Leather': 'Full-Grain Steerhide',
      'Hand': 'Right-Hand Throw (Worn on Left Hand)'
    },
    reviews: [
      {
        id: 'r-s1',
        user: 'Ryan Patel',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'Top quality leather. Formed a great pocket after just one weekend of catch.'
      }
    ]
  },
  {
    id: 46,
    name: 'Kinetic Carbon-Composite Impact Protective Helmet',
    category: 'Audio',
    price: 6999,
    oldPrice: 8499,
    rating: 4.9,
    stock: 10,
    image: 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/1.webp',
    images: [
      'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/1.webp',
      'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/2.webp',
      'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/3.webp',
      'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/4.webp'
    ],
    accent: '#8bd3ff',
    description: 'High-impact protective athletic headgear engineered by Kinetic Lab. Molded from carbon-reinforced ABS with titanium wire face grille, multi-channel active ventilation channels, and dial-adjust micro-fit headband.',
    highlights: [
      'Carbon-reinforced shell dissipates extreme kinetic impacts safely',
      'Lightweight titanium face grille with unobstructed peripheral vision',
      'Airflow channels route cool air across the crown during hot matches',
      'Removable antimicrobial interior pads are machine-washable'
    ],
    specs: {
      'Manufacturer': 'Kinetic Performance Engineering',
      'Grille': 'Ultra-Strong Titanium Wire Grille',
      'Shell': 'Carbon-Reinforced ABS Composite',
      'Certification': 'International Impact Safety Certified',
      'Weight': '780g'
    },
    reviews: [
      {
        id: 'r-s2',
        user: 'Varun Joshi',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'Light on the head with incredible visibility through the grille. Premium build.'
      }
    ]
  }
];

export const PRODUCTS_KEY = 'kinetic-products-catalog-v6';

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

    // Migration check: Ensure catalog stays in sync with v6 Kinetic-only catalog
    const needsSync =
      productList.length > parsed.length ||
      parsed.some(
        (p) =>
          !p.images ||
          !Array.isArray(p.images) ||
          p.images.length < 2 ||
          p.name.includes('Nike') ||
          p.name.includes('Rolex') ||
          p.name.includes('Apple') ||
          p.name.includes('Dell') ||
          p.name.includes('Prada') ||
          p.image.includes('apple') ||
          p.image.includes('rolex') ||
          p.image.includes('prada')
      );

    if (needsSync) {
      const customProducts = parsed.filter(
        (p) =>
          !productList.some((d) => d.id === Number(p.id)) &&
          !p.name.includes('Nike') &&
          !p.name.includes('Rolex') &&
          !p.name.includes('Apple') &&
          !p.name.includes('Prada') &&
          !p.image.includes('apple') &&
          !p.image.includes('rolex') &&
          !p.image.includes('prada')
      );
      const merged = [...productList, ...customProducts];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(merged));
      return merged;
    }

    return parsed.map((p, idx) => ({
      ...p,
      id: Number(p.id) || idx + 1,
      name: p.name || 'Kinetic Product',
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

export function deductProductStock(items: { productId: number; quantity: number }[]): void {
  const list = getAllProducts();
  let changed = false;
  items.forEach((item) => {
    const idx = list.findIndex((p) => p.id === item.productId);
    if (idx !== -1) {
      list[idx].stock = Math.max(0, (list[idx].stock || 0) - item.quantity);
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('kinetic-stock-updated', { detail: list }));
  }
}

export async function addProductReview(
  productId: number,
  review: { id?: string; user: string; rating: number; date?: string; comment: string }
): Promise<Product | undefined> {
  const list = getAllProducts();
  const idx = list.findIndex((p) => p.id === productId);
  if (idx === -1) return undefined;

  const newReview = {
    id: review.id || 'rev_' + Date.now(),
    user: review.user.trim(),
    rating: review.rating,
    date: review.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    comment: review.comment.trim()
  };

  const currentReviews = list[idx].reviews || [];
  const updatedReviews = [newReview, ...currentReviews];
  const avgRating = Number(
    (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
  );

  list[idx] = {
    ...list[idx],
    reviews: updatedReviews,
    rating: avgRating
  };

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list));

  // Sync with backend API
  try {
    const apiBase = getApiBase();
    await fetch(`${apiBase}/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });
  } catch (err) {
    console.warn('Backend review sync notice:', err);
  }

  return list[idx];
}


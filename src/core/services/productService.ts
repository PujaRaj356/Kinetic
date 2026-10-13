import { Product } from '../models/product.model';

export const productList: Product[] = [
  // --- APPAREL & MERCH ---
  {
    id: 1,
    name: 'Kinetic Heavyweight Brutalist Graphic Merch Tee',
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
      },
      {
        id: 'r-m2',
        user: 'Maya Chen',
        rating: 5,
        date: 'Oct 09, 2026',
        comment: 'Heavyweight drape is unmatched. Kinetic merch quality beats luxury streetwear brands.'
      }
    ]
  },
  {
    id: 2,
    name: 'Kinetic Studio Oversized Heavy Flannel Over-Shirt',
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
        id: 'r-m3',
        user: 'Rohan Verma',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'Super warm and heavy. Fits perfectly over the Kinetic graphic tee for cold evening rides.'
      }
    ]
  },
  {
    id: 3,
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
    description: 'An architectural summer staple tailored in Kinetic’s micro-atelier. Features a breezy, open Cuban camp collar, relaxed boxy cut, and premium garment-dyed textured weave designed for maximum airflow during high-energy city days.',
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

  // --- FOOTWEAR ---
  {
    id: 4,
    name: 'Kinetic Apex-1 High-Top Court Sneaker',
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
    description: 'Engineered and manufactured by Kinetic Footwear Labs. The Apex-1 features hand-selected full-grain leather uppers in our signature high-contrast red and onyx black colorway, paired with proprietary Kinetic-Pulsion encapsulated air cushioning for shock absorption.',
    highlights: [
      'Manufactured by Kinetic with hand-finished full-grain leather panels',
      'Proprietary Kinetic-Pulsion air capsule heel cushioning',
      'High-traction vulcanized rubber cupsole with custom geometric grip tread',
      'Ergonomic padded ankle collar with memory foam lining'
    ],
    specs: {
      'Manufacturer': 'Kinetic Footwear Labs',
      'Silhouette': 'High-Top Court Sneaker',
      'Upper': '100% Full-grain Napa Leather',
      'Cushioning': 'Kinetic-Pulsion Encapsulated Air Unit',
      'Colorway': 'Kinetic Crimson / Onyx Black / White',
      'Closure': 'Reinforced 8-Eyelet Lace-Up'
    },
    reviews: [
      {
        id: 'r1',
        user: 'Aarav Sharma',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'The leather quality on this Kinetic release is top tier. The red and black contrast turns heads everywhere.'
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
    id: 5,
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
    featured: true,
    description: 'Designed and manufactured in-house by Kinetic Footwear Labs. Combines ultra-lightweight ripstop nylon, buttery suede overlays, and our shock-dissipating Kinetic-Foam studded outsole for effortless all-day city commuting.',
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
      'Weight': '275g (Per shoe, Size 9)'
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
    id: 6,
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
    id: 7,
    name: 'Kinetic SoundPod Pro True Wireless Earphones',
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
    description: 'Custom acoustic hardware manufactured by Kinetic Audio Labs. Powered by our proprietary K-Acoustics DSP chip, offering low-latency wireless transmission, rich warm sub-bass, crystal treble, and up to 28 hours playtime with the wireless magnetic case.',
    highlights: [
      'Proprietary Kinetic K-Acoustics DSP processor with custom low-latency code',
      'Dual AI beamforming mics isolate vocal frequencies from street noise',
      'Capacitive touch & in-ear optical detection sensors for auto play/pause',
      '15-minute quick USB-C / Qi wireless charge gives 3 hours playback'
    ],
    specs: {
      'Manufacturer': 'Kinetic Audio Labs',
      'Processor': 'Kinetic K-Acoustics DSP 64-bit',
      'Connectivity': 'Bluetooth 5.3 + Kinetic Low-Latency Link',
      'Battery Life': '6h per charge (28h total with charging case)',
      'Charging': 'Qi Wireless & USB-C Fast Charge',
      'Water Resistance': 'IPX5 Sweat & Rain Resistant'
    },
    reviews: [
      {
        id: 'r5',
        user: 'Emma Wilson',
        rating: 5,
        date: 'Oct 06, 2026',
        comment: 'Pairing is instantaneous across my laptop and phone. Voice call clarity is the best in the market.'
      }
    ]
  },
  {
    id: 8,
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
      'Weight': '780g',
      'Power': 'Direct AC Wall Adapter Included'
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

  // --- TECH & COMPUTING ---
  {
    id: 9,
    name: 'Kinetic Book Pro 14" Studio Edition',
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
    description: 'Manufactured by Kinetic Hardware Labs. Engineered for pro developers and digital creators. Features a 14.2" high-refresh 120Hz Liquid Studio display, aerospace CNC aluminum unibody chassis, studio-grade triple-mic array, and up to 18 hours battery life.',
    highlights: [
      'Manufactured by Kinetic with 100% recycled CNC machined aerospace aluminum',
      'Kinetic Liquid Studio XDR display (3024 x 1964) with 120Hz adaptive refresh',
      'High-bandwidth 16GB Unified Architecture with 512GB NVMe Gen4 storage',
      'Triple Thunderbolt 4 ports, HDMI 2.1, full-size SDXC card reader, & MagCharge'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Display': '14.2" Liquid Studio XDR (3024 x 1964) 120Hz',
      'Processor': 'Kinetic Silicon 10-Core SoC',
      'Memory': '16GB Unified High-Speed Memory',
      'Storage': '512GB Ultra NVMe SSD',
      'Battery': '70Wh Li-Polymer (Up to 18 Hours)',
      'Weight': '1.58 kg'
    },
    reviews: [
      {
        id: 'r7',
        user: 'Hazel Evans',
        rating: 5,
        date: 'Oct 08, 2026',
        comment: 'The display is unbelievable for color grading and programming. Fans literally never turn on during daily development work.'
      }
    ]
  },
  {
    id: 10,
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
        id: 'r8',
        user: 'Alice Smith',
        rating: 5,
        date: 'Sept 24, 2026',
        comment: 'The carbon fiber wrist rest is so comfortable to type on. Ultra light to carry in my commuter backpack.'
      }
    ]
  },
  {
    id: 11,
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
    description: 'A revolutionary creative powerhouse developed by Kinetic Labs. Features dual full-width interactive displays with an auto-tilting secondary Kinetic ScreenPad Plus that enhances ergonomics and increases thermal cooling airflow by 38%.',
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
    id: 12,
    name: 'Kinetic Celestial Moonphase Automatic Watch',
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
    description: 'Crafted in Kinetic’s master horology atelier. A celebration of astronomical complication and precision mechanics. Displays the synodic lunar cycle on an enamelled midnight disc at 6 o’clock with an authentic meteorite moon applique, framed in a fluted rose bezel.',
    highlights: [
      'Handcrafted by Kinetic Horology Atelier with genuine meteorite moon disc',
      'Perimeter calendar date indicated by blued crescent center hand',
      'Self-winding mechanical caliber certified for precision chronometry',
      'Supple vegetable-tanned alligator leather band with Kinetic Crownclasp'
    ],
    specs: {
      'Manufacturer': 'Kinetic Horology Atelier',
      'Case Diameter': '39 mm',
      'Case Finish': 'Everose Gold Anodized 316L Steel',
      'Crystal': 'Double-domed Anti-Reflective Sapphire',
      'Power Reserve': '48 Hours Mechanical',
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
    id: 13,
    name: 'Kinetic DeepSea 300M Diver Automatic Watch',
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
    description: 'Built for oceanic exploration by Kinetic Marine Labs. Features a 60-minute unidirectional ceramic timing bezel with platinum graduations, solid 904L aerospace steel bracelet, and certified 300-meter deep water resistance.',
    highlights: [
      'Manufactured by Kinetic with ultra-corrosion-resistant 904L alloy steel',
      'Scratchproof ceramic bezel insert with precision 120-click uni-directional action',
      'Kinetic BlueGlow luminescent markers for underwater visibility',
      'Glidelock extension clasp adjusts easily over wetsuits'
    ],
    specs: {
      'Manufacturer': 'Kinetic Marine & Horology Labs',
      'Case Diameter': '41 mm',
      'Material': 'Oyster-Grade 904L Stainless Steel',
      'Bezel': 'Ceramic 60-Minute Rotatable Insert',
      'Movement': 'Kinetic Automatic Calibre 3200',
      'Water Depth': '300 meters / 1,000 feet'
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
    id: 14,
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
        id: 'r12',
        user: 'Nathan Reed',
        rating: 5,
        date: 'Sept 19, 2026',
        comment: 'The blued steel hands against the barleycorn textured dial look sublime when catching light.'
      }
    ]
  },
  {
    id: 15,
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
        id: 'r13',
        user: 'David Martinez',
        rating: 5,
        date: 'Sept 26, 2026',
        comment: 'The leather band broke in after just two days and is super supple now. Great daily beater watch.'
      }
    ]
  },

  // --- SMART DEVICES ---
  {
    id: 16,
    name: 'Kinetic Titan-13 Pro Smartphone (Alpine Edition)',
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
    description: 'Designed and manufactured in-house by Kinetic Mobile Labs. Engineered with a surgical-grade stainless steel frame, Ceramic Shield glass, 120Hz adaptive fluid display, and triple computational studio cameras with LiDAR depth sensing.',
    highlights: [
      'Crafted by Kinetic with surgical-grade steel frame and matte glass back',
      'Fluid 120Hz adaptive refresh OLED display (up to 1200 nits peak)',
      'Triple 12MP computational camera array (Telephoto, Wide, Macro) with LiDAR',
      'Kinetic Quantum 6-Core processor with hardware neural accelerator'
    ],
    specs: {
      'Manufacturer': 'Kinetic Mobile Labs',
      'Display': '6.1" OLED Fluid Display (120Hz ProMotion)',
      'Chipset': 'Kinetic Quantum Bionic 6-Core',
      'Storage': '256GB High-Speed UFS',
      'Water Rating': 'IP68 Certified (Submersible to 6m)',
      'Chassis': 'Surgical-Grade Stainless Steel & Ceramic Shield'
    },
    reviews: [
      {
        id: 'r14',
        user: 'Christian Perez',
        rating: 5,
        date: 'Oct 05, 2026',
        comment: 'The 120Hz display makes everyday scrolling butter smooth. Macro camera mode is astonishingly sharp.'
      }
    ]
  },
  {
    id: 17,
    name: 'Kinetic CyberPulse Series 4 Smartwatch (Gold Anodized)',
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
    description: 'Wearable health & performance hub designed by Kinetic Labs. Features a curved edge-to-edge OLED Retina display, medical-grade electrical ECG sensor, haptic Digital Dial with mechanical feedback, and real-time biometrics tracking.',
    highlights: [
      'Curved borderless OLED Retina display with 1000 nits daylight brightness',
      'Integrated electrical ECG & PPG heart rate sensors with abnormality alerts',
      'Kinetic Haptic Dial crown simulates mechanical balance clicks',
      'Water resistant to 50 meters for open-water swim tracking'
    ],
    specs: {
      'Manufacturer': 'Kinetic Wearables Lab',
      'Case Size': '44 mm Anodized Gold Aluminum',
      'Display': 'Curved LTPO OLED Retina with Force Touch',
      'Sensors': 'Electrical ECG, PPG Pulse, Accelerometer, Gyroscope',
      'Battery Life': '18+ Hours All-Day Battery',
      'Connectivity': 'Bluetooth 5.0, Wi-Fi, GPS'
    },
    reviews: [
      {
        id: 'r15',
        user: 'Nicholas Bailey',
        rating: 5,
        date: 'Sept 20, 2026',
        comment: 'Gold finish looks very premium on the wrist. Haptic feedback on the dial is a delight.'
      }
    ]
  },
  {
    id: 18,
    name: 'Kinetic MagSnap Wireless Magnetic Power Bank',
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
    description: 'Instant wireless snap-on power engineered by Kinetic Hardware. Built with neodymium rare-earth magnets that lock securely to the rear of your device, providing safe, temperature-regulated wireless charging on the go.',
    highlights: [
      'Precision magnetic snap alignment with zero cords required',
      'Pass-through dual charging: charges both battery pack and phone simultaneously',
      'Thermal regulation chip prevents phone overheating during fast charging',
      'Soft-touch matte tactile shell feels great in hand'
    ],
    specs: {
      'Manufacturer': 'Kinetic Hardware Labs',
      'Capacity': '5000 mAh High-Density Li-Po',
      'Output': 'Up to 15W Fast Wireless Power',
      'Port': 'USB-C Bi-Directional Fast Input/Output',
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
    id: 19,
    name: 'Kinetic MagShield Liquid Silicone Case (Plum Edition)',
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
    description: 'Manufactured by Kinetic Studio. Formed from silky medical-grade liquid silicone with internal microfiber velvet lining. Features built-in magnetic rings for snap-on charging and raised camera protection bezels.',
    highlights: [
      'Molded by Kinetic with premium fingerprint-resistant liquid silicone',
      'Internal microfiber velvet liner protects glass back from scratches',
      'Embedded magnetic array aligns with all magnetic charging docks',
      '1.2mm raised screen lip and reinforced camera ring'
    ],
    specs: {
      'Manufacturer': 'Kinetic Studio',
      'Material': 'Medical-Grade Liquid Silicone & Microfiber',
      'Drop Protection': 'Military 2-Meter Shock Absorption',
      'Magnetic Support': 'Embedded MagSnap Ring',
      'Colorway': 'Deep Plum Purple'
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
    id: 20,
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
        id: 'r18',
        user: 'Julian James',
        rating: 5,
        date: 'Sept 29, 2026',
        comment: 'High optical clarity without any chromatic distortion. Frame has good substantial weight.'
      }
    ]
  },
  {
    id: 21,
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
    id: 22,
    name: 'Kinetic Saffiano Sculptural Crosshatch Leather Handbag',
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
    description: 'Mastercrafted in Kinetic’s leather goods atelier. Features our signature crosshatch-textured Saffiano calfskin, rolled dual top handles, removable leather crossbody strap, and custom matte brushed gold Kinetic hardware.',
    highlights: [
      'Handcrafted by Kinetic Atelier with scratch-resistant Saffiano calf leather',
      'Bespoke gold-finish hardware with heavy-duty two-way zipper',
      'Divided interior with dual zipper organizer pockets and signature lining',
      'Protective metal feet on flat structured base keep bag standing upright'
    ],
    specs: {
      'Manufacturer': 'Kinetic Leather Atelier',
      'Dimensions': '32cm W x 24cm H x 14cm D',
      'Material': 'Crosshatch Textured Saffiano Calf Leather',
      'Hardware': 'Brushed Gold-Plated Brass',
      'Includes': 'Kinetic Dust Bag & Authenticity Card'
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
    id: 23,
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
        id: 'r21',
        user: 'Hunter Gordon',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'Smells of wonderful real leather. Fits my tablet, water bottle, and daily wallet effortlessly.'
      }
    ]
  },
  {
    id: 24,
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
        id: 'r22',
        user: 'Ava Harrison',
        rating: 5,
        date: 'Sept 25, 2026',
        comment: 'Looks super chic with work clothes and keeps its sharp structured shape even when empty.'
      }
    ]
  },

  // --- WORKSPACE & LIVING ---
  {
    id: 25,
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
        id: 'r23',
        user: 'Elena Long',
        rating: 5,
        date: 'Oct 01, 2026',
        comment: 'An absolute design icon for the home office. Supports your back during 8-hour work stretches.'
      }
    ]
  },
  {
    id: 26,
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
        id: 'r24',
        user: 'Lillian Bishop',
        rating: 5,
        date: 'Sept 22, 2026',
        comment: 'The cushions have that perfect balance of cloud-like softness with firm underneath support.'
      }
    ]
  },
  {
    id: 27,
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
    featured: true,
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
        id: 'r25',
        user: 'Liam Smith',
        rating: 5,
        date: 'Sept 30, 2026',
        comment: 'Wood grain is breathtaking. Drawer slides shut silently with a gentle push.'
      }
    ]
  }
];

export const PRODUCTS_KEY = 'kinetic-products-catalog-v5';

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

    // Migration check: Ensure catalog stays in sync with v5 Kinetic in-house branded list
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
          p.name.includes('Prada')
      );

    if (needsSync) {
      const customProducts = parsed.filter(
        (p) => !productList.some((d) => d.id === Number(p.id)) && !p.name.includes('Nike') && !p.name.includes('Rolex')
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

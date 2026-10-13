import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kinetic_db';

app.use(cors());
app.use(express.json());

// --- Nodemailer Gmail Transporter Setup ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: (process.env.EMAIL_USER || '').trim(),
    pass: (process.env.EMAIL_PASS || '').replace(/\s+/g, ''), // 16-character Gmail App Password
  },
});

// Dynamic In-Memory OTP Store: { email => { code, expiresAt } }
const otpStore = new Map();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(toEmail, otp) {
  // If credentials aren't set in .env yet, log to console for development testing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('----------------------------------------------------');
    console.log(`[EMAIL NOTICE] Gmail credentials not set in server/.env`);
    console.log(`[EMAIL NOTICE] To receive real emails, set EMAIL_USER & EMAIL_PASS in server/.env`);
    console.log(`[GENERATED OTP] Verification Code for ${toEmail}: >>> ${otp} <<<`);
    console.log('----------------------------------------------------');
    return { sent: false, devMode: true, otp };
  }

  const mailOptions = {
    from: `"Kinetic Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Your Kinetic Verification Code: ${otp}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f1e7; padding: 40px 20px; color: #111;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 3px solid #111111; box-shadow: 8px 8px 0px #111111; padding: 36px 30px;">
          <div style="display: inline-block; background: #d7ff4f; border: 2px solid #111; padding: 6px 14px; font-weight: 900; font-size: 13px; letter-spacing: 1px; margin-bottom: 20px;">
            KINETIC STORE
          </div>
          <h1 style="margin: 0 0 12px; font-size: 26px; font-weight: 900; letter-spacing: -0.04em;">Verify your identity</h1>
          <p style="font-size: 15px; line-height: 1.5; color: #444; margin: 0 0 24px;">
            Use the 6-digit verification code below to complete your sign-in to Kinetic:
          </p>
          <div style="background: #d7ff4f; border: 2px solid #111; padding: 18px 24px; text-align: center; font-size: 34px; font-weight: 950; letter-spacing: 10px; margin-bottom: 24px; color: #111;">
            ${otp}
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">
            ⏰ This code will expire in <b>10 minutes</b>.<br/>
            If you did not request this verification code, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EMAIL DELIVERED] Successfully sent real Gmail to ${toEmail}: ${info.messageId}`);
  return { sent: true, messageId: info.messageId };
}

// Helper: formats order placement date and 3-5 day delivery estimation
function formatOrderDates(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const orderDateFormatted = d.toLocaleDateString('en-US', options);
  const orderTimeFormatted = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Calculate standard 3 to 5 business days delivery window
  const deliveryMin = new Date(d);
  deliveryMin.setDate(d.getDate() + 3);
  const deliveryMax = new Date(d);
  deliveryMax.setDate(d.getDate() + 5);

  const deliveryMinStr = deliveryMin.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const deliveryMaxStr = deliveryMax.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return {
    orderDateFormatted,
    orderTimeFormatted,
    estimatedDelivery: `${deliveryMinStr} – ${deliveryMaxStr} (3–5 business days)`
  };
}

async function sendLoginSuccessEmail(toEmail, userName) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('----------------------------------------------------');
    console.log(`[EMAIL NOTICE] (Dev Mode) Login notification for ${toEmail} (${userName || 'User'})`);
    console.log('----------------------------------------------------');
    return { sent: false, devMode: true };
  }

  const now = new Date();
  const dayDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const mailOptions = {
    from: `"Kinetic Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🔐 Login Successful - Welcome to Kinetic`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f1e7; padding: 40px 16px; color: #111;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border: 3px solid #111111; box-shadow: 8px 8px 0px #111111; padding: 36px 30px;">
          <div style="display: inline-block; background: #d7ff4f; border: 2px solid #111; padding: 6px 14px; font-weight: 900; font-size: 13px; letter-spacing: 1px; margin-bottom: 20px;">
            KINETIC STORE
          </div>
          <h1 style="margin: 0 0 12px; font-size: 26px; font-weight: 950; letter-spacing: -0.04em;">You're logged in! 👋</h1>
          <p style="font-size: 15px; line-height: 1.5; color: #333; margin: 0 0 24px;">
            Hi <b>${userName || 'there'}</b>, you have successfully signed in to your Kinetic account.
          </p>

          <div style="background: #faf8f5; border: 2px solid #111; padding: 18px 20px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #666; font-weight: 600;">Account Email:</td>
                <td style="padding: 6px 0; color: #111; font-weight: 800; text-align: right;">${toEmail}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666; font-weight: 600;">Day & Date:</td>
                <td style="padding: 6px 0; color: #111; font-weight: 800; text-align: right;">${dayDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666; font-weight: 600;">Time of Login:</td>
                <td style="padding: 6px 0; color: #111; font-weight: 800; text-align: right;">${timeStr}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666; font-weight: 600;">Security Status:</td>
                <td style="padding: 6px 0; color: #10b981; font-weight: 900; text-align: right;">Session Verified ✓</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #666; line-height: 1.6; margin: 0 0 24px;">
            🛡️ <b>Security Notice:</b> If this was you, you're all set to explore and shop. If you did NOT authorize this login, please change your password immediately.
          </p>

          <div style="text-align: center; border-top: 2px dashed #ddd; padding-top: 20px;">
            <p style="font-size: 12px; color: #888; margin: 0;">Kinetic E-Commerce · Good Products. Zero Boring.</p>
          </div>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[LOGIN EMAIL DELIVERED] Successfully sent login notification to ${toEmail}: ${info.messageId}`);
  return { sent: true, messageId: info.messageId };
}

async function sendOrderConfirmationEmail(order) {
  const toEmail = order.customerEmail;
  if (!toEmail || !toEmail.includes('@')) {
    return { sent: false, reason: 'Valid customer email required' };
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('----------------------------------------------------');
    console.log(`[ORDER EMAIL NOTICE] (Dev Mode) Order #${order.id} summary for ${toEmail}`);
    console.log('----------------------------------------------------');
    return { sent: false, devMode: true };
  }

  const { orderDateFormatted, orderTimeFormatted, estimatedDelivery } = formatOrderDates(order.createdAt);

  const itemsHtml = (order.items || []).map((item) => {
    const prod = item.product || {};
    const itemTotal = (prod.price || 0) * (item.quantity || 1);
    return `
      <tr style="border-bottom: 1.5px solid #eee;">
        <td style="padding: 14px 0; width: 70px; vertical-align: top;">
          ${prod.image ? `<img src="${prod.image}" alt="${prod.name || 'Product'}" width="60" height="60" style="object-fit: cover; border: 2px solid #111; display: block;" />` : ''}
        </td>
        <td style="padding: 14px 12px; vertical-align: top;">
          <div style="font-weight: 900; font-size: 15px; color: #111; margin-bottom: 4px;">${prod.name || 'Item'}</div>
          <div style="font-size: 12px; color: #666; font-weight: 600;">Category: ${prod.category || 'Curated'}</div>
          <div style="font-size: 13px; color: #444; margin-top: 4px;">Qty: <b>${item.quantity || 1}</b> × ₹${(prod.price || 0).toLocaleString('en-IN')}</div>
        </td>
        <td style="padding: 14px 0; vertical-align: top; text-align: right; font-weight: 900; font-size: 15px; color: #111;">
          ₹${itemTotal.toLocaleString('en-IN')}
        </td>
      </tr>
    `;
  }).join('');

  const mailOptions = {
    from: `"Kinetic Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `📦 Order Confirmed: #${order.id} - Kinetic Store`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f1e7; padding: 40px 16px; color: #111;">
        <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 3px solid #111111; box-shadow: 10px 10px 0px #111111; padding: 36px 30px;">
          
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 2px solid #111; padding-bottom: 18px;">
            <div style="display: inline-block; background: #d7ff4f; border: 2px solid #111; padding: 6px 14px; font-weight: 900; font-size: 13px; letter-spacing: 1px;">
              KINETIC STORE
            </div>
            <div style="font-size: 14px; font-weight: 900; color: #111;">
              ORDER #${order.id}
            </div>
          </div>

          <h1 style="margin: 0 0 10px; font-size: 28px; font-weight: 950; letter-spacing: -0.04em;">Thank you for your order! 🎉</h1>
          <p style="font-size: 15px; line-height: 1.5; color: #333; margin: 0 0 24px;">
            Hi <b>${order.customerName || 'Shopper'}</b>, we have received your order and our team is preparing it for dispatch.
          </p>

          <!-- Delivery Highlight Card -->
          <div style="background: #d7ff4f; border: 2px solid #111; padding: 18px 20px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 900; letter-spacing: 1px; color: #111; margin-bottom: 6px;">
              ESTIMATED DELIVERY TIMELINE
            </div>
            <div style="font-size: 20px; font-weight: 950; color: #111; letter-spacing: -0.02em;">
              ${estimatedDelivery}
            </div>
            <div style="font-size: 13px; color: #333; margin-top: 6px;">
              Ordered on: <b>${orderDateFormatted}</b> at ${orderTimeFormatted}
            </div>
          </div>

          <!-- Items Ordered Table -->
          <h2 style="font-size: 18px; font-weight: 900; margin: 24px 0 12px; letter-spacing: -0.02em;">Items Summary</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            ${itemsHtml}
          </table>

          <!-- Financial Breakdown -->
          <div style="background: #faf8f5; border: 2px solid #111; padding: 18px 20px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 5px 0; color: #666; font-weight: 600;">Items Subtotal:</td>
                <td style="padding: 5px 0; color: #111; font-weight: 800; text-align: right;">₹${(order.subtotal || 0).toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #666; font-weight: 600;">Shipping:</td>
                <td style="padding: 5px 0; color: #111; font-weight: 800; text-align: right;">${order.shipping === 0 ? 'FREE' : '₹' + order.shipping}</td>
              </tr>
              <tr style="border-top: 2px solid #111;">
                <td style="padding: 10px 0 0; color: #111; font-weight: 950; font-size: 18px;">Total Paid:</td>
                <td style="padding: 10px 0 0; color: #111; font-weight: 950; font-size: 20px; text-align: right;">₹${(order.total || 0).toLocaleString('en-IN')}</td>
              </tr>
            </table>
          </div>

          <!-- Delivery Address & Details -->
          <div style="border: 2px solid #111; padding: 18px 20px; margin-bottom: 26px;">
            <div style="font-size: 12px; font-weight: 900; letter-spacing: 1px; color: #777; margin-bottom: 8px;">
              DELIVERY ADDRESS
            </div>
            <div style="font-weight: 900; font-size: 15px; color: #111; margin-bottom: 4px;">
              ${order.customerName} · ${order.customerPhone}
            </div>
            <div style="font-size: 14px; color: #333; line-height: 1.4;">
              ${order.shippingAddress}<br/>
              ${order.city} - ${order.pincode}
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 8px; font-weight: 700;">
              Payment Method: <b>${(order.paymentMethod || 'Card').toUpperCase()}</b>
            </div>
          </div>

          <p style="font-size: 13px; color: #666; line-height: 1.5; margin: 0 0 24px;">
            Have questions about this order? Reply directly to this email and our support team will assist you.
          </p>

          <div style="text-align: center; border-top: 2px dashed #ccc; padding-top: 20px;">
            <p style="font-size: 12px; color: #888; margin: 0;">Kinetic Store · Good Products. Zero Boring.</p>
          </div>

        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[ORDER EMAIL DELIVERED] Successfully sent order summary for #${order.id} to ${toEmail}: ${info.messageId}`);
  return { sent: true, messageId: info.messageId };
}

// --- MongoDB Schemas & Models ---
const ReviewSchema = new mongoose.Schema({
  id: String,
  user: String,
  rating: Number,
  date: String,
  comment: String
});

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: Number,
  rating: { type: Number, default: 4.8 },
  stock: { type: Number, default: 12 },
  description: String,
  image: String,
  images: [String],
  accent: { type: String, default: '#d7ff4f' },
  featured: { type: Boolean, default: false },
  highlights: [String],
  specs: { type: Map, of: String },
  reviews: [ReviewSchema]
});

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' }
});

const OrderItemSchema = new mongoose.Schema({
  product: Object,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerId: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  shippingAddress: String,
  city: String,
  pincode: String,
  items: [OrderItemSchema],
  subtotal: Number,
  shipping: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['card', 'upi'], default: 'card' },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', ProductSchema);
const UserModel = mongoose.model('User', UserSchema);
const OrderModel = mongoose.model('Order', OrderSchema);

// Initial Seed Data
const seedProducts = [
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
    description: 'Engineered for audio purists and daily commuters alike, the Orbit Wireless Headphones blend custom 40mm neodymium drivers with active noise cancellation.',
    highlights: ['Active Noise Cancellation', '32 Hours Playback', 'Multipoint Bluetooth 5.2'],
    specs: { 'Driver Size': '40mm', 'Battery': '32 Hours', 'Warranty': '1 Year' }
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
    description: 'Crafted with breathable knit uppers and responsive dual-density foam midsoles for maximum impact absorption.',
    highlights: ['Engineered Mesh', 'Dual-density EVA sole', 'Reflective heel accents'],
    specs: { 'Upper': 'FlyKnit', 'Sole': 'Rubber', 'Fit': 'Regular' }
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
    description: 'Weather-resistant Cordura exterior with dedicated shockproof compartments for up to a 16-inch laptop.',
    highlights: ['Water-repellent 900D Cordura', '16" Laptop Sleeve', 'RFID-blocking pocket'],
    specs: { 'Capacity': '20L', 'Compatibility': '16" Laptop', 'Waterproof': 'IPX4' }
  }
];

let isMongoConnected = false;
let inMemoryProducts = [...seedProducts];
let inMemoryUsers = [
  { id: 'usr-admin-1', name: 'Store Administrator', email: 'admin@kinetic.com', password: 'Admin@123', role: 'admin' },
  { id: 'usr-client-1', name: 'Alex Shopper', email: 'client@kinetic.com', password: 'Client@123', role: 'client' }
];
let inMemoryOrders = [
  {
    id: 'ORD-90214',
    customerId: 'usr-demo-1',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '9876543210',
    shippingAddress: '42 Indiranagar 12th Main',
    city: 'Bengaluru',
    pincode: '560038',
    items: [{ product: seedProducts[0], quantity: 1 }],
    subtotal: 4999,
    shipping: 0,
    total: 4999,
    paymentMethod: 'card',
    status: 'Delivered',
    createdAt: new Date().toISOString()
  }
];

// --- API Routes ---

// Health & Status check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    server: 'Node.js Express',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory Fallback (Active)',
    emailService: process.env.EMAIL_USER ? `Configured (${process.env.EMAIL_USER})` : 'Dev Mode (Logged to console)',
    timestamp: new Date().toISOString()
  });
});

// Real Email OTP Endpoints
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ ok: false, message: 'Valid email address required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    otpStore.set(cleanEmail, { code: otp, expiresAt });

    const result = await sendOtpEmail(cleanEmail, otp);

    res.json({
      ok: true,
      message: result.sent
        ? `Real verification code sent to ${cleanEmail}`
        : `Verification code generated for ${cleanEmail} (Dev mode active)`,
      sent: result.sent,
      devMode: result.devMode || false,
      devOtp: result.devMode ? otp : undefined
    });
  } catch (err) {
    console.error('Error sending OTP email:', err);
    res.status(500).json({ ok: false, message: 'Failed to send verification email: ' + err.message });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ ok: false, message: 'Email and verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = String(code).trim();
    const stored = otpStore.get(cleanEmail);

    if (!stored) {
      return res.status(400).json({ ok: false, message: 'No verification code found. Please request a new code.' });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(cleanEmail);
      return res.status(400).json({ ok: false, message: 'Verification code has expired. Please request a new code.' });
    }

    if (stored.code !== cleanCode) {
      return res.status(400).json({ ok: false, message: 'Incorrect verification code. Please check your email and try again.' });
    }

    // OTP Verified successfully!
    otpStore.delete(cleanEmail);
    res.json({ ok: true, message: 'Identity verified successfully!' });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

// Products Routes
app.get('/api/products', async (req, res) => {
  try {
    const { query = '', category = 'All' } = req.query;
    let list = isMongoConnected ? await ProductModel.find() : inMemoryProducts;
    
    if (category !== 'All') {
      list = list.filter(p => p.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const list = isMongoConnected ? await ProductModel.distinct('category') : Array.from(new Set(inMemoryProducts.map(p => p.category)));
    res.json(['All', ...list]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = isMongoConnected ? await ProductModel.findOne({ id }) : inMemoryProducts.find(p => p.id === id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add Product
app.post('/api/products', async (req, res) => {
  try {
    const data = req.body;
    const nextId = isMongoConnected
      ? (await ProductModel.countDocuments()) + 1
      : inMemoryProducts.length > 0 ? Math.max(...inMemoryProducts.map(p => p.id)) + 1 : 1;
    
    const newProduct = { ...data, id: nextId, rating: 5.0, reviews: [] };
    
    if (isMongoConnected) {
      const doc = new ProductModel(newProduct);
      await doc.save();
    } else {
      inMemoryProducts.unshift(newProduct);
    }
    res.status(201).json({ ok: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Admin: Delete Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isMongoConnected) {
      await ProductModel.deleteOne({ id });
    } else {
      inMemoryProducts = inMemoryProducts.filter(p => p.id !== id);
    }
    res.json({ ok: true, message: `Product ${id} deleted` });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Orders & Transactions Routes
app.get('/api/orders', async (req, res) => {
  try {
    const list = isMongoConnected ? await OrderModel.find().sort({ createdAt: -1 }) : inMemoryOrders;
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = {
      ...orderData,
      id: orderData.id || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Processing',
      createdAt: orderData.createdAt || new Date().toISOString()
    };
    if (isMongoConnected) {
      const doc = new OrderModel(newOrder);
      await doc.save();
    } else {
      inMemoryOrders.unshift(newOrder);
    }

    // Automatically send comprehensive Order Confirmation Email
    const emailResult = await sendOrderConfirmationEmail(newOrder);
    res.status(201).json({ ok: true, order: newOrder, emailResult });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/orders/send-confirmation', async (req, res) => {
  try {
    const { order } = req.body;
    if (!order) {
      return res.status(400).json({ ok: false, message: 'Order data required.' });
    }
    const result = await sendOrderConfirmationEmail(order);
    res.json({ ok: true, result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (isMongoConnected) {
      await OrderModel.updateOne({ id }, { status });
    } else {
      const order = inMemoryOrders.find(o => o.id === id);
      if (order) order.status = status;
    }
    res.json({ ok: true, id, status });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Auth Routes (Admin & Client)
app.post('/api/auth/notify-login', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ ok: false, message: 'Valid email required.' });
    }
    const result = await sendLoginSuccessEmail(email.trim().toLowerCase(), name || 'Shopper');
    res.json({ ok: true, result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;
    if (isMongoConnected) {
      user = await UserModel.findOne({ email: email.toLowerCase(), password });
    } else {
      user = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    }
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Invalid email or password.' });
    }
    // Send login success email notification
    await sendLoginSuccessEmail(user.email, user.name);
    res.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();
    
    const existing = isMongoConnected
      ? await UserModel.findOne({ email: cleanEmail })
      : inMemoryUsers.some(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return res.status(400).json({ ok: false, message: 'Account already exists.' });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      role: 'client'
    };

    if (isMongoConnected) {
      const doc = new UserModel(newUser);
      await doc.save();
    } else {
      inMemoryUsers.push(newUser);
    }

    // Send welcome and login notification email
    await sendLoginSuccessEmail(cleanEmail, name.trim());
    res.status(201).json({ ok: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start listening when running standalone, not when imported as Vercel serverless function
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Node.js Express server listening on http://localhost:${PORT}`);
  });
}

// Connect to MongoDB asynchronously
mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Database successfully!');
  })
  .catch(() => {
    isMongoConnected = false;
    console.log('ℹ️ MongoDB not detected locally. Node.js server running in high-performance in-memory mode.');
  });

export default app;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import dns from 'dns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'kinetic_store.json');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kinetic_db';
const SALT_ROUNDS = 10;

// Strict RFC-compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Known placeholder, dummy, test, and disposable spam domains
const BLOCKED_EMAIL_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'sample.com',
  'fake.com',
  'dummy.com',
  'tempmail.com',
  'temp-mail.org',
  'mailinator.com',
  '10minutemail.com',
  'guerrillamail.com',
  'trashmail.com',
  'sharklasers.com',
  'getairmail.com',
  'yopmail.com',
  'dispostable.com',
  'throwawaymail.com',
  'inboxkitten.com'
]);

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

// Live DNS & Domain verification to reject dummy, non-existent, and fake domains
async function verifyEmailDomain(email) {
  if (!email || !email.includes('@')) {
    return { ok: false, code: 'INVALID_EMAIL_FORMAT', message: 'Invalid email address.' };
  }
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) {
    return { ok: false, code: 'INVALID_EMAIL_FORMAT', message: 'Invalid email address.' };
  }

  const domain = parts[1];

  // 1. Block reserved placeholder, test, and disposable domains (e.g. example.com, test.com)
  if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return {
      ok: false,
      code: 'DISPOSABLE_OR_TEST_DOMAIN',
      message: `The domain "@${domain}" is a test/placeholder domain and cannot receive real emails. Please use an active, real email address (e.g. Gmail, Outlook, Yahoo).`
    };
  }

  // 2. Perform live DNS MX record lookup
  try {
    const mxRecords = await dns.promises.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return {
        ok: false,
        code: 'DOMAIN_NO_MAILSERVER',
        message: `The domain "@${domain}" has no active mail server configured to receive emails. Please check your spelling.`
      };
    }

    // RFC 7505 null MX check (domains explicitly rejecting email return exchange: '' or '.')
    const validMx = mxRecords.some(r => r.exchange && r.exchange.trim().length > 0 && r.exchange !== '.');
    if (!validMx) {
      return {
        ok: false,
        code: 'DOMAIN_NO_MAILSERVER',
        message: `The domain "@${domain}" does not accept incoming emails. Please use a valid, active email address.`
      };
    }

    return { ok: true, domain };
  } catch (err) {
    if (err.code === 'ENOTFOUND' || err.code === 'ENODATA' || err.code === 'ESERVFAIL') {
      return {
        ok: false,
        code: 'DOMAIN_NOT_FOUND',
        message: `The domain "@${domain}" does not exist on the internet. Please provide a real email address.`
      };
    }
    // If DNS query times out, allow through so slow connections are not penalized
    return { ok: true, domain };
  }
}

function validatePasswordStrength(pwd) {
  if (!pwd || typeof pwd !== 'string') {
    return { ok: false, message: 'Password is required.' };
  }
  if (pwd.length < 8) {
    return { ok: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(pwd)) {
    return { ok: false, message: 'Password must contain at least one uppercase letter (A-Z).' };
  }
  if (!/[a-z]/.test(pwd)) {
    return { ok: false, message: 'Password must contain at least one lowercase letter (a-z).' };
  }
  if (!/[0-9]/.test(pwd)) {
    return { ok: false, message: 'Password must contain at least one number (0-9).' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
    return { ok: false, message: 'Password must contain at least one special character (!@#$%^&*).' };
  }
  return { ok: true };
}

app.use(cors());
app.use(express.json());

// --- Persistent File Database Storage Engine ---
function loadDiskStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products)) {
        // Automatically encrypt/hash any legacy plain passwords in diskStore
        if (Array.isArray(parsed.users)) {
          let updated = false;
          parsed.users.forEach(u => {
            if (u.password && !u.password.startsWith('$2a$') && !u.password.startsWith('$2b$')) {
              u.password = bcrypt.hashSync(u.password, SALT_ROUNDS);
              updated = true;
            }
          });
          if (updated) {
            try {
              fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf8');
            } catch {}
          }
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading kinetic_store.json:', err.message);
  }
  return { products: [], orders: [], users: [] };
}

let diskStore = loadDiskStore();

function saveDiskStore() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(diskStore, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving kinetic_store.json:', err.message);
  }
}

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

function formatOrderDates(dateInput) {
  const d = dateInput ? new Date(dateInput) : new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const orderDateFormatted = d.toLocaleDateString('en-US', options);
  const orderTimeFormatted = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

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
    console.log(`[EMAIL NOTICE] (Dev Mode) Login notification for ${toEmail} (${userName || 'User'})`);
    return { sent: false, devMode: true };
  }

  const loginTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const loginDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  const mailOptions = {
    from: `"Kinetic Security" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `🔐 Successful Login to Your Kinetic Account`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f1e7; padding: 40px 20px; color: #111;">
        <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 3px solid #111111; box-shadow: 8px 8px 0px #111111; padding: 36px 30px;">
          <div style="display: inline-block; background: #d7ff4f; border: 2px solid #111; padding: 6px 14px; font-weight: 900; font-size: 13px; letter-spacing: 1px; margin-bottom: 20px;">
            KINETIC SECURITY
          </div>
          <h1 style="margin: 0 0 12px; font-size: 24px; font-weight: 900; letter-spacing: -0.04em;">You're Logged In! 👋</h1>
          <p style="font-size: 15px; line-height: 1.5; color: #333; margin: 0 0 20px;">
            Hi <b>${userName || 'Valued Member'}</b>, your Kinetic account was just accessed successfully.
          </p>
          <div style="background: #faf8f5; border: 2px solid #111; padding: 16px 18px; margin-bottom: 20px; font-size: 13px; line-height: 1.6;">
            <div>🕒 <b>Time:</b> ${loginTime} on ${loginDate}</div>
            <div>✉️ <b>Account:</b> ${toEmail}</div>
            <div>🛡️ <b>Status:</b> Session Authenticated</div>
          </div>
          <p style="font-size: 12px; color: #777; margin: 0; line-height: 1.5;">
            If you did not perform this login, please change your password immediately or contact Kinetic Security.
          </p>
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[LOGIN EMAIL DELIVERED] Sent login confirmation to ${toEmail}`);
  return { sent: true, messageId: info.messageId };
}

async function sendOrderConfirmationEmail(order) {
  const toEmail = order.customerEmail;
  if (!toEmail || !toEmail.includes('@')) {
    console.warn(`[ORDER EMAIL SKIPPED] No valid customerEmail provided for order #${order.id}`);
    return { sent: false, error: 'No valid recipient email' };
  }

  const { orderDateFormatted, orderTimeFormatted, estimatedDelivery } = formatOrderDates(order.createdAt);

  const itemsHtml = (order.items || [])
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e5e5e5;">
        <td style="padding: 12px 0; display: flex; align-items: center; gap: 12px;">
          <img src="${item.product?.image || ''}" alt="${item.product?.name || 'Item'}" style="width: 52px; height: 52px; object-fit: cover; border: 2px solid #111; background: ${item.product?.accent || '#eee'};" />
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #111;">${item.product?.name || 'Product'}</div>
            <div style="font-size: 12px; color: #666;">Qty: ${item.quantity} · ${item.product?.category || ''}</div>
          </div>
        </td>
        <td style="padding: 12px 0; text-align: right; font-weight: 800; font-size: 14px; color: #111; white-space: nowrap;">
          ₹${((item.product?.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
        </td>
      </tr>
    `
    )
    .join('');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('----------------------------------------------------');
    console.log(`[ORDER EMAIL NOTICE] (Dev Mode) Gmail credentials not set in server/.env`);
    console.log(`[ORDER SUMMARY] Order #${order.id} placed by ${order.customerName} (${toEmail})`);
    console.log(`[TOTAL] ₹${(order.total || 0).toLocaleString('en-IN')} | Est. Delivery: ${estimatedDelivery}`);
    console.log('----------------------------------------------------');
    return { sent: false, devMode: true };
  }

  const mailOptions = {
    from: `"Kinetic Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `📦 Order Confirmed: #${order.id} - Kinetic Store`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f1e7; padding: 40px 16px; color: #111;">
        <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 3px solid #111111; box-shadow: 10px 10px 0px #111111; padding: 36px 30px;">
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
            Hi <b>${order.customerName || 'Shopper'}</b>, we have received your order and our studio team is preparing it for dispatch.
          </p>

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

          <h2 style="font-size: 18px; font-weight: 900; margin: 24px 0 12px; letter-spacing: -0.02em;">Items Summary</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            ${itemsHtml}
          </table>

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
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
  phone: String,
  address: String,
  city: String,
  pincode: String
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

let isMongoConnected = false;

// --- API Routes ---

// Health & Database Status
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    server: 'Node.js Express',
    database: isMongoConnected ? 'MongoDB (Cloud / Local Connected)' : 'Persistent File-Backed JSON Database (Active & Permanent)',
    dataPath: DATA_FILE,
    totalProductsInDb: diskStore.products.length,
    totalOrdersInDb: diskStore.orders.length,
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
    const expiresAt = Date.now() + 10 * 60 * 1000;

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
      return res.status(400).json({ ok: false, message: 'No active verification code found. Please request a new code.' });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(cleanEmail);
      return res.status(400).json({ ok: false, message: 'Verification code has expired. Please request a new code.' });
    }

    if (stored.code !== cleanCode) {
      return res.status(400).json({ ok: false, message: 'Incorrect verification code. Please check your email and try again.' });
    }

    // Retrieve verified user (supports both login and pending registration)
    let user = stored.user;
    if (stored.pendingUser) {
      user = stored.pendingUser;
      const exists = diskStore.users.some(u => u.email.toLowerCase() === cleanEmail);
      if (!exists) {
        diskStore.users.push(user);
        saveDiskStore();
      }
      if (isMongoConnected) {
        const mongoExists = await UserModel.findOne({ email: cleanEmail });
        if (!mongoExists) {
          const doc = new UserModel(user);
          await doc.save();
        }
      }
      console.log(`[USER REGISTRATION VERIFIED] ${user.name} (${cleanEmail}) confirmed OTP and activated account!`);
    } else if (!user) {
      user = diskStore.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!user && isMongoConnected) {
        const mongoUser = await UserModel.findOne({ email: cleanEmail });
        if (mongoUser) user = mongoUser.toObject();
      }
    }

    otpStore.delete(cleanEmail);

    const sanitizedUser = user ? {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      pincode: user.pincode
    } : undefined;

    if (sanitizedUser) {
      await sendLoginSuccessEmail(sanitizedUser.email, sanitizedUser.name);
    }

    res.json({
      ok: true,
      message: 'Two-factor security verification successful!',
      user: sanitizedUser
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

// Products Routes
app.get('/api/products', async (req, res) => {
  try {
    const { query = '', category = 'All' } = req.query;
    let list = isMongoConnected ? await ProductModel.find().lean() : diskStore.products;
    if (!list || list.length === 0) list = diskStore.products;

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
    const list = diskStore.products.map(p => p.category);
    res.json(['All', ...Array.from(new Set(list))]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    let product = isMongoConnected ? await ProductModel.findOne({ id }).lean() : diskStore.products.find(p => p.id === id);
    if (!product) product = diskStore.products.find(p => p.id === id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Customer Review Persistence Route
app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const reviewData = req.body;
    if (!reviewData.user || !reviewData.comment) {
      return res.status(400).json({ ok: false, message: 'Reviewer name and comment are required.' });
    }

    const newReview = {
      id: reviewData.id || `rev_${Date.now()}`,
      user: String(reviewData.user).trim(),
      rating: Number(reviewData.rating) || 5,
      date: reviewData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: String(reviewData.comment).trim()
    };

    let updatedProduct = null;

    // 1. Update in local persistent disk store
    const diskProd = diskStore.products.find(p => p.id === id);
    if (diskProd) {
      if (!Array.isArray(diskProd.reviews)) diskProd.reviews = [];
      diskProd.reviews.unshift(newReview);
      const avg = Number((diskProd.reviews.reduce((sum, r) => sum + r.rating, 0) / diskProd.reviews.length).toFixed(1));
      diskProd.rating = avg;
      saveDiskStore();
      updatedProduct = diskProd;
    }

    // 2. Update in MongoDB if connected
    if (isMongoConnected) {
      const mongoProd = await ProductModel.findOne({ id });
      if (mongoProd) {
        if (!Array.isArray(mongoProd.reviews)) mongoProd.reviews = [];
        mongoProd.reviews.unshift(newReview);
        mongoProd.rating = Number((mongoProd.reviews.reduce((sum, r) => sum + r.rating, 0) / mongoProd.reviews.length).toFixed(1));
        await mongoProd.save();
        updatedProduct = mongoProd.toObject();
      }
    }

    if (!updatedProduct) {
      return res.status(404).json({ ok: false, message: 'Product not found' });
    }

    console.log(`[REVIEW SAVED] New review by ${newReview.user} for Product #${id}. New rating: ${updatedProduct.rating}`);
    res.status(201).json({ ok: true, product: updatedProduct, review: newReview });
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Product Stock Management Route
app.patch('/api/products/:id/stock', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { stock, delta } = req.body;
    let newStock = 0;

    const diskProd = diskStore.products.find(p => p.id === id);
    if (diskProd) {
      if (typeof stock === 'number') diskProd.stock = Math.max(0, stock);
      else if (typeof delta === 'number') diskProd.stock = Math.max(0, (diskProd.stock || 0) + delta);
      newStock = diskProd.stock;
      saveDiskStore();
    }

    if (isMongoConnected) {
      if (typeof stock === 'number') {
        await ProductModel.updateOne({ id }, { $set: { stock: Math.max(0, stock) } });
      } else if (typeof delta === 'number') {
        await ProductModel.updateOne({ id }, { $inc: { stock: delta } });
      }
    }

    res.json({ ok: true, id, stock: newStock });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Admin: Add Product
app.post('/api/products', async (req, res) => {
  try {
    const data = req.body;
    const nextId = diskStore.products.length > 0 ? Math.max(...diskStore.products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...data, id: nextId, rating: 5.0, reviews: [] };

    diskStore.products.unshift(newProduct);
    saveDiskStore();

    if (isMongoConnected) {
      const doc = new ProductModel(newProduct);
      await doc.save();
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
    diskStore.products = diskStore.products.filter(p => p.id !== id);
    saveDiskStore();

    if (isMongoConnected) {
      await ProductModel.deleteOne({ id });
    }
    res.json({ ok: true, message: `Product ${id} deleted` });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Orders & Order History Routes
app.get('/api/orders', async (req, res) => {
  try {
    let list = isMongoConnected ? await OrderModel.find().sort({ createdAt: -1 }).lean() : diskStore.orders;
    if (!list || list.length === 0) list = diskStore.orders;
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Customer-Specific Order History
app.get('/api/orders/user/:userKey', async (req, res) => {
  try {
    const userKey = decodeURIComponent(req.params.userKey).toLowerCase().trim();
    let orders = [];

    if (isMongoConnected) {
      orders = await OrderModel.find({
        $or: [
          { customerId: req.params.userKey },
          { customerEmail: { $regex: new RegExp(`^${userKey}$`, 'i') } }
        ]
      }).sort({ createdAt: -1 }).lean();
    }

    if (!orders || orders.length === 0) {
      orders = diskStore.orders.filter(
        o => o.customerId === req.params.userKey || (o.customerEmail && o.customerEmail.toLowerCase().trim() === userKey)
      );
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order Placement: Saves Order AND Automatically Decrements Stock
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = {
      ...orderData,
      id: orderData.id || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Processing',
      createdAt: orderData.createdAt || new Date().toISOString()
    };

    // 1. Save order to diskStore and MongoDB
    diskStore.orders.unshift(newOrder);

    if (isMongoConnected) {
      const doc = new OrderModel(newOrder);
      await doc.save();
    }

    // 2. Automatically reduce product stock for each ordered item
    const updatedStocks = [];
    if (Array.isArray(newOrder.items)) {
      for (const item of newOrder.items) {
        const pId = Number(item.product?.id || item.productId || item.id);
        const qty = Number(item.quantity) || 1;
        if (!pId) continue;

        // Deduct in disk store
        const p = diskStore.products.find(x => x.id === pId);
        if (p) {
          p.stock = Math.max(0, (p.stock || 0) - qty);
          updatedStocks.push({ productId: pId, remainingStock: p.stock });
          console.log(`[STOCK REDUCED] Product #${pId} ("${p.name}") reduced by ${qty}. Remaining stock: ${p.stock}`);
        }

        // Deduct in MongoDB
        if (isMongoConnected) {
          await ProductModel.updateOne({ id: pId }, { $inc: { stock: -qty } });
        }
      }
    }
    saveDiskStore();

    // 3. Send real Gmail order receipt
    const emailResult = await sendOrderConfirmationEmail(newOrder);
    res.status(201).json({ ok: true, order: newOrder, updatedStocks, emailResult });
  } catch (err) {
    console.error('Error processing order:', err);
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

    const order = diskStore.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      saveDiskStore();
    }

    if (isMongoConnected) {
      await OrderModel.updateOne({ id }, { status });
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
    if (!email || !validateEmail(email)) {
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

    // 1. Email format validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        ok: false,
        code: 'INVALID_EMAIL_FORMAT',
        message: 'Please provide a valid email address (e.g. name@domain.com).'
      });
    }

    // 2. Password presence check
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
      return res.status(400).json({
        ok: false,
        code: 'MISSING_PASSWORD',
        message: 'Please enter your password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 3. User existence check in local JSON diskStore and MongoDB
    let user = diskStore.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user && isMongoConnected) {
      const mongoUser = await UserModel.findOne({ email: cleanEmail });
      if (mongoUser) user = mongoUser.toObject();
    }

    // Email not registered
    if (!user) {
      return res.status(404).json({
        ok: false,
        code: 'USER_NOT_FOUND',
        message: 'No account found with this email. Please check your spelling or register for a new account.'
      });
    }

    // 4. Password validation with bcrypt hashing
    let passwordMatches = false;
    const isBcrypt = user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));

    if (isBcrypt) {
      passwordMatches = await bcrypt.compare(password, user.password);
    } else {
      // Legacy plaintext password verification
      passwordMatches = (user.password === password);
      if (passwordMatches) {
        // Transparently upgrade legacy plaintext password to secure bcrypt hash
        user.password = await bcrypt.hash(password, SALT_ROUNDS);
        saveDiskStore();
        if (isMongoConnected) {
          await UserModel.updateOne({ email: cleanEmail }, { password: user.password });
        }
      }
    }

    if (!passwordMatches) {
      return res.status(401).json({
        ok: false,
        code: 'INCORRECT_PASSWORD',
        message: 'Incorrect password for this account. Please double-check and try again.'
      });
    }

    // --- 2FA EMAIL OTP VERIFICATION LAYER ---
    const sanitizedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      pincode: user.pincode
    };

    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(cleanEmail, { code: otp, expiresAt, user: sanitizedUser });

    // Send 6-digit OTP code to user's real email address
    const otpResult = await sendOtpEmail(cleanEmail, otp);

    res.json({
      ok: true,
      requires2FA: true,
      email: cleanEmail,
      message: otpResult.sent
        ? `Password verified! Security code sent to ${cleanEmail}`
        : `Password verified! Security code generated for ${cleanEmail} (Dev mode)`,
      sent: otpResult.sent,
      devMode: otpResult.devMode || false,
      devOtp: otpResult.devMode ? otp : undefined
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        ok: false,
        code: 'INVALID_NAME',
        message: 'Please provide a valid full name (minimum 2 characters).'
      });
    }

    // 2. Email format validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        ok: false,
        code: 'INVALID_EMAIL_FORMAT',
        message: 'Please provide a valid email address (e.g. name@domain.com).'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 2b. Live Domain & MX Record verification (blocks example.com, disposable, & fake domains)
    const domainCheck = await verifyEmailDomain(cleanEmail);
    if (!domainCheck.ok) {
      return res.status(400).json({
        ok: false,
        code: domainCheck.code,
        message: domainCheck.message
      });
    }

    // 3. Existing email check
    let existing = diskStore.users.some(u => u.email.toLowerCase() === cleanEmail);
    if (!existing && isMongoConnected) {
      const mongoUser = await UserModel.findOne({ email: cleanEmail });
      if (mongoUser) existing = true;
    }

    if (existing) {
      return res.status(409).json({
        ok: false,
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'An account with this email address already exists. Please log in instead.'
      });
    }

    // 4. Password strength validation
    const strengthCheck = validatePasswordStrength(password);
    if (!strengthCheck.ok) {
      return res.status(400).json({
        ok: false,
        code: 'WEAK_PASSWORD',
        message: strengthCheck.message
      });
    }

    // 5. Encrypt password with salted bcrypt hash
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const pendingUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: 'client',
      createdAt: new Date().toISOString()
    };

    // 6. Generate 6-digit OTP & store pending registration in otpStore
    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore.set(cleanEmail, {
      code: otp,
      expiresAt,
      pendingUser,
      purpose: 'register'
    });

    const otpResult = await sendOtpEmail(cleanEmail, otp);

    res.status(200).json({
      ok: true,
      requiresVerification: true,
      email: cleanEmail,
      message: otpResult.sent
        ? `Verification code sent to ${cleanEmail}. Please enter the 6-digit code to activate your account.`
        : `Verification code generated for ${cleanEmail} (Dev mode active).`,
      sent: otpResult.sent,
      devMode: otpResult.devMode || false,
      devOtp: otpResult.devMode ? otp : undefined
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start listening when running standalone, not when imported as Vercel serverless function
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Node.js Express server listening on http://localhost:${PORT}`);
    console.log(`📁 Persistent database engine loaded: ${diskStore.products.length} products, ${diskStore.orders.length} orders.`);
  });
}

// Connect to MongoDB asynchronously
mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(async () => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Database successfully!');
    try {
      const prodCount = await ProductModel.countDocuments();
      if (prodCount === 0 && diskStore.products.length > 0) {
        console.log(`Seeding MongoDB with ${diskStore.products.length} products...`);
        await ProductModel.insertMany(diskStore.products);
      }
    } catch (seedErr) {
      console.warn('Initial MongoDB sync notice:', seedErr.message);
    }
  })
  .catch(() => {
    isMongoConnected = false;
    console.log('ℹ️ MongoDB not detected locally.');
    console.log(`🛡️ Persistent Local Database is ACTIVE at server/data/kinetic_store.json.`);
    console.log('👉 To connect MongoDB Atlas: add your connection string to server/.env (MONGODB_URI=mongodb+srv://...)');
  });

export default app;

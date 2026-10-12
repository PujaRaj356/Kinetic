# Kinetic Store (React Edition)

Modern React e-commerce / shopping cart application powered by Vite, React 18, and React Router DOM.

## Features

- Extended product catalogue (18 curated products across Audio, Tech, Apparel, Eyewear, Bags, Home, Wearables, Accessories & Lifestyle)
- Real-time search and category filtering
- Detailed product page with stock, ratings, price, and add-to-bag actions
- Cart with quantity controls, subtotal, shipping calculation, and total
- Wishlist for saved products
- Persistent state in LocalStorage (Cart, Wishlist, Current User)
- User Registration with strong password validation
- Login and simulated 6-digit OTP verification
- Protected Routes for Cart, Wishlist, and Checkout
- Checkout form validation & order placement summary
- Neo-brutalist / editorial UI design

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production Build

```bash
npm run build
```

## Demo Verification Code

OTP: `123456`

## Password Rules

- Minimum 8 characters
- Uppercase
- Lowercase
- Number
- Special character

Example: `Password@123`

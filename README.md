# 🏡 ApnaGhar — AI-Powered Indian Real Estate Marketplace

> India's smartest property search platform — Powered by AI, trusted by 50,000+ families.

![ApnaGhar](https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=70)

---

## 🚀 Tech Stack

| Layer    | Technology                                           |
|----------|------------------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion          |
| Backend  | Node.js, Express.js, MongoDB (Mongoose)              |
| Auth     | JWT + bcrypt, Role-based (Buyer / Seller)            |
| i18n     | i18next — English, Hindi, Gujarati                   |
| Deploy   | Vercel (client) + Render (server)                    |

---

## 📁 Project Structure

```
ApnaGhar/
├── client/                    # Vite + React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, HeroSection, Footer
│   │   │   ├── property/      # PropertyCard, SearchBar, Filters
│   │   │   ├── auth/          # ProtectedRoute
│   │   │   └── ui/            # Skeleton loaders
│   │   ├── pages/             # HomePage, PropertiesPage, AuthPage, etc.
│   │   ├── layouts/           # MainLayout
│   │   ├── context/           # AuthContext, ThemeContext, WishlistContext
│   │   ├── services/          # Axios API service
│   │   ├── i18n/              # EN, HI, GU translations
│   │   ├── data/              # Sample Indian property data
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                    # Node + Express backend
│   ├── controllers/           # authController, propertyController
│   ├── models/                # User, Property, Review schemas
│   ├── routes/                # auth.js, properties.js
│   ├── middleware/            # auth.js (JWT protect + authorize)
│   ├── config/                # db.js
│   ├── utils/                 # response.js (standard format)
│   └── server.js
│
└── README.md
```

---

## 🏠 Features

### Phase 1 — Core Platform
- ✅ Full-screen hero with Indian housing imagery
- ✅ AI-powered search suggestions
- ✅ Advanced property filters (city, BHK, budget, RERA, furnishing)
- ✅ Property listing with grid/list view
- ✅ Property detail page with image gallery

### Phase 2 — Indian Market Data
- ✅ Cities: Mumbai, Delhi, Bangalore, Ahmedabad, Vadodara
- ✅ Currency in ₹ INR (auto-format to L/Cr)
- ✅ RERA Approved badge
- ✅ Furnishing status
- ✅ Sample Indian property data

### Phase 3 — Multi-language
- ✅ English, Hindi (हिन्दी), Gujarati (ગુજરાતી)
- ✅ Language switcher in navbar
- ✅ Persisted in localStorage

### Phase 4 — Authentication
- ✅ Buyer / Seller role toggle
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Password show/hide toggle
- ✅ Form validation with animations

### Phase 5 — Dark / Light Mode
- ✅ Theme toggle in navbar
- ✅ Saved in localStorage
- ✅ Smooth transitions

### Phase 6 — AI Features
- ✅ Wishlist system (localStorage)
- ✅ Property recommendations (based on filters)
- ✅ Smart search bar
- ✅ Save search filters

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install
```bash
git clone https://github.com/your-org/ApnaGhar.git
cd ApnaGhar
npm run install:all
```

### 2. Configure Environment
```bash
# Server
cp server/.env.example server/.env
# Edit: MONGO_URI, JWT_SECRET

# Client
cp client/.env.example client/.env
```

### 3. Run Development
```bash
npm run dev
# Client: http://localhost:5173
# Server: http://localhost:5000
```

---

## 🗄️ MongoDB Schemas

### User
```js
{ name, email, password, phone, role: 'buyer|seller|admin', isVerified, savedSearches }
```

### Property
```js
{
  title, description, city, locality, price, listingType: 'sale|rent',
  propertyType: 'Flat|Villa|PG|Plot', bhk, bathrooms, area,
  furnishing, reraApproved, reraNumber, amenities, images,
  seller (ref: User), isActive, isFeatured, views, aiScore
}
```

### Review
```js
{ property (ref), user (ref), rating, comment }
```

---

## 🌐 API Endpoints

| Method | Endpoint                 | Auth      | Description          |
|--------|--------------------------|-----------|----------------------|
| POST   | /api/auth/register       | Public    | Register user        |
| POST   | /api/auth/login          | Public    | Login                |
| GET    | /api/auth/me             | Bearer    | Get profile          |
| GET    | /api/properties          | Public    | List with filters    |
| GET    | /api/properties/featured | Public    | Featured listings    |
| GET    | /api/properties/mine     | Seller    | My listings          |
| GET    | /api/properties/:id      | Public    | Property detail      |
| POST   | /api/properties          | Seller    | Create listing       |
| PUT    | /api/properties/:id      | Seller    | Update listing       |
| DELETE | /api/properties/:id      | Seller    | Delete listing       |

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client && npm run build
# Connect GitHub repo to Vercel
# Set env: VITE_API_URL=https://your-api.onrender.com/api
```

### Backend (Render)
```
Build Command: npm install
Start Command: node server.js
Env: NODE_ENV=production, MONGO_URI=..., JWT_SECRET=..., CLIENT_URL=https://apnaghar.vercel.app
```

---

## 🎨 Design System

| Token        | Value              |
|--------------|--------------------|
| Primary Blue | `#1E40AF`          |
| Teal         | `#0D9488`          |
| Purple       | `#7C3AED`          |
| Charcoal     | `#1F2937`          |
| Display Font | Playfair Display   |
| Body Font    | DM Sans            |

---

## 📊 Roadmap

- [ ] AI property recommendations engine
- [ ] Cloudinary image uploads
- [ ] Google Maps integration
- [ ] Email notifications (Nodemailer)
- [ ] EMI calculator
- [ ] Virtual property tours
- [ ] Admin dashboard
- [ ] Push notifications (PWA)
- [ ] WhatsApp Business API integration

---

Made with ❤️ in India 🇮🇳 | ApnaGhar © 2025

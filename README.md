# DreamUp - Virtual Wardrobe: Virtual Try-On & Smart Shopping

A premium e-commerce platform with AI-powered virtual try-on and outfit planning features.

## Features

- ✨ **AI Virtual Try-On** - See how clothes look on you using Gemini 2.5 Flash Image
- 🎨 **AI Outfit Planner** - Get personalized outfit suggestions using Gemini 3 Flash Preview
- 🛍️ **Product Catalog** - Browse 12 curated fashion items
- 🔐 **User Authentication** - Secure registration and login with JWT
- 📦 **Order Management** - Complete shopping cart and checkout system
- 👤 **User Dashboard** - Manage profile, measurements, and order history
- 🎭 **Premium UI/UX** - Modern, editorial design with smooth animations

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **SQLite3** with better-sqlite3
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **CORS** enabled

### AI Integration
- **Google Gemini API**
  - Gemini 2.5 Flash Image (Virtual Try-On)
  - Gemini 3 Flash Preview (Outfit Planning)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/supravat011/Dream-Up.git
cd Dream-Up
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Create `.env.local` in the root directory:
```env
API_KEY=your-gemini-api-key-here
```

5. Create `.env` in the server directory:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

6. Initialize the database:
```bash
cd server
npm run init-db
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```
The backend will run on `http://localhost:5000`

2. Start the frontend (in a new terminal):
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`

## Project Structure

```
DreamUp/
├── components/          # React components
│   ├── AuthPage.tsx
│   ├── DashboardPage.tsx
│   ├── HomeParallax.tsx
│   ├── Layout.tsx
│   ├── PlannerPage.tsx
│   ├── ShopPage.tsx
│   └── TryOnPage.tsx
├── server/             # Backend API
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── models/     # Data models
│   │   ├── controllers/# Request handlers
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Auth & upload middleware
│   │   └── server.js   # Express server
│   ├── uploads/        # User uploaded images
│   └── database.sqlite # SQLite database
├── services/           # API services
│   ├── api.ts         # Backend API client
│   └── geminiService.ts # Gemini AI integration
└── types.ts           # TypeScript types

```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

### Orders
- `POST /api/orders` - Create order (auth required)
- `GET /api/orders` - Get user orders (auth required)
- `GET /api/orders/:id` - Get order details (auth required)

### Virtual Try-On
- `POST /api/tryon` - Submit try-on request (auth required)
- `GET /api/tryon/:id` - Get try-on result (auth required)

## Database Schema

- **users** - User accounts and profiles
- **products** - Product catalog
- **orders** - Order records
- **order_items** - Items in each order
- **tryon_requests** - Virtual try-on requests

## Features in Detail

### AI Virtual Try-On
Upload a photo of yourself and a garment image to see how it looks on you using advanced AI image generation.

### AI Outfit Planner
Describe your occasion and style preferences to get 3 curated outfit suggestions with detailed item lists.

### User Dashboard
- View and edit profile information
- Manage body measurements
- Track order history with visual product thumbnails
- Update account settings

## Security Features

- Password hashing with bcryptjs
- JWT token authentication (7-day expiration)
- Protected API routes
- File upload validation
- SQL injection protection via prepared statements

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - see LICENSE file for details

## Author

Supravat

## Acknowledgments

- Google Gemini API for AI features
- Unsplash for product images
- Tailwind CSS for styling framework

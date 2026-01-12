import db from './database.js';

console.log('Initializing database...');

// Create Users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    size_top TEXT DEFAULT 'M',
    size_bottom TEXT DEFAULT '32',
    size_shoe TEXT DEFAULT '9',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create Products table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    stock_quantity INTEGER DEFAULT 100,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create Orders table
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'Processing' CHECK(status IN ('Processing', 'Shipped', 'Delivered')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// Create Order_Items table
db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  )
`);

// Create TryOn_Requests table
db.exec(`
  CREATE TABLE IF NOT EXISTS tryon_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    person_image_url TEXT NOT NULL,
    garment_image_url TEXT NOT NULL,
    result_image_url TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
  )
`);

console.log('Database tables created successfully!');

// Seed initial products
const products = [
    {
        name: 'Vintage Denim Jacket',
        category: 'Outerwear',
        price: 89,
        image_url: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&q=80&w=800',
        description: 'Classic washed denim with vintage detailing.'
    },
    {
        name: 'Floral Summer Dress',
        category: 'Dresses',
        price: 120,
        image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        description: 'Lightweight, breathable fabric perfect for summer days.'
    },
    {
        name: 'Classic White Tee',
        category: 'Tops',
        price: 25,
        image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
        description: 'The essential white t-shirt, made from organic cotton.'
    },
    {
        name: 'Leather Biker Boots',
        category: 'Shoes',
        price: 150,
        image_url: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?auto=format&fit=crop&q=80&w=800',
        description: 'Rugged leather boots built to last a lifetime.'
    },
    {
        name: 'Silk Scarf',
        category: 'Accessories',
        price: 45,
        image_url: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800',
        description: '100% silk scarf with a unique hand-painted design.'
    },
    {
        name: 'Wool Blend Coat',
        category: 'Outerwear',
        price: 200,
        image_url: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800',
        description: 'Warm and stylish wool coat for the colder months.'
    },
    {
        name: 'Slim Fit Chinos',
        category: 'Bottoms',
        price: 60,
        image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
        description: 'Versatile chinos that look great in the office or on the weekend.'
    },
    {
        name: 'Cashmere Sweater',
        category: 'Tops',
        price: 110,
        image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
        description: 'Luxuriously soft cashmere sweater in neutral tones.'
    },
    {
        name: 'Running Sneakers',
        category: 'Shoes',
        price: 85,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        description: 'Performance sneakers designed for speed and comfort.'
    },
    {
        name: 'Evening Gown',
        category: 'Dresses',
        price: 250,
        image_url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
        description: 'Elegant evening gown for special occasions.'
    },
    {
        name: 'Casual Hoodie',
        category: 'Tops',
        price: 55,
        image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
        description: 'Comfortable fleece hoodie for relaxed days.'
    },
    {
        name: 'Formal Blazer',
        category: 'Outerwear',
        price: 140,
        image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
        description: 'Sharp tailored blazer to complete any professional look.'
    }
];

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products (name, category, price, image_url, description)
  VALUES (?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((products) => {
    for (const product of products) {
        insertProduct.run(product.name, product.category, product.price, product.image_url, product.description);
    }
});

insertMany(products);

console.log('Seeded', products.length, 'products');
console.log('Database initialization complete!');

db.close();

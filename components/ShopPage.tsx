import React, { useState, useEffect } from 'react';
import { Plus, ShoppingBag, Filter, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { productsAPI } from '../services/api';

interface ShopPageProps {
    addToCart: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ addToCart }) => {
    const [filter, setFilter] = useState('All');
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productsAPI.getAll(filter === 'All' ? undefined : filter);
                setProducts(data.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    category: p.category,
                    price: p.price,
                    image: p.image_url,
                    description: p.description
                })));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [filter]);

    const filteredProducts = products;

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="relative bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 block animate-fade-in">
                        Fall / Winter 2025
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 animate-fade-in-up">
                        The Collection
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto text-lg font-light leading-relaxed animate-fade-in-up delay-100">
                        Curated essentials for the modern wardrobe. Timeless pieces designed to elevate your everyday style.
                    </p>
                </div>
            </div>

            {/* Sticky Filter Bar */}
            <div className="sticky top-[80px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${filter === cat
                                        ? 'bg-black text-white border-black'
                                        : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center text-xs text-gray-400 uppercase tracking-widest">
                            <Filter className="w-4 h-4 mr-2" />
                            {filteredProducts.length} Items
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group cursor-pointer"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    />

                                    {/* Quick Add Overlay */}
                                    <div className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 transform ${hoveredProduct === product.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                        }`}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            className="w-full bg-white text-black py-3 px-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-lg"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Quick Add
                                        </button>
                                    </div>

                                    {/* Badges (Example) */}
                                    {product.id % 3 === 0 && (
                                        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                            New Arrival
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="text-center group-hover:text-gray-600 transition-colors">
                                    <h3 className="font-serif text-xl text-gray-900 mb-1 group-hover:text-black transition-colors">{product.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                                    <span className="font-medium text-gray-900">${product.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                        <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-serif text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                        <button
                            onClick={() => setFilter('All')}
                            className="mt-6 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <div className="bg-black text-white py-24 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">Join the Inner Circle</h2>
                    <p className="text-gray-400 mb-8 font-light">
                        Subscribe to receive updates, access to exclusive deals, and more.
                    </p>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-white transition-colors"
                        />
                        <button className="text-xs font-bold uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center gap-2">
                            Subscribe <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;

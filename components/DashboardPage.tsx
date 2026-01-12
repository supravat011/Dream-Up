import React, { useState } from 'react';
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard } from 'lucide-react';
import { Order, UserProfile } from '../types';

// --- MOCK DATA ---
const MOCK_USER: UserProfile = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    sizes: {
        top: "M",
        bottom: "28",
        shoe: "7.5"
    }
};

const MOCK_ORDERS: Order[] = [
    {
        id: '#ORD-7782',
        date: '2023-10-15',
        total: 145.00,
        status: 'Delivered',
        items: [
            { id: 1, name: 'Vintage Denim Jacket', price: 89, quantity: 1, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&q=80&w=200', description: "Premium denim" },
            { id: 3, name: 'Classic White Tee', price: 25, quantity: 1, category: 'Tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=200', description: "Essential cotton tee" }
        ]
    },
    {
        id: '#ORD-9921',
        date: '2023-11-02',
        total: 60.00,
        status: 'Shipped',
        items: [
            { id: 7, name: 'Slim Fit Chinos', price: 60, quantity: 1, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=200', description: "Versatile chinos" }
        ]
    },
];

interface DashboardPageProps {
    onSignOut: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onSignOut }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-serif text-gray-900 mb-2">The Suite</h1>
                    <p className="text-gray-500">Welcome back, {MOCK_USER.name}. Manage your personal atelier.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="p-8 text-center border-b border-gray-50">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                    <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-lg">{MOCK_USER.name}</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Premium Member</p>
                            </div>
                            <nav className="p-4 space-y-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'profile'
                                        ? 'bg-black text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                    My Atelier
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'orders'
                                        ? 'bg-black text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Package className="w-4 h-4" />
                                    Collection History
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === 'settings'
                                        ? 'bg-black text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                            </nav>
                            <div className="p-4 border-t border-gray-50">
                                <button
                                    onClick={onSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 animate-fade-in">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-serif">My Atelier Details</h2>
                                    <button
                                        onClick={() => setActiveTab('settings')}
                                        className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12 mb-12">
                                    <div className="space-y-6">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Personal Info</label>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Full Name</p>
                                                <div className="text-lg font-medium border-b border-gray-100 pb-2">{MOCK_USER.name}</div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400 mb-1">Email Address</p>
                                                <div className="text-lg font-medium border-b border-gray-100 pb-2">{MOCK_USER.email}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Saved Addresses</label>
                                        <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                                            <div className="p-2 bg-gray-50 rounded-lg">
                                                <MapPin className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Home</p>
                                                <p className="text-sm text-gray-500 mt-1">123 Fashion Ave, Suite 400<br />New York, NY 10012</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">My Measurements</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {Object.entries(MOCK_USER.sizes).map(([key, value]) => (
                                            <div key={key} className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                                <p className="text-xs font-bold uppercase text-gray-400 mb-2 group-hover:text-black transition-colors">{key} Size</p>
                                                <p className="text-3xl font-serif">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-fade-in">
                                {MOCK_ORDERS.map(order => (
                                    <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                                        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-bold text-lg">{order.id}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">{order.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-serif text-xl">${order.total.toFixed(2)}</p>
                                                <button className="text-xs font-bold text-gray-400 hover:text-black mt-1 flex items-center justify-end gap-1 transition-colors">
                                                    View Invoice <ChevronRight className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-gray-50/50">
                                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                                {order.items.length > 0 ? order.items.map((item, idx) => (
                                                    <div key={idx} className="w-16 h-20 flex-shrink-0 bg-white rounded-lg border border-gray-100 overflow-hidden relative group/item">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                            <span className="text-xs text-white font-bold">x{item.quantity}</span>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <p className="text-sm text-gray-400 italic">Items details not available for this mock order.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 animate-fade-in">
                                <h2 className="text-2xl font-serif mb-8">Account Settings</h2>

                                <div className="space-y-8 max-w-2xl">
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700">Display Name</label>
                                        <input
                                            type="text"
                                            defaultValue={MOCK_USER.name}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                defaultValue={MOCK_USER.email}
                                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                                                disabled
                                            />
                                            <span className="absolute right-4 top-3.5 text-xs text-gray-400">Verified</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold pt-4">Password & Security</h3>
                                        <button className="text-sm font-medium text-black underline underline-offset-4">Change Password</button>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold pt-4">Notifications</h3>
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" id="notif-orders" className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                                            <label htmlFor="notif-orders" className="text-sm text-gray-600">Email me about order updates</label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" id="notif-news" className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
                                            <label htmlFor="notif-news" className="text-sm text-gray-600">Email me about new collections</label>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button className="px-8 py-3 bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

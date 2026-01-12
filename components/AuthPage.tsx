import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

interface AuthPageProps {
    setIsAuthenticated: (val: boolean) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        try {
            if (isLogin) {
                await authAPI.login(email, password);
            } else {
                await authAPI.register(email, password, name);
            }
            setIsAuthenticated(true);
            setLoading(false);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans">
            {/* LEFT: Editorial Image (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
                <img
                    src={isLogin
                        ? "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop"
                    }
                    alt="Fashion Editorial"
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-16 left-16 text-white max-w-md">
                    <p className="tracking-[0.3em] text-xs uppercase mb-4 opacity-80">Season 2025</p>
                    <h2 className="text-5xl font-serif italic leading-tight mb-6">
                        {isLogin ? '"Elegance is not standing out, but being remembered."' : '"Fashion is the armor to survive the reality of everyday life."'}
                    </h2>
                    <p className="text-sm opacity-70 uppercase tracking-widest">— {isLogin ? 'Giorgio Armani' : 'Bill Cunningham'}</p>
                </div>
            </div>

            {/* RIGHT: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
                <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-medium tracking-wide uppercase hover:text-brand transition-colors"
                    >
                        {isLogin ? 'Create Account' : 'Sign In'}
                    </button>
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-12">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif font-bold text-xl mb-6">D</div>
                        <h1 className="text-4xl font-serif text-gray-900 mb-3 block">
                            {isLogin ? 'Welcome Back.' : 'Join The Club.'}
                        </h1>
                        <p className="text-gray-500 text-sm tracking-wide">
                            {isLogin ? 'Please enter your details.' : 'Start your style journey today.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {!isLogin && (
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full py-4 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors peer"
                                    placeholder=" "
                                    required
                                />
                                <label className="absolute left-0 top-4 text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                    Full Name
                                </label>
                                <User className="absolute right-0 top-4 w-5 h-5 text-gray-300 peer-focus:text-black transition-colors" />
                            </div>
                        )}

                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                className="w-full py-4 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors peer"
                                placeholder=" "
                                required
                            />
                            <label className="absolute left-0 top-4 text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                Email Address
                            </label>
                            <Mail className="absolute right-0 top-4 w-5 h-5 text-gray-300 peer-focus:text-black transition-colors" />
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                name="password"
                                className="w-full py-4 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors peer"
                                placeholder=" "
                                required
                            />
                            <label className="absolute left-0 top-4 text-gray-500 transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs pointer-events-none">
                                Password
                            </label>
                            <Lock className="absolute right-0 top-4 w-5 h-5 text-gray-300 peer-focus:text-black transition-colors" />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white h-14 rounded-none uppercase tracking-[0.2em] text-sm font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-4 disabled:opacity-70 group"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>

                    {isLogin && (
                        <div className="mt-8 text-center">
                            <a href="#" className="text-sm text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5">Forgot your password?</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

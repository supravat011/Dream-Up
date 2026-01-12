import React, { useState } from 'react';
import { Loader2, Sparkles, Send, ArrowRight, Check } from 'lucide-react';
import { generateOutfitAdvice } from '../services/geminiService';

const PlannerPage: React.FC = () => {
    const [preferences, setPreferences] = useState('');
    const [occasion, setOccasion] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeVibe, setActiveVibe] = useState<string | null>(null);

    const vibes = [
        "Minimalist Chic", "Streetwear Edge", "Formal Elegance", "Boho Summer", "Business Casual", "Avant-Garde"
    ];

    const handleVibeClick = (vibe: string) => {
        setActiveVibe(vibe);
        setPreferences(prev => {
            const cleanPrev = prev.replace(/Style vibe: .+?\. /, '');
            return `Style vibe: ${vibe}. ${cleanPrev}`;
        });
    };

    const handlePlan = async () => {
        if (!preferences || !occasion) return;
        setLoading(true);
        try {
            const data = await generateOutfitAdvice(preferences, occasion);
            setSuggestions(data);
        } catch (error) {
            console.error(error);
            alert("Unable to reach the stylist. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header Section */}
            <div className="bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-brand" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">AI Stylist V2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 animate-fade-in-up">
                        The Curator
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg font-light leading-relaxed animate-fade-in-up delay-100">
                        Tell us where you're going and what you love. Our AI architect will design your perfect look, piece by piece.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left: Input Console */}
                <div className="lg:col-span-5 space-y-12">
                    <div className="space-y-8 animate-fade-in-up delay-200">

                        {/* 1. Vibe Selector */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Select your vibe</label>
                            <div className="flex flex-wrap gap-3">
                                {vibes.map(vibe => (
                                    <button
                                        key={vibe}
                                        onClick={() => handleVibeClick(vibe)}
                                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${activeVibe === vibe
                                                ? 'bg-black text-white border-black shadow-lg text-sm px-5'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                                            }`}
                                    >
                                        {vibe}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Occasion Input */}
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand transition-colors">The Occasion</label>
                            <div className="relative">
                                <textarea
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                    className="w-full h-32 p-6 bg-gray-50 border-none rounded-2xl focus:ring-0 text-lg font-serif placeholder:text-gray-300 transition-all resize-none"
                                    placeholder="e.g. Gallery opening in downtown, 7 PM..."
                                ></textarea>
                                <div className="absolute top-6 right-6 text-gray-300 group-focus-within:text-black transition-colors">
                                    <ArrowRight className="w-5 h-5 -rotate-45" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Style Details Input */}
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-brand transition-colors">Style Notes</label>
                            <div className="relative">
                                <textarea
                                    value={preferences}
                                    onChange={(e) => setPreferences(e.target.value)}
                                    className="w-full h-32 p-6 bg-gray-50 border-none rounded-2xl focus:ring-0 text-lg font-serif placeholder:text-gray-300 transition-all resize-none"
                                    placeholder="e.g. Prefer sustainable fabrics, oversized fits..."
                                ></textarea>
                            </div>
                        </div>

                        <button
                            onClick={handlePlan}
                            disabled={loading || !occasion || !preferences}
                            className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${loading || !occasion || !preferences
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white shadow-xl hover:bg-gray-900 hover:scale-[1.02]'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    Curating Look...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Curate My Look
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right: Results Display */}
                <div className="lg:col-span-7 pl-0 lg:pl-12 border-l border-gray-100 min-h-[500px]">
                    {suggestions.length > 0 ? (
                        <div className="space-y-12 animate-fade-in">
                            <div className="flex items-end justify-between border-b border-black pb-4 mb-8">
                                <h2 className="text-3xl font-serif">Your Curated Collection</h2>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">01 / 01</span>
                            </div>

                            <div className="space-y-8">
                                {suggestions.map((outfit, idx) => (
                                    <div key={idx} className="group cursor-default">
                                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                                            {/* Optional: Add dynamic image search for vibe here later */}
                                            <div className="bg-gray-100 w-full md:w-48 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0 relative">
                                                <img
                                                    src={`https://source.unsplash.com/random/400x600/?fashion,${outfit.name.split(' ')[0]}`}
                                                    alt="Inspiration"
                                                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                                                    onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400')}
                                                />
                                                <div className="absolute inset-0 bg-black/10"></div>
                                            </div>

                                            <div className="flex-1 pt-2">
                                                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand transition-colors">{outfit.name}</h3>
                                                <p className="text-gray-600 leading-relaxed mb-6 font-light">{outfit.description}</p>

                                                <div className="space-y-4">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 block">Essential Pieces</span>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {outfit.items.map((item: string, i: number) => (
                                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-800">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 text-gray-300">
                            {loading ? (
                                <div className="space-y-4">
                                    <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden mx-auto">
                                        <div className="w-full h-full bg-black animate-progress-indeterminate"></div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest animate-pulse">Analyzing trends...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 p-6 rounded-full bg-gray-50">
                                        <Send className="w-8 h-8 text-gray-300 ml-1" />
                                    </div>
                                    <h3 className="font-serif text-2xl mb-2 text-gray-400">Awaiting Your Brief</h3>
                                    <p className="max-w-xs mx-auto text-sm">Fill in the details on the left to start the curation process.</p>
                                </>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PlannerPage;

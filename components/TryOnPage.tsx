import React, { useState } from 'react';
import { Upload, X, Loader2, Sparkles, Shirt, User } from 'lucide-react';
import { generateVirtualTryOn } from '../services/geminiService';

const TryOnPage: React.FC = () => {
    const [personImage, setPersonImage] = useState<string | null>(null);
    const [garmentImage, setGarmentImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Helper to read file as base64
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string | null) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setter(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!personImage || !garmentImage) return;
        setLoading(true);
        setResultImage(null);
        try {
            const result = await generateVirtualTryOn(personImage, garmentImage);
            setResultImage(result);
        } catch (error) {
            alert("Failed to generate try-on result. Please check your API key and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 block animate-fade-in">
                    Virtual Atelier
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 animate-fade-in-up">
                    The Fitting Room
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed animate-fade-in-up delay-100">
                    Experience the future of tailoring. Upload your photo and a garment to see our AI weave them together instantly.
                </p>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">

                {/* COL 1: MODEL UPLOAD (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-4 animate-fade-in-left delay-200">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl italic">The Model</h3>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Step 01</span>
                    </div>

                    <div className="relative flex-grow bg-white rounded-none border border-gray-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-gray-300 group overflow-hidden min-h-[400px]">
                        {personImage ? (
                            <>
                                <img src={personImage} alt="Model" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <button
                                    onClick={() => setPersonImage(null)}
                                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-black hover:text-white transition-colors z-10"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-sm font-medium tracking-wide">Base Model Selected</p>
                                </div>
                            </>
                        ) : (
                            <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center text-center p-8 hover:bg-gray-50 transition-colors">
                                <div className="mb-6 p-4 rounded-full border border-gray-200 bg-gray-50 group-hover:border-black transition-colors duration-300">
                                    <User className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
                                </div>
                                <span className="font-serif text-xl mb-2 text-gray-900">Upload Photo</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest">Full Body Shot</span>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPersonImage)} className="hidden" />
                            </label>
                        )}
                    </div>
                </div>

                {/* COL 2: ACTION & GARMENT (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-8 animate-fade-in-up delay-300">

                    {/* Garment Upload */}
                    <div className="flex flex-col gap-4 flex-grow">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif text-xl italic">The Garment</h3>
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Step 02</span>
                        </div>
                        <div className="relative flex-grow bg-white rounded-none border border-gray-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-gray-300 group overflow-hidden min-h-[300px]">
                            {garmentImage ? (
                                <>
                                    <img src={garmentImage} alt="Garment" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <button
                                        onClick={() => setGarmentImage(null)}
                                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-black hover:text-white transition-colors z-10"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center text-center p-8 hover:bg-gray-50 transition-colors">
                                    <div className="mb-6 p-4 rounded-full border border-gray-200 bg-gray-50 group-hover:border-black transition-colors duration-300">
                                        <Shirt className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
                                    </div>
                                    <span className="font-serif text-xl mb-2 text-gray-900">Select Item</span>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">Clothing Image</span>
                                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setGarmentImage)} className="hidden" />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleGenerate}
                            disabled={!personImage || !garmentImage || loading}
                            className={`w-full py-6 px-8 text-center uppercase tracking-[0.2em] text-sm font-bold transition-all duration-300 border ${!personImage || !garmentImage || loading
                                    ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed'
                                    : 'bg-black text-white border-black hover:bg-white hover:text-black hover:shadow-xl'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Stitching...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-3">
                                    <Sparkles className="w-4 h-4" />
                                    Weave Magic
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* COL 3: RESULT SHOWCASE (6 cols) */}
                <div className="lg:col-span-6 flex flex-col gap-4 animate-fade-in-right delay-400">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl italic">The Reveal</h3>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Final Look</span>
                    </div>

                    <div className="relative flex-grow bg-white border border-gray-100 shadow-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        {resultImage ? (
                            <div className="relative w-full h-full animate-fade-in group">
                                <img src={resultImage} alt="Final Look" className="w-full h-full object-contain" />
                                <a href={resultImage} download="dreamup-look.png" className="absolute bottom-8 right-8 bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-colors duration-300 shadow-lg">
                                    Download Look
                                </a>
                            </div>
                        ) : (
                            <div className="text-center p-12 max-w-sm">
                                {loading ? (
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="relative w-24 h-24">
                                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
                                        </div>
                                        <div>
                                            <p className="font-serif text-2xl mb-2">Creating your look</p>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest">AI is at work</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="opacity-30">
                                        <Sparkles className="w-24 h-24 mx-auto mb-6 text-gray-900" />
                                        <p className="font-serif text-3xl text-gray-400">Await the Magic</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TryOnPage;

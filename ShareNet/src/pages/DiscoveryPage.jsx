import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Sparkles, MapPin, Star, ShieldCheck, Bookmark, Check, X, Info, Layers, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function DiscoveryPage() {
    const { resources, savedResourceIds, toggleSaveResource } = useCircularStore();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState(300);
    const [searchQuery, setSearchQuery] = useState('');
    const [detailedProduct, setDetailedProduct] = useState(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const categories = ['All', 'Cameras', 'Tripods', 'Microphones', 'Lighting', 'Sports', 'Projectors'];

    const filteredResources = resources.filter(r => {
        const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
        const matchesPrice = r.dailyCharge <= maxPrice;
        const matchesSearch = (r.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    const handleSaveToggle = (e, rId) => {
        e.stopPropagation();
        toggleSaveResource(rId);
        const isSaved = savedResourceIds.includes(rId);
        toast.success(isSaved ? 'Removed from saved resources' : 'Resource saved to bookmarks!');
    };

    const openProductDetails = (res) => {
        setDetailedProduct(res);
        setActiveImageIdx(0);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-1">
                        <Search size={16} /> Campus Marketplace & Resource Directory
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Discover & Borrow Campus Gear
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Browse verified student resources nearby or use our AI engine for instant equipment setup recommendations.
                    </p>
                </div>

                <Button onClick={() => navigate('/ai-match')} className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold py-2.5 px-4 shadow-md">
                    <Sparkles size={16} className="mr-1" /> Use AI Smart Search
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, camera model, tripod..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto text-xs">
                        <span className="text-slate-500 font-bold whitespace-nowrap">Max Price: ₹{maxPrice}/day</span>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            step="25"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-36 accent-emerald-600"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex overflow-x-auto gap-2 text-xs pt-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                                selectedCategory === cat
                                    ? 'bg-slate-900 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredResources.map((res) => {
                    const isSaved = savedResourceIds.includes(res.id);
                    return (
                        <div 
                            key={res.id} 
                            onClick={() => openProductDetails(res)}
                            className="cursor-pointer bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 relative flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all"
                        >
                            <div className="relative">
                                <img src={res.images[0]} alt={res.title} className="w-full h-44 object-cover rounded-2xl border border-slate-100" />
                                <button
                                    onClick={(e) => handleSaveToggle(e, res.id)}
                                    className={`absolute top-2.5 right-2.5 p-2 rounded-xl border backdrop-blur-md shadow-md transition-transform active:scale-95 ${
                                        isSaved ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-white/80 text-slate-700 border-white'
                                    }`}
                                >
                                    <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                                </button>
                                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold uppercase bg-slate-950/80 text-emerald-400 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                                    {res.category}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{res.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <MapPin size={14} className="text-emerald-600 shrink-0" />
                                    <span>{res.distanceKm} km away ({res.location.split(',')[0]})</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                                    <span>Owner: <strong className="text-slate-800">{res.owner.name}</strong></span>
                                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                                        <Star size={13} fill="currentColor" /> {res.rating}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-base font-black text-slate-900">₹{res.dailyCharge}/day</span>
                                    <span className="block text-[10px] text-slate-400">+ ₹{res.deposit} deposit</span>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/ai-match?prompt=${encodeURIComponent(res.title)}`);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-xs px-4 py-2"
                                >
                                    Borrow Resource
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Glassmorphism Product Detail Popup */}
            {detailedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[32px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative text-slate-800 animate-in zoom-in-95 duration-200">
                        {/* Close button */}
                        <button
                            onClick={() => setDetailedProduct(null)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200/50 text-slate-600 transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Gallery */}
                        <div className="space-y-3">
                            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/20 bg-slate-100/50 shadow-inner">
                                <img
                                    src={detailedProduct.images[activeImageIdx]}
                                    alt={detailedProduct.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-slate-900/80 text-emerald-400 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700">
                                    {detailedProduct.category}
                                </span>
                                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 backdrop-blur-md px-3 py-1 rounded-lg">
                                    {detailedProduct.status || 'Available'}
                                </span>
                            </div>
                            
                            {/* Thumbnails */}
                            {detailedProduct.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto py-1">
                                    {detailedProduct.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIdx(idx)}
                                            className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                                                activeImageIdx === idx ? 'border-emerald-500 scale-105 shadow' : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Header details */}
                        <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{detailedProduct.title}</h2>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} className="text-emerald-600" />
                                    {detailedProduct.location} ({detailedProduct.distanceKm} km away)
                                </span>
                                <span className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Star size={13} fill="currentColor" /> {detailedProduct.rating} ({detailedProduct.reviewsCount} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Owner card in glassmorphism */}
                        <div className="bg-white/40 border border-white/40 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <img
                                    src={detailedProduct.owner.avatar}
                                    alt={detailedProduct.owner.name}
                                    className="w-10 h-10 rounded-full object-cover border border-white"
                                />
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Owner / Student</div>
                                    <h4 className="font-extrabold text-sm text-slate-900">{detailedProduct.owner.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-medium">{detailedProduct.owner.department}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Trust Rating</div>
                                <div className="flex items-center gap-1.5 justify-end mt-0.5">
                                    <Shield size={14} className="text-emerald-600" />
                                    <span className="text-sm font-black text-emerald-800">{detailedProduct.owner.trustScore}%</span>
                                </div>
                                <div className="w-20 bg-slate-200/50 h-1 rounded-full overflow-hidden mt-1 inline-block">
                                    <div className="bg-emerald-500 h-full" style={{ width: `${detailedProduct.owner.trustScore}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Description & specs */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Description</h4>
                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                    {detailedProduct.description || "No description provided for this campus equipment."}
                                </p>
                            </div>

                            {detailedProduct.accessories && detailedProduct.accessories.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Layers size={14} className="text-slate-500" /> Included Accessories
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                                        {detailedProduct.accessories.map((acc, index) => (
                                            <div key={index} className="flex items-center gap-1.5 bg-slate-100/40 border border-slate-200/25 p-2 rounded-xl">
                                                <CheckCircle2 className="text-emerald-600 shrink-0" size={14} />
                                                <span>{acc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {detailedProduct.borrowingConditions && detailedProduct.borrowingConditions.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Info size={14} className="text-slate-500" /> Borrowing Rules
                                    </h4>
                                    <ul className="text-xs text-slate-600 list-disc list-inside space-y-1 bg-amber-50/20 border border-amber-200/10 p-3 rounded-2xl">
                                        {detailedProduct.borrowingConditions.map((cond, index) => (
                                            <li key={index} className="leading-relaxed">{cond}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Availability & Cost panel */}
                        <div className="pt-5 border-t border-slate-200/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                            <div className="space-y-0.5">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Borrowing Charges</div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-xl font-black text-slate-900">₹{detailedProduct.dailyCharge}/day</span>
                                    <span className="text-xs text-slate-500">(+ ₹{detailedProduct.deposit} Refundable Deposit)</span>
                                </div>
                                <div className="text-[10px] text-slate-400">Includes ₹{detailedProduct.platformFee} platform handling fee</div>
                            </div>
                            
                            <div className="flex gap-2 shrink-0">
                                <Button
                                    variant="outline"
                                    onClick={() => setDetailedProduct(null)}
                                    className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1 sm:flex-initial text-xs py-2.5 px-4"
                                >
                                    Close Details
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDetailedProduct(null);
                                        navigate(`/ai-match?prompt=${encodeURIComponent(detailedProduct.title)}`);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 shadow-lg shadow-emerald-600/10 flex-1 sm:flex-initial"
                                >
                                    Instant Book
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Dummy/fallback icon if not defined
function CheckCircle2({ size = 16, className }) {
    return <Check className={`bg-emerald-500/10 text-emerald-600 p-0.5 rounded-full border border-emerald-500/20 ${className}`} size={size} />;
}

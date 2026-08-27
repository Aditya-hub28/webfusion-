import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Sparkles, MapPin, Star, ShieldCheck, Bookmark, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function DiscoveryPage() {
    const { resources, savedResourceIds, toggleSaveResource } = useCircularStore();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState(300);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Cameras', 'Tripods', 'Microphones', 'Lighting', 'Sports', 'Projectors'];

    const filteredResources = resources.filter(r => {
        const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
        const matchesPrice = r.dailyCharge <= maxPrice;
        const matchesSearch = (r.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    const handleSaveToggle = (rId) => {
        toggleSaveResource(rId);
        const isSaved = savedResourceIds.includes(rId);
        toast.success(isSaved ? 'Removed from saved resources' : 'Resource saved to bookmarks!');
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
                        <div key={res.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 relative flex flex-col justify-between">
                            <div className="relative">
                                <img src={res.images[0]} alt={res.title} className="w-full h-44 object-cover rounded-2xl border border-slate-100" />
                                <button
                                    onClick={() => handleSaveToggle(res.id)}
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
                                    <span>{res.distanceKm} km away ({res.location})</span>
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
                                    onClick={() => navigate(`/ai-match?prompt=${encodeURIComponent(res.title)}`)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-xs px-4 py-2"
                                >
                                    Borrow Resource
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

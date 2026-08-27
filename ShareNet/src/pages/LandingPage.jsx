import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCircularStore } from '../stores/circularStore';
import CampusBorrowingLifecycleTrack from '../components/trust/CampusBorrowingLifecycleTrack';
import TenStepVerification from '../components/trust/TenStepVerification';
import {
    Sparkles, Search, ShieldCheck, RefreshCw, Leaf, ArrowRight, Package, Mic,
    Camera, Speaker, Trophy, BookOpen, Tent, Film, CheckCircle2, Star, ChevronDown,
    MapPin, Check, Train
} from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function LandingPage() {
    const [prompt, setPrompt] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Electronics');
    const [openFaq, setOpenFaq] = useState(null);
    const navigate = useNavigate();
    const { resources } = useCircularStore();

    const heroRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
        }
        if (statsRef.current) {
            gsap.fromTo(
                statsRef.current.children,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'back.out(1.7)' }
            );
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchPrompt = prompt || 'I need to shoot a club reel tomorrow under ₹300';
        navigate(`/ai-match?prompt=${encodeURIComponent(searchPrompt)}`);
    };

    const handlePresetPrompt = (presetText) => {
        setPrompt(presetText);
        navigate(`/ai-match?prompt=${encodeURIComponent(presetText)}`);
    };

    const handleMicClick = () => {
        toast.success('Voice Input Enabled: "I need a scientific calculator for exam"');
        setPrompt('I need a scientific calculator for exam');
    };

    const categoryIcons = {
        Electronics: Camera,
        'Event & AV': Speaker,
        Sports: Trophy,
        Academic: BookOpen,
        Camping: Tent
    };

    const categoriesList = ['Electronics', 'Event & AV', 'Sports', 'Academic', 'Camping'];
    const categoryPreviewItems = resources.filter(r => r.category === selectedCategory).slice(0, 3);

    const faqs = [
        {
            q: 'How does the refundable security deposit work?',
            a: 'When you place a borrow request, the deposit amount is held safely in escrow. Once the lender confirms the item is returned in good condition during digital handover, 100% of the deposit is immediately refunded.'
        },
        {
            q: 'Who can list and borrow equipment on Campus Circular?',
            a: 'Campus Circular is exclusive to verified students and faculty. Users must authenticate with their official campus email ID and maintain a minimum Trust Score of 80 to borrow high-value gear.'
        },
        {
            q: 'What happens if an item is accidentally damaged during borrowing?',
            a: 'Lenders can conduct a Digital Return Inspection. Minor wear is expected, but for physical damages, lenders can file a dispute report with photos. Fair repair costs are deducted from the held security deposit with admin arbitration.'
        },
        {
            q: 'How are Multi-Item Equipment Kits created?',
            a: 'Lenders can bundle multiple related items (e.g. 4K Camera + Tripod + Mics + Studio Light) into a single discounted kit bundle inside the Equipment Kits Studio.'
        }
    ];

    return (
        <div className="space-y-16 pb-12">
            {/* HERO SECTION WITH ULTRA GLASSMORPHISM & OBSIDIAN GLOW */}
            <section className="relative overflow-hidden pt-12 pb-20 bg-slate-950/95 backdrop-blur-3xl text-white rounded-b-[48px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-b border-white/10">
                {/* Translucent Neon Ambient Orbs */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/20 blur-[130px] pointer-events-none rounded-full"></div>
                <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-teal-400/15 blur-[120px] pointer-events-none rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-emerald-400/10 blur-[100px] pointer-events-none rounded-full"></div>

                <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center">
                    {/* Badge */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-950/40">
                            <Sparkles size={16} /> Campus Circular Ecosystem • Glassmorphism Engine
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
                        Borrow Anything On Campus.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                            Save Money. Zero Waste.
                        </span>
                    </h1>

                    <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                        Peer-to-peer resource sharing for students. AI-powered intent matching, instant escrow security deposit holds, and 100% verified campus handovers.
                    </p>

                    {/* FROSTED GLASS SEARCH CAPSULE */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
                        <div className="bg-white/10 backdrop-blur-2xl p-2 sm:p-2.5 rounded-3xl sm:rounded-full border-2 border-white/20 shadow-2xl hover:border-emerald-400/60 transition-all flex flex-col sm:flex-row items-center gap-2">
                            <div className="flex items-center gap-3 pl-4 flex-1 w-full">
                                <Search className="text-emerald-400 shrink-0" size={22} />
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder='Ask AI e.g. "I need a 4K DSLR camera for a club shoot under ₹250/day"...'
                                    className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                                <button
                                    type="button"
                                    onClick={handleMicClick}
                                    className="p-3 bg-white/10 hover:bg-white/20 text-emerald-400 rounded-full transition-colors backdrop-blur-md"
                                    title="Voice Input Search"
                                >
                                    <Mic size={18} />
                                </button>
                                <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-emerald-500/25">
                                    AI Match Gear →
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Prompt Presets Pills */}
                    <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Popular Campus Searches:</span>
                        <button onClick={() => handlePresetPrompt('DSLR Camera for film shoot')} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 hover:bg-white/20 hover:text-emerald-400 transition-all font-semibold">
                            📷 DSLR Camera for film shoot
                        </button>
                        <button onClick={() => handlePresetPrompt('Full HD Projector for presentation')} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 hover:bg-white/20 hover:text-emerald-400 transition-all font-semibold">
                            📊 Projector for presentation
                        </button>
                        <button onClick={() => handlePresetPrompt('Cricket bat kit for tournament')} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 hover:bg-white/20 hover:text-emerald-400 transition-all font-semibold">
                            🏏 Cricket Bat Kit
                        </button>
                        <button onClick={() => handlePresetPrompt('4-Person Camping Tent for trek')} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 hover:bg-white/20 hover:text-emerald-400 transition-all font-semibold">
                            ⛺ 4-Person Camping Tent
                        </button>
                    </div>

                    {/* FROSTED GLASS STATS TICKER */}
                    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-2xl border border-white/15 text-center shadow-lg">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-400">₹48,250+</div>
                            <div className="text-[11px] text-slate-300 font-semibold mt-0.5">Student Money Saved</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-2xl border border-white/15 text-center shadow-lg">
                            <div className="text-2xl sm:text-3xl font-black text-white">50+</div>
                            <div className="text-[11px] text-slate-300 font-semibold mt-0.5">Verified Listings</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-2xl border border-white/15 text-center shadow-lg">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-400">3,920</div>
                            <div className="text-[11px] text-slate-300 font-semibold mt-0.5">Successful Exchanges</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-2xl p-4 rounded-2xl border border-white/15 text-center shadow-lg">
                            <div className="text-2xl sm:text-3xl font-black text-white">317 kg</div>
                            <div className="text-[11px] text-slate-300 font-semibold mt-0.5">E-Waste Avoided</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10-STAGE BORROWING LIFE CYCLE EXPRESS (GSAP BULLET POD RAIL TRACK) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CampusBorrowingLifecycleTrack />
            </section>

            {/* 10-STEP SAFETY & TRUST ARCHITECTURE (GSAP BULLET TRAIN RAIL TRACK) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <CampusTrainVerificationTrack />
                <TenStepVerification />
            </section>

            {/* FEATURED CATEGORIES SHOWCASE WITH 5 photos PREVIEW */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Browse By Category</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Explore 5 Campus Categories</h2>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                        {categoriesList.map((cat) => {
                            const IconComp = categoryIcons[cat];
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-2xl font-extrabold flex items-center gap-1.5 transition-all shrink-0 border ${
                                        isSelected
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                                            : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                                    }`}
                                >
                                    <IconComp size={15} className={isSelected ? 'text-emerald-400' : ''} />
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Category Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categoryPreviewItems.map((item) => (
                        <div key={item.id} className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
                            <div className="space-y-3">
                                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100">
                                    <img
                                        src={item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                                        {item.category}
                                    </span>
                                    <span className="absolute bottom-2 right-2 bg-emerald-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-700 flex items-center gap-1">
                                        📷 5 Photos Included
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-base font-black text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 font-medium">
                                        <MapPin size={13} className="text-slate-400 shrink-0" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] text-slate-400 block font-semibold">Daily Rate</span>
                                    <strong className="text-emerald-700 text-base font-black">₹{item.dailyCharge}/day</strong>
                                </div>
                                <Link to={`/discover?search=${encodeURIComponent(item.title)}`}>
                                    <Button size="sm" className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs py-2 px-3.5">
                                        Borrow Gear →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MULTI-ITEM EQUIPMENT KITS STUDIO BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 backdrop-blur-2xl text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-emerald-500/60 space-y-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                    <div className="space-y-2 max-w-2xl relative z-10">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1.5">
                            <Film size={14} /> Multi-Resource Bundles • Glassmorphism Studio
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">Equipment Kits Studio</h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                            Need a complete gear setup? Lenders bundle 4K Cameras + Tripods + Mics + Studio Lights into ready-to-use kits saving you up to ₹80/day!
                        </p>
                    </div>

                    <Link to="/my-lending" className="shrink-0 relative z-10">
                        <Button className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30">
                            Open Equipment Kits Studio →
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
            <section className="max-w-4xl mx-auto px-4 space-y-6">
                <div className="text-center space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Got Questions?</span>
                    <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-3 text-xs">
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaq === idx;
                        return (
                            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                    className="w-full p-4 text-left font-extrabold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                                >
                                    <span className="text-sm">{faq.q}</span>
                                    <ChevronDown size={18} className={`transition-transform text-slate-400 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                                </button>

                                {isOpen && (
                                    <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

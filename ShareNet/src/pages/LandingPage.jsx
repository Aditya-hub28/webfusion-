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
            {/* HERO SECTION WITH GSAP ANIMATIONS */}
            <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white rounded-b-[48px] shadow-2xl border-b border-indigo-900/50">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full"></div>
                <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center">
                    {/* Badge */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-400 text-xs font-black uppercase tracking-widest shadow-lg">
                            <Sparkles size={16} /> Campus Circular Ecosystem • GSAP Animated Engine
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight">
                        WHY BUY WHAT SOMEONE NEARBY ALREADY HAS?
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium">
                        The #1 Peer-to-Peer Campus Resource Sharing Platform. Borrow 50+ verified cameras, laptops, projectors, sports kits & lab tools from trusted peers.
                    </p>

                    {/* HERO AI Search Box */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                        <div className="bg-slate-900/90 backdrop-blur-xl p-3 rounded-3xl border-2 border-emerald-500/80 shadow-2xl flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 gap-3">
                                <Sparkles className="text-emerald-400 shrink-0" size={22} />
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Tell us what you need... e.g. 'I need a scientific calculator for exam'"
                                    className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none py-2 font-semibold"
                                />
                                <button
                                    type="button"
                                    onClick={handleMicClick}
                                    className="text-slate-400 hover:text-emerald-400 p-1.5 transition-colors"
                                    title="Click to use voice input"
                                >
                                    <Mic size={20} />
                                </button>
                            </div>
                            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-7 py-3.5 rounded-2xl shadow-lg shrink-0 flex items-center justify-center gap-2">
                                <Sparkles size={16} /> Discover with AI
                            </Button>
                        </div>
                    </form>

                    {/* Quick Search Prompts */}
                    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto text-xs pt-2">
                        <span className="text-slate-400 font-extrabold self-center mr-1">Popular Campus Needs:</span>
                        <button
                            onClick={() => handlePresetPrompt('I need to shoot a club reel tomorrow under ₹300')}
                            className="bg-slate-800/90 hover:bg-emerald-950 text-emerald-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-all font-bold"
                        >
                            🎬 "Shoot a club reel"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need a podcast microphone setup')}
                            className="bg-slate-800/90 hover:bg-emerald-950 text-teal-300 border border-slate-700 px-3 py-1.5 rounded-all font-bold"
                        >
                            🎙️ "Podcast setup"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need a projector for a presentation tomorrow')}
                            className="bg-slate-800/90 hover:bg-emerald-950 text-indigo-300 border border-slate-700 px-3 py-1.5 rounded-all font-bold"
                        >
                            📊 "Projector for presentation"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need a cricket bat kit for a weekend match')}
                            className="bg-slate-800/90 hover:bg-emerald-950 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-all font-bold"
                        >
                            🏏 "Cricket bat match kit"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need camping tent equipment for outdoor trekking')}
                            className="bg-slate-800/90 hover:bg-emerald-950 text-purple-300 border border-slate-700 px-3 py-1.5 rounded-all font-bold"
                        >
                            ⛺ "Camping tent & trekking"
                        </button>
                    </div>

                    {/* Secondary Action CTAs */}
                    <div className="flex justify-center gap-4 pt-4">
                        <Link to="/discover">
                            <Button className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md">
                                <Package size={16} className="mr-1.5 text-emerald-600" /> Explore 50+ Listings
                            </Button>
                        </Link>
                        <Link to="/my-lending">
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md">
                                <Film size={16} className="mr-1.5" /> Equipment Kits Studio
                            </Button>
                        </Link>
                    </div>

                    {/* Impact Stats Strip with GSAP Stagger */}
                    <div ref={statsRef} className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto text-xs">
                        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 space-y-1">
                            <div className="font-black text-emerald-400 text-2xl">₹48,250</div>
                            <div className="text-slate-400 text-[11px] font-bold uppercase">Est. Student Money Saved</div>
                        </div>
                        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 space-y-1">
                            <div className="font-black text-white text-2xl">50+</div>
                            <div className="text-slate-400 text-[11px] font-bold uppercase">Available Campus Items</div>
                        </div>
                        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 space-y-1">
                            <div className="font-black text-indigo-300 text-2xl">94.8%</div>
                            <div className="text-slate-400 text-[11px] font-bold uppercase">On-Time Return Rate</div>
                        </div>
                        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 space-y-1">
                            <div className="font-black text-amber-400 text-2xl">317 kg</div>
                            <div className="text-slate-400 text-[11px] font-bold uppercase">Est. Waste Avoided</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAMPUS BORROWING LIFE CYCLE BULLET TRAIN RAIL TRACK 🚄 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CampusBorrowingLifecycleTrack />
            </section>

            {/* 10-STEP SAFETY & VERIFICATION ARCHITECTURE MATRIX */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TenStepVerification />
            </section>

            {/* 5 FEATURED CAMPUS CATEGORIES SHOWCASE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Categorized Catalog</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Explore 5 Campus Categories</h2>
                    </div>
                    <Link to="/discover">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl">
                            View All 50 Items →
                        </Button>
                    </Link>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 text-xs">
                    {categoriesList.map((cat) => {
                        const Icon = categoryIcons[cat];
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2.5 rounded-2xl font-extrabold flex items-center gap-2 transition-all shrink-0 border ${
                                    selectedCategory === cat
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                                }`}
                            >
                                <Icon size={16} /> {cat} ({resources.filter(r => r.category === cat).length})
                            </button>
                        );
                    })}
                </div>

                {/* Selected Category Preview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categoryPreviewItems.map((item) => (
                        <div key={item.id} className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
                            <div className="space-y-3">
                                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                                    <img
                                        src={item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                    <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-slate-700">
                                        📷 5 Photos
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-sm font-black text-slate-900 line-clamp-1">{item.title}</h4>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                                        <MapPin size={13} className="text-slate-400" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-slate-400 block">Daily Fee</span>
                                    <strong className="text-emerald-700 text-sm font-black">₹{item.dailyCharge}/day</strong>
                                </div>
                                <Link to={`/discover`}>
                                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl">
                                        Borrow Item
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MULTI-RESOURCE EQUIPMENT KITS STUDIO BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-indigo-500/80 space-y-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1.5">
                            <Film size={14} /> Multi-Resource Bundles
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black text-white">Equipment Kits Studio</h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                            Need a complete gear setup? Lenders bundle 4K Cameras + Tripods + Mics + Studio Lights into ready-to-use kits saving you up to ₹80/day!
                        </p>
                    </div>

                    <Link to="/my-lending" className="shrink-0">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg">
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

            {/* FOOTER */}
            <footer className="border-t border-slate-200 pt-10 pb-6 bg-slate-900 text-white rounded-t-[40px] text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-black text-emerald-400">Campus Circular</h3>
                            <p className="text-slate-400">Peer-to-Peer Resource Sharing & Circular Economy Engine</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-slate-300 font-bold">
                            <Link to="/discover" className="hover:text-emerald-400">Discover Catalog</Link>
                            <Link to="/ai-match" className="hover:text-emerald-400">AI Match</Link>
                            <Link to="/my-borrowings" className="hover:text-emerald-400">My Borrowings</Link>
                            <Link to="/my-lending" className="hover:text-emerald-400">Equipment Kits</Link>
                            <Link to="/impact" className="hover:text-emerald-400">Impact Ledger</Link>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px]">
                        © 2026 Campus Circular Economy Platform. TSEC Webfusion 2.0 Hackathon Project. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

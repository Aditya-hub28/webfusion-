import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, ShieldCheck, RefreshCw, Leaf, ArrowRight, Package, Mic } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function LandingPage() {
    const [prompt, setPrompt] = useState('');
    const navigate = useNavigate();

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
        toast.success('Voice Input Enabled: "I need to shoot a club reel tomorrow under ₹300"');
        setPrompt('I need to shoot a club reel tomorrow under ₹300');
    };

    return (
        <div className="space-y-16 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 text-white rounded-b-[40px] shadow-2xl border-b border-indigo-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={16} /> Campus Circular Ecosystem • AI Powered
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
                        WHY BUY WHAT SOMEONE NEARBY ALREADY HAS?
                    </h1>

                    <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto">
                        Find, borrow and share resources from trusted verified members of your campus community.
                    </p>

                    {/* HERO AI Search Box */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-xl p-3 rounded-3xl border-2 border-emerald-500/80 shadow-2xl flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 gap-3">
                                <Sparkles className="text-emerald-400 shrink-0" size={22} />
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Tell us what you need... e.g. 'I need to shoot a club reel tomorrow under ₹300'"
                                    className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none py-2"
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
                            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shrink-0 flex items-center justify-center gap-2">
                                <Sparkles size={16} /> Discover with AI
                            </Button>
                        </div>
                    </form>

                    {/* 12+ Preset Intent Prompt Suggestion Pills */}
                    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto text-xs pt-2">
                        <span className="text-slate-400 font-bold self-center mr-1">Popular Campus Intents:</span>
                        <button
                            onClick={() => handlePresetPrompt('I need to shoot a club reel tomorrow under ₹300')}
                            className="bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                        >
                            🎬 "Shoot a club reel under ₹300"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need a podcast microphone setup')}
                            className="bg-slate-800/80 hover:bg-slate-700 text-teal-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                        >
                            🎙️ "Podcast recording setup"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need a projector for a presentation tomorrow')}
                            className="bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                        >
                            📊 "Projector for presentation"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need a cricket bat kit for a weekend match')}
                            className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                        >
                            🏏 "Cricket bat kit for weekend"
                        </button>
                        <button
                            onClick={() => handlePresetPrompt('I need camping tent equipment for outdoor trekking')}
                            className="bg-slate-800/80 hover:bg-slate-700 text-purple-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                        >
                            ⛺ "Camping tent & trekking gear"
                        </button>
                    </div>

                    {/* Impact Highlights */}
                    <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs">
                        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700">
                            <div className="font-extrabold text-white text-base">₹48,250</div>
                            <div className="text-slate-400 text-[11px]">Est. Money Saved</div>
                        </div>
                        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700">
                            <div className="font-extrabold text-emerald-400 text-base">462</div>
                            <div className="text-slate-400 text-[11px]">Resources Shared</div>
                        </div>
                        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700">
                            <div className="font-extrabold text-indigo-300 text-base">94.8%</div>
                            <div className="text-slate-400 text-[11px]">On-Time Returns</div>
                        </div>
                        <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700">
                            <div className="font-extrabold text-amber-400 text-base">317 kg</div>
                            <div className="text-slate-400 text-[11px]">Est. Waste Avoided</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

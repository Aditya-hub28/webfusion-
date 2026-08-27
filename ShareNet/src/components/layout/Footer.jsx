import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Heart, ShieldCheck, Sparkles, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-950 text-white border-t border-slate-800/80 pt-12 pb-8 mt-16 text-xs relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Brand Logo & Tagline */}
                    <div className="space-y-2 max-w-md">
                        <Link to="/" className="flex items-center space-x-2 shrink-0 group">
                            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/20">
                                <RefreshCw className="w-4 h-4 text-slate-950 font-black animate-spin-slow" />
                            </div>
                            <span className="text-base font-black text-white tracking-tight">
                                Campus Circular
                            </span>
                        </Link>
                        <p className="text-slate-400 text-xs leading-relaxed font-medium">
                            The #1 Peer-to-Peer Campus Resource Sharing & Circular Economy Platform. Save money, reduce e-waste, and unlock idle campus assets safely.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap gap-6 text-slate-300 font-extrabold text-xs">
                        <Link to="/discover" className="hover:text-emerald-400 transition-colors">Discover Catalog</Link>
                        <Link to="/ai-match" className="hover:text-emerald-400 transition-colors">AI Match Engine</Link>
                        <Link to="/my-borrowings" className="hover:text-emerald-400 transition-colors">My Borrowings</Link>
                        <Link to="/my-lending" className="hover:text-emerald-400 transition-colors">Equipment Kits Studio</Link>
                        <Link to="/impact" className="hover:text-emerald-400 transition-colors">Impact Ledger</Link>
                        <Link to="/trust-profile" className="hover:text-emerald-400 transition-colors">Trust & Safety</Link>
                        <Link to="/admin-panel" className="hover:text-emerald-400 transition-colors">Admin Governance</Link>
                    </div>
                </div>

                {/* Bottom Copyright Strip */}
                <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-[11px] font-semibold">
                    <div>
                        © 2026 Campus Circular Economy Platform. TSEC Webfusion 2.0 Hackathon Project.
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <span>Built with React, Tailwind & GSAP</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

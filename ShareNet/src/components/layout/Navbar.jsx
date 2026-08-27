import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, Search, Sparkles, RefreshCw, BarChart2, ShieldCheck, Heart, Inbox, UserCheck, Shield, ChevronDown } from 'lucide-react';
import { useCircularStore } from '../../stores/circularStore';
import { Avatar } from '../ui';
import ResetDemoButton from '../ui/ResetDemoButton';
import toast from 'react-hot-toast';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { persona, setPersona, notificationsCount, userTrustScore } = useCircularStore();
    const navigate = useNavigate();

    const currentRoleTrust = persona === 'borrower' ? userTrustScore :
                             persona === 'owner' ? 98 : 100;

    const handlePersonaSwitch = (newPersona) => {
        setPersona(newPersona);
        setShowDropdown(false);
        const name = newPersona === 'borrower' ? 'Aditya Sharma (Borrower • Trust 94)' :
                     newPersona === 'owner' ? 'Priya Patel (Lender • Trust 98)' : 'Campus Admin (Governance)';
        toast.success(`Switched role to: ${name}`);

        if (newPersona === 'admin') {
            navigate('/admin-panel');
        } else if (newPersona === 'owner') {
            navigate('/my-lending');
        } else {
            navigate('/my-borrowings');
        }
    };

    const navLinks = [
        { to: '/discover', label: 'Discover', icon: Search },
        { to: '/ai-match', label: 'AI Match', icon: Sparkles, highlight: true },
        { to: '/my-borrowings', label: 'My Borrowings', icon: RefreshCw },
        { to: '/my-lending', label: 'My Lending', icon: Inbox },
        { to: '/messages', label: 'Messages', icon: Heart },
        { to: '/impact', label: 'Impact', icon: BarChart2 },
    ];

    if (persona === 'admin') {
        navLinks.push({ to: '/admin-panel', label: 'Admin', icon: ShieldCheck });
    }

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm sticky top-0 z-40 transition-all">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 shrink-0 group">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin-slow" />
                            </div>
                            <div>
                                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight block leading-none">
                                    Campus Circular
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 tracking-wider uppercase block mt-0.5">
                                    Circular Economy
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Glassmorphism Nav Links */}
                        <div className="hidden lg:flex ml-6 xl:ml-8 space-x-1.5">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-extrabold transition-all shadow-sm ${
                                        link.highlight
                                            ? 'bg-emerald-500/15 backdrop-blur-md text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30 shadow-emerald-500/10'
                                            : 'bg-slate-100/70 backdrop-blur-sm text-slate-700 hover:bg-white/90 hover:text-slate-900 border border-slate-200/80'
                                    }`}
                                >
                                    <link.icon size={15} />
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="hidden md:block">
                            <ResetDemoButton />
                        </div>

                        {/* Glassmorphism Trust Badge */}
                        <Link to="/trust-profile" className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-emerald-50/80 backdrop-blur-md border border-emerald-200/80 rounded-2xl text-[11px] sm:text-xs font-extrabold text-slate-800 hover:bg-emerald-100/80 transition-all shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Trust: <strong className="text-emerald-700">{currentRoleTrust}/100</strong></span>
                        </Link>

                        {/* Notifications */}
                        <Link to="/notifications" className="relative p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 transition-colors">
                            <Bell size={18} className="sm:w-5 sm:h-5" />
                            {notificationsCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 text-slate-950 font-black text-[9px] sm:text-[10px] rounded-full flex items-center justify-center shadow-sm">
                                    {notificationsCount}
                                </span>
                            )}
                        </Link>

                        {/* Glassmorphism User & Role Switcher Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-1.5 sm:space-x-2 p-1.5 rounded-2xl border border-slate-200/80 hover:bg-white/90 transition-all bg-white/70 backdrop-blur-md shadow-sm"
                            >
                                <Avatar
                                    src={persona === 'borrower' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                                    name={persona === 'borrower' ? 'Aditya Sharma' : persona === 'owner' ? 'Priya Patel' : 'Campus Admin'}
                                    size="sm"
                                />
                                <span className="hidden sm:block text-xs font-extrabold text-slate-800">
                                    {persona === 'borrower' ? 'Aditya (94)' : persona === 'owner' ? 'Priya (98)' : 'Admin'}
                                </span>
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 p-2 z-50 space-y-1">
                                    <div className="px-3 py-2 border-b border-slate-100/80">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                            Switch Persona & Trust Profile
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handlePersonaSwitch('borrower')}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                                            persona === 'borrower' ? 'bg-emerald-50/80 text-emerald-800 border border-emerald-200/80' : 'text-slate-700 hover:bg-slate-50/80'
                                        }`}
                                    >
                                        <UserCheck size={16} className="text-emerald-600 shrink-0" />
                                        <div>
                                            <span className="block font-bold">Aditya Sharma (Borrower)</span>
                                            <span className="text-[10px] text-emerald-600 font-semibold">Trust Score: 94/100</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handlePersonaSwitch('owner')}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                                            persona === 'owner' ? 'bg-indigo-50/80 text-indigo-800 border border-indigo-200/80' : 'text-slate-700 hover:bg-slate-50/80'
                                        }`}
                                    >
                                        <UserCheck size={16} className="text-indigo-600 shrink-0" />
                                        <div>
                                            <span className="block font-bold">Priya Patel (Lender)</span>
                                            <span className="text-[10px] text-indigo-600 font-semibold">Trust Score: 98/100</span>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handlePersonaSwitch('admin')}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                                            persona === 'admin' ? 'bg-amber-50/80 text-amber-800 border border-amber-200/80' : 'text-slate-700 hover:bg-slate-50/80'
                                        }`}
                                    >
                                        <Shield size={16} className="text-amber-600 shrink-0" />
                                        <div>
                                            <span className="block font-bold">Campus Administrator</span>
                                            <span className="text-[10px] text-amber-600 font-semibold">Governance Mode</span>
                                        </div>
                                    </button>

                                    <div className="pt-1 border-t border-slate-100/80">
                                        <Link
                                            to="/trust-profile"
                                            onClick={() => setShowDropdown(false)}
                                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50/80 rounded-xl"
                                        >
                                            <User size={16} /> View Trust Profile Details
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100/80 rounded-xl transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Glassmorphism Mobile Drawer */}
                {isOpen && (
                    <div className="lg:hidden py-3 border-t border-slate-100/80 space-y-1.5 bg-white/95 backdrop-blur-2xl rounded-b-3xl shadow-xl px-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                                    link.highlight
                                        ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                                        : 'text-slate-700 hover:bg-slate-100/80'
                                }`}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

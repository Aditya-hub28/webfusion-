import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Menu, X, Bell, User, Search, Sparkles, RefreshCw, BarChart2,
    ShieldCheck, Heart, Inbox, UserCheck, Shield, ChevronDown, CheckCircle2, Clock
} from 'lucide-react';
import { useCircularStore } from '../../stores/circularStore';
import { Avatar } from '../ui';
import ResetDemoButton from '../ui/ResetDemoButton';
import toast from 'react-hot-toast';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNotifPopover, setShowNotifPopover] = useState(false);

    const { persona, setPersona, notificationsCount, notifications, userTrustScore } = useCircularStore();
    const navigate = useNavigate();
    const location = useLocation();

    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifPopover(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentRoleTrust = persona === 'borrower' ? userTrustScore :
                             persona === 'owner' ? 98 : 100;

    const handlePersonaSwitch = (newPersona) => {
        setPersona(newPersona);
        setShowDropdown(false);
        const name = newPersona === 'borrower' ? 'Aditya Sharma (Borrower • Trust 94)' :
                     newPersona === 'owner' ? 'Priya Patel (Lender • Trust 98)' : 'Campus Admin (Governance)';
        toast.success(`Active Role: ${name}`);

        if (newPersona === 'admin') {
            navigate('/admin-panel');
        } else if (newPersona === 'owner') {
            navigate('/my-lending');
        } else {
            navigate('/my-borrowings');
        }
    };

    // Nav Links array dynamically tailored per persona (Discover, AI Match, Borrowing/Lending, Messages, Impact)
    const navLinks = [
        { to: '/discover', label: 'Discover', icon: Search },
        { to: '/ai-match', label: 'AI Match', icon: Sparkles, highlight: true },
    ];

    if (persona === 'borrower') {
        navLinks.push({ to: '/my-borrowings', label: 'My Borrowing', icon: RefreshCw });
    } else if (persona === 'owner') {
        navLinks.push({ to: '/my-lending', label: 'My Lending', icon: Inbox });
    } else if (persona === 'admin') {
        navLinks.push({ to: '/admin-panel', label: 'Admin Panel', icon: ShieldCheck });
    }

    navLinks.push({ to: '/messages', label: 'Messages', icon: Heart });
    navLinks.push({ to: '/impact', label: 'Impact', icon: BarChart2 });

    const mockNotifications = [];

    return (
        <header className="sticky top-2 z-50 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* ONE PILL GLASSMORPHISM CONTAINER (Zero Overlapping Guarantee) */}
            <div className="bg-white/85 backdrop-blur-2xl border border-white/80 shadow-xl shadow-slate-950/5 rounded-full px-3 sm:px-4 py-2 flex items-center justify-between gap-2 transition-all">
                
                {/* 1. Logo Pill */}
                <Link to="/" className="flex items-center space-x-2 shrink-0 group pr-1">
                    <div className="w-8 h-8 bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
                        <RefreshCw className="w-4 h-4 text-white animate-spin-slow" />
                    </div>
                    <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight whitespace-nowrap hidden xs:inline group-hover:text-emerald-600 transition-colors">
                        Campus Circular
                    </span>
                </Link>

                {/* 2. Center Glass Links Pill Bar (Desktop) */}
                <div className="hidden lg:flex items-center space-x-1 shrink-0 bg-slate-100/60 backdrop-blur-md p-1 rounded-full border border-slate-200/60">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap shrink-0 ${
                                    isActive
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                                        : link.highlight
                                        ? 'bg-emerald-500/20 text-emerald-800 hover:bg-emerald-500/30 border border-emerald-500/30'
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
                                }`}
                            >
                                <link.icon size={14} className={isActive ? 'text-white' : ''} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* 3. Right Control Tools Pill Group (Non-Overlapping) */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <div className="hidden md:block shrink-0">
                        <ResetDemoButton />
                    </div>

                    {/* Trust Score Pill */}
                    <Link
                        to="/trust-profile"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/80 backdrop-blur-md border border-emerald-200/80 rounded-full text-xs font-extrabold text-slate-800 hover:bg-emerald-100/80 transition-all shrink-0 group"
                        title="View Trust Profile"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                        <span className="hidden sm:inline text-slate-600 font-semibold">Trust:</span>
                        <strong className="text-emerald-700 group-hover:underline">{currentRoleTrust}/100</strong>
                    </Link>

                    {/* Notifications Pill */}
                    <div className="relative shrink-0" ref={notifRef}>
                        <button
                            onClick={() => setShowNotifPopover(!showNotifPopover)}
                            className="relative p-2 text-slate-700 hover:bg-slate-100/80 rounded-full transition-all flex items-center justify-center"
                            title="Notifications"
                        >
                            <Bell size={18} />
                            {notificationsCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center shadow-sm">
                                    {notificationsCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Popover */}
                        {showNotifPopover && (
                            <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                        <Bell size={14} className="text-emerald-600" /> Notifications
                                    </span>
                                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                                        {notificationsCount} New
                                    </span>
                                </div>

                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {(notifications || []).map((n) => {
                                        let Icon = CheckCircle2;
                                        let color = 'text-emerald-500';
                                        if (n.type === 'reminder') {
                                            Icon = Clock;
                                            color = 'text-amber-500';
                                        } else if (n.type === 'trust') {
                                            Icon = ShieldCheck;
                                            color = 'text-indigo-500';
                                        }
                                        return (
                                            <div key={n.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-2.5 text-xs">
                                                <Icon size={16} className={`${color} shrink-0 mt-0.5`} />
                                                <div className="space-y-0.5">
                                                    <span className="font-bold text-slate-900 block">{n.title}</span>
                                                    <p className="text-[11px] text-slate-500 leading-tight">{n.text}</p>
                                                    <span className="text-[9px] text-slate-400 font-medium block pt-0.5">{n.time}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile & Persona Switcher Pill */}
                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full border border-slate-200/80 hover:bg-white transition-all bg-white/80 backdrop-blur-md shadow-sm"
                        >
                            <Avatar
                                src={persona === 'borrower' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                                name={persona === 'borrower' ? 'Aditya Sharma' : persona === 'owner' ? 'Priya Patel' : 'Campus Admin'}
                                size="sm"
                            />
                            <span className="hidden md:block text-xs font-extrabold text-slate-800 whitespace-nowrap">
                                {persona === 'borrower' ? 'Aditya' : persona === 'owner' ? 'Priya' : 'Admin'}
                            </span>
                            <ChevronDown size={14} className="text-slate-400 shrink-0" />
                        </button>

                        {/* Persona Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 p-2 z-50 space-y-1">
                                <div className="px-3 py-2 border-b border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Switch Persona & Profile
                                    </span>
                                </div>

                                <button
                                    onClick={() => handlePersonaSwitch('borrower')}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                                        persona === 'borrower' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-slate-700 hover:bg-slate-50'
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
                                        persona === 'owner' ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' : 'text-slate-700 hover:bg-slate-50'
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
                                        persona === 'admin' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                >
                                    <Shield size={16} className="text-amber-600 shrink-0" />
                                    <div>
                                        <span className="block font-bold">Campus Administrator</span>
                                        <span className="text-[10px] text-amber-600 font-semibold">Governance Mode</span>
                                    </div>
                                </button>

                                <div className="pt-1 border-t border-slate-100">
                                    <Link
                                        to="/trust-profile"
                                        onClick={() => setShowDropdown(false)}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
                                    >
                                        <User size={16} /> View Profile & Trust Details
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Drawer Trigger */}
                    <button
                        className="lg:hidden p-2 text-slate-700 hover:bg-slate-100/80 rounded-full transition-colors shrink-0"
                        onClick={() => setIsOpen(!isOpen)}
                        title="Toggle Menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Glassmorphism Navigation Drawer */}
            {isOpen && (
                <div className="lg:hidden mt-2 p-3 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 space-y-1.5">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                                    isActive
                                        ? 'bg-emerald-600 text-white font-extrabold shadow-md'
                                        : link.highlight
                                        ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}

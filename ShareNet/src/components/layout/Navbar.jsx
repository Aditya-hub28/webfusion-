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

    const { persona, setPersona, notificationsCount, userTrustScore } = useCircularStore();
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

    const mockNotifications = [
        { id: 1, title: 'Borrow Request Accepted', text: 'Priya Patel accepted your Sony Alpha Camera request.', time: '5m ago', icon: CheckCircle2, color: 'text-emerald-500' },
        { id: 2, title: 'Return Deadline Reminder', text: 'Return due in 18 hours for Sony Alpha A7 III.', time: '1h ago', icon: Clock, color: 'text-amber-500' },
        { id: 3, title: 'Trust Score Increased', text: 'Your campus trust score bunted to 94/100.', time: '1d ago', icon: ShieldCheck, color: 'text-indigo-500' }
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-sm sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
                            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
                                <RefreshCw className="w-5 h-5 text-white animate-spin-slow" />
                            </div>
                            <div>
                                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight block leading-none group-hover:text-emerald-600 transition-colors">
                                    Campus Circular
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 tracking-wider uppercase block mt-0.5">
                                    Circular Campus Economy
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Glassmorphism Navigation Link Pills */}
                        <div className="hidden lg:flex ml-6 xl:ml-8 space-x-1.5">
                            {navLinks.map(link => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all shadow-sm ${
                                            isActive
                                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                                                : link.highlight
                                                ? 'bg-emerald-500/15 backdrop-blur-md text-emerald-700 hover:bg-emerald-500/25 border border-emerald-500/30'
                                                : 'bg-slate-100/70 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200/80'
                                        }`}
                                    >
                                        <link.icon size={15} className={isActive ? 'text-white' : ''} />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Toolbar Controls */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="hidden md:block">
                            <ResetDemoButton />
                        </div>

                        {/* Glassmorphism Trust Score Badge */}
                        <Link
                            to="/trust-profile"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/80 backdrop-blur-md border border-emerald-200/80 rounded-2xl text-xs font-extrabold text-slate-800 hover:bg-emerald-100/80 transition-all shadow-sm group"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="hidden xs:inline text-slate-600">Trust:</span>
                            <strong className="text-emerald-700 group-hover:underline">{currentRoleTrust}/100</strong>
                        </Link>

                        {/* Notifications Popover */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setShowNotifPopover(!showNotifPopover)}
                                className="relative p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/80 transition-all"
                                title="Notifications"
                            >
                                <Bell size={19} />
                                {notificationsCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center shadow-sm animate-bounce">
                                        {notificationsCount}
                                    </span>
                                )}
                            </button>

                            {showNotifPopover && (
                                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 p-4 z-50 space-y-3">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                            <Bell size={14} className="text-emerald-600" /> Notifications
                                        </span>
                                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                                            {notificationsCount} New
                                        </span>
                                    </div>

                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {mockNotifications.map((n) => (
                                            <div key={n.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-2.5 text-xs">
                                                <n.icon size={16} className={`${n.color} shrink-0 mt-0.5`} />
                                                <div className="space-y-0.5">
                                                    <span className="font-bold text-slate-900 block">{n.title}</span>
                                                    <p className="text-[11px] text-slate-500 leading-tight">{n.text}</p>
                                                    <span className="text-[9px] text-slate-400 font-medium block pt-0.5">{n.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Persona Switcher Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 p-1.5 rounded-2xl border border-slate-200/80 hover:bg-white transition-all bg-white/70 backdrop-blur-md shadow-sm"
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
                                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 p-2 z-50 space-y-1">
                                    <div className="px-3 py-2 border-b border-slate-100">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                            Switch Persona & Trust Profile
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
                                            <User size={16} /> View Trust Profile Details
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Drawer Button */}
                        <button
                            className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {isOpen && (
                    <div className="lg:hidden py-3 border-t border-slate-100 space-y-1.5 bg-white/95 backdrop-blur-2xl rounded-b-3xl shadow-xl px-2">
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
            </div>
        </nav>
    );
}

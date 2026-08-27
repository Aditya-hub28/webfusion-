import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    Search, MessageSquare, Lock, Camera, QrCode, Clock,
    CheckCircle2, DollarSign, Star, RefreshCw, Train, Sparkles, Play, Pause
} from 'lucide-react';

export default function CampusBorrowingLifecycleTrack() {
    const [currentStage, setCurrentStage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const trainRef = useRef(null);

    const stages = [
        {
            num: 1,
            title: 'Stage 1: AI Need-Based Discovery',
            icon: Search,
            color: 'from-emerald-400 to-teal-500',
            bgGlow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-400',
            details: 'Describe your equipment need in natural language or search 50+ campus resources matched instantly by AI.'
        },
        {
            num: 2,
            title: 'Stage 2: Peer Inquiry & Date Lock',
            icon: MessageSquare,
            color: 'from-teal-400 to-blue-500',
            bgGlow: 'shadow-teal-500/20',
            textColor: 'text-teal-400',
            details: 'Connect directly with verified equipment owners on campus and lock your borrowing calendar dates.'
        },
        {
            num: 3,
            title: 'Stage 3: Escrow Security Deposit Lock',
            icon: Lock,
            color: 'from-blue-500 to-indigo-600',
            bgGlow: 'shadow-blue-500/20',
            textColor: 'text-blue-400',
            details: 'Pay borrowing fee + refundable security deposit safely held in platform escrow protection.'
        },
        {
            num: 4,
            title: 'Stage 4: Pre-Handover Photo Inspection',
            icon: Camera,
            color: 'from-indigo-500 to-purple-600',
            bgGlow: 'shadow-indigo-500/20',
            textColor: 'text-indigo-400',
            details: 'Both parties conduct a 5-photo condition check logging lens, screen, body, and included accessories.'
        },
        {
            num: 5,
            title: 'Stage 5: Encrypted QR Code Handover',
            icon: QrCode,
            color: 'from-purple-500 to-pink-600',
            bgGlow: 'shadow-purple-500/20',
            textColor: 'text-purple-400',
            details: 'Meet in-person on campus and scan encrypted QR codes to digitally authorize gear release.'
        },
        {
            num: 6,
            title: 'Stage 6: Active Equipment Usage',
            icon: Clock,
            color: 'from-pink-500 to-rose-600',
            bgGlow: 'shadow-pink-500/20',
            textColor: 'text-pink-400',
            details: 'Use the equipment for your shoot, presentation, or match with real-time automated SMS return reminders.'
        },
        {
            num: 7,
            title: 'Stage 7: In-Person Return Meeting',
            icon: CheckCircle2,
            color: 'from-amber-500 to-orange-600',
            bgGlow: 'shadow-amber-500/20',
            textColor: 'text-amber-400',
            details: 'Meet the owner on campus to return the equipment and complete digital return verification.'
        },
        {
            num: 8,
            title: 'Stage 8: Instant Escrow Deposit Release',
            icon: DollarSign,
            color: 'from-emerald-400 to-green-500',
            bgGlow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-400',
            details: '100% of held security deposit is immediately credited back to borrower after clean return check.'
        },
        {
            num: 9,
            title: 'Stage 9: Mutual Reputation & Trust Rating',
            icon: Star,
            color: 'from-yellow-400 to-amber-500',
            bgGlow: 'shadow-yellow-500/20',
            textColor: 'text-yellow-400',
            details: 'Both borrower and lender leave mutual reviews, boosting 7-factor campus Trust Scores (0-100).'
        },
        {
            num: 10,
            title: 'Stage 10: Circular Impact Ledger Logged',
            icon: RefreshCw,
            color: 'from-teal-300 to-emerald-400',
            bgGlow: 'shadow-teal-400/20',
            textColor: 'text-emerald-300',
            details: 'Money saved, e-waste avoided, and CO2 offset are automatically credited to your personal Impact Ledger.'
        }
    ];

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStage((prev) => (prev + 1) % stages.length);
            }, 3200);
        }
        return () => clearInterval(interval);
    }, [isPlaying, stages.length]);

    useEffect(() => {
        if (trainRef.current) {
            const percentage = (currentStage / (stages.length - 1)) * 100;
            gsap.to(trainRef.current, {
                left: `${percentage}%`,
                duration: 0.8,
                ease: 'back.out(1.4)'
            });
        }
    }, [currentStage, stages.length]);

    const activeStageObj = stages[currentStage];
    const ActiveIcon = activeStageObj.icon;

    return (
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-indigo-900/60 space-y-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Header Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6 relative z-10">
                <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1.5 shadow-sm">
                        <Train size={15} /> Campus Express • Complete Borrowing Life Cycle Track
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                        The 10-Stage Borrowing Life Cycle Express
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        Watch the Campus Bullet Pod 🚄 glide through all 10 stages from AI discovery to deposit release and impact logging.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 bg-slate-800/90 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 transition-colors shadow-sm"
                    >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                        {isPlaying ? 'Pause Express' : 'Autoplay Express'}
                    </button>
                </div>
            </div>

            {/* RAIL TRACK CONTAINER */}
            <div className="relative pt-12 pb-8 px-4 z-10">
                {/* Glowing Rail Track Line */}
                <div className="h-3.5 bg-slate-800/90 rounded-full w-full relative border border-slate-700/80 overflow-visible">
                    {/* Active Progress Fill Line */}
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
                    ></div>

                    {/* GSAP ANIMATED HIGH-TECH BULLET POD 🚄 */}
                    <div
                        ref={trainRef}
                        className="absolute -top-6.5 -translate-x-1/2 z-30 transition-all cursor-pointer"
                        style={{ left: '0%' }}
                    >
                        <div className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 text-slate-950 px-3 py-1.5 rounded-2xl shadow-[0_0_20px_rgba(52,211,153,0.8)] border-2 border-white flex items-center gap-1.5 font-black text-xs">
                            <Train size={18} className="text-slate-950" />
                            <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">Life Cycle Pod 🚄</span>
                        </div>
                    </div>
                </div>

                {/* 10 STAGES CIRCLES ALONG THE TRACK */}
                <div className="flex justify-between items-center relative -top-3 z-20 px-1">
                    {stages.map((st, idx) => {
                        const isReached = idx <= currentStage;
                        const isCurrent = idx === currentStage;
                        const IconComp = st.icon;

                        return (
                            <button
                                key={st.num}
                                onClick={() => {
                                    setCurrentStage(idx);
                                    setIsPlaying(false);
                                }}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-black text-xs sm:text-sm flex items-center justify-center transition-all duration-300 border-2 ${
                                    isCurrent
                                        ? 'bg-emerald-400 text-slate-950 border-white scale-125 shadow-[0_0_18px_rgba(52,211,153,0.8)] ring-4 ring-emerald-500/40'
                                        : isReached
                                        ? 'bg-slate-900 text-emerald-400 border-emerald-500 shadow-sm'
                                        : 'bg-slate-950 text-slate-500 border-slate-700 hover:border-slate-500'
                                }`}
                                title={st.title}
                            >
                                {isReached ? <IconComp size={16} /> : st.num}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* CURRENT ACTIVE STAGE DISPLAY CARD */}
            <div className="bg-slate-900/90 backdrop-blur-xl border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl relative z-10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeStageObj.color} text-slate-950 flex items-center justify-center font-black text-xl shadow-lg ${activeStageObj.bgGlow}`}>
                            <ActiveIcon size={24} />
                        </div>
                        <div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Stage {activeStageObj.num} of 10</span>
                            <h3 className="text-xl sm:text-2xl font-black text-white">{activeStageObj.title}</h3>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={currentStage === 0}
                            onClick={() => {
                                setCurrentStage(prev => prev - 1);
                                setIsPlaying(false);
                            }}
                            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold transition-all border border-slate-700"
                        >
                            ← Prev Stage
                        </button>
                        <button
                            disabled={currentStage === stages.length - 1}
                            onClick={() => {
                                setCurrentStage(prev => prev + 1);
                                setIsPlaying(false);
                            }}
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md"
                        >
                            Next Stage →
                        </button>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {activeStageObj.details}
                </p>

                {/* All 10 Stages Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                    {stages.map((st, idx) => {
                        const Icon = st.icon;
                        const isCurrent = idx === currentStage;
                        return (
                            <button
                                key={st.num}
                                onClick={() => {
                                    setCurrentStage(idx);
                                    setIsPlaying(false);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                    isCurrent
                                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md scale-95'
                                        : 'bg-slate-950/80 text-slate-400 hover:text-white border-slate-800'
                                }`}
                            >
                                <div className="flex items-center justify-between text-[10px]">
                                    <span>Stage #{st.num}</span>
                                    <Icon size={12} />
                                </div>
                                <div className="text-[11px] font-bold line-clamp-1 mt-0.5">{st.title.split(':')[1] || st.title}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

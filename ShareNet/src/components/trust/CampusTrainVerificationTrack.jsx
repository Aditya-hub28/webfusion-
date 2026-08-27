import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    GraduationCap, PhoneCall, ShieldCheck, Lock, FileText, QrCode,
    Clock, CheckCircle2, DollarSign, Scale, Train, Sparkles, Play, Pause
} from 'lucide-react';

export default function CampusTrainVerificationTrack() {
    const [currentStation, setCurrentStation] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const trainRef = useRef(null);

    const stations = [
        {
            num: 1,
            title: 'Station 1: Institutional Email (.edu)',
            icon: GraduationCap,
            color: 'from-emerald-400 to-teal-500',
            bgGlow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-400',
            details: 'Verifies student identity against official college domain directory before allowing any borrowing.'
        },
        {
            num: 2,
            title: 'Station 2: 2FA Mobile Phone OTP',
            icon: PhoneCall,
            color: 'from-teal-400 to-emerald-400',
            bgGlow: 'shadow-teal-500/20',
            textColor: 'text-teal-400',
            details: 'Real-time SMS OTP authentication linking user accounts to active mobile phone contact numbers.'
        },
        {
            num: 3,
            title: 'Station 3: 7-Factor Trust Rating (0-100)',
            icon: ShieldCheck,
            color: 'from-emerald-400 to-cyan-500',
            bgGlow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-400',
            details: 'Evaluates past on-time returns, item condition logs, and peer reviews for a 0-100 score.'
        },
        {
            num: 4,
            title: 'Station 4: Refundable Escrow Deposit Hold',
            icon: Lock,
            color: 'from-cyan-400 to-teal-500',
            bgGlow: 'shadow-cyan-500/20',
            textColor: 'text-cyan-400',
            details: 'Security deposit is locked safely in platform escrow prior to equipment release.'
        },
        {
            num: 5,
            title: 'Station 5: Pre-Handover Condition Inspection',
            icon: FileText,
            color: 'from-teal-400 to-emerald-500',
            bgGlow: 'shadow-teal-500/20',
            textColor: 'text-teal-400',
            details: 'Timestamped photo inspection check logging camera body, lens, screen, and accessories.'
        },
        {
            num: 6,
            title: 'Station 6: Encrypted QR Code Handover',
            icon: QrCode,
            color: 'from-emerald-400 to-teal-400',
            bgGlow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-400',
            details: 'In-person meeting on campus where both parties scan dual-encrypted QR codes to confirm transfer.'
        },
        {
            num: 7,
            title: 'Station 7: Active Borrowing Countdown',
            icon: Clock,
            color: 'from-amber-400 to-orange-500',
            bgGlow: 'shadow-amber-500/20',
            textColor: 'text-amber-400',
            details: 'Real-time active countdown timer sending automated SMS notifications before return deadline.'
        },
        {
            num: 8,
            title: 'Station 8: Post-Borrow Return Inspection',
            icon: CheckCircle2,
            color: 'from-orange-400 to-emerald-500',
            bgGlow: 'shadow-orange-500/20',
            textColor: 'text-orange-400',
            details: 'Lender verifies physical state against pre-handover condition log upon receiving item back.'
        },
        {
            num: 9,
            title: 'Station 9: Instant Escrow Deposit Refund',
            icon: DollarSign,
            color: 'from-emerald-400 to-green-500',
            bgGlow: 'shadow-emerald-500/20',
            textColor: 'text-emerald-400',
            details: '100% of held security deposit is instantly credited back to borrower after successful return.'
        },
        {
            num: 10,
            title: 'Station 10: Admin Arbitration & Insurance',
            icon: Scale,
            color: 'from-emerald-300 to-slate-100',
            bgGlow: 'shadow-emerald-400/20',
            textColor: 'text-white',
            details: 'Platform institutional arbitration and insurance coverage resolving accidental damages fairly.'
        }
    ];

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStation((prev) => (prev + 1) % stations.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, stations.length]);

    useEffect(() => {
        if (trainRef.current) {
            const percentage = (currentStation / (stations.length - 1)) * 100;
            gsap.to(trainRef.current, {
                left: `${percentage}%`,
                duration: 0.8,
                ease: 'back.out(1.4)'
            });
        }
    }, [currentStation, stations.length]);

    const activeStationObj = stations[currentStation];
    const ActiveIcon = activeStationObj.icon;

    return (
        <div className="bg-slate-950/90 backdrop-blur-3xl text-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 space-y-6 sm:space-y-8 relative overflow-hidden max-w-full">
            {/* Background Translucent Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent pointer-events-none"></div>

            {/* Header Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 relative z-10">
                <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/40 inline-flex items-center gap-1.5 shadow-lg">
                        <Train size={15} /> Campus Express • Verification Rail Track
                    </span>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                        The 10-Station Safety Express
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        Watch the Campus Bullet Train 🚄 glide through all 10 security stations ensuring 100% deposit safety.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-white/15 transition-colors shadow-sm backdrop-blur-md"
                    >
                        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                        {isPlaying ? 'Pause Train' : 'Autoplay Train'}
                    </button>
                </div>
            </div>

            {/* RAIL TRACK CONTAINER */}
            <div className="overflow-x-auto max-w-full pt-10 pb-6 px-2 z-10 scrollbar-none">
                <div className="min-w-[650px] sm:min-w-full relative">
                    {/* Glowing Rail Track Line */}
                    <div className="h-3.5 bg-white/10 rounded-full w-full relative border border-white/15 overflow-visible backdrop-blur-md">
                        {/* Active Progress Fill Line */}
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(52,211,153,0.6)]"
                            style={{ width: `${(currentStation / (stations.length - 1)) * 100}%` }}
                        ></div>

                        {/* GSAP ANIMATED HIGH-TECH BULLET TRAIN 🚄 */}
                        <div
                            ref={trainRef}
                            className="absolute -top-6.5 -translate-x-1/2 z-30 transition-all cursor-pointer"
                            style={{ left: '0%' }}
                        >
                            <div className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-slate-950 px-3 py-1.5 rounded-2xl shadow-[0_0_25px_rgba(52,211,153,0.9)] border-2 border-white flex items-center gap-1.5 font-black text-xs">
                                <Train size={18} className="text-slate-950" />
                                <span className="hidden sm:inline text-[11px] font-black uppercase tracking-wider">Campus Pod 🚄</span>
                            </div>
                        </div>
                    </div>

                    {/* 10 STATIONS CIRCLES ALONG THE TRACK */}
                    <div className="flex justify-between items-center relative -top-3 z-20 px-1">
                        {stations.map((st, idx) => {
                            const isReached = idx <= currentStation;
                            const isCurrent = idx === currentStation;
                            const IconComp = st.icon;

                            return (
                                <button
                                    key={st.num}
                                    onClick={() => {
                                        setCurrentStation(idx);
                                        setIsPlaying(false);
                                    }}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-black text-xs sm:text-sm flex items-center justify-center transition-all duration-300 border-2 ${
                                        isCurrent
                                            ? 'bg-emerald-400 text-slate-950 border-white scale-125 shadow-[0_0_20px_rgba(52,211,153,0.9)] ring-4 ring-emerald-500/40'
                                            : isReached
                                            ? 'bg-slate-900 text-emerald-400 border-emerald-500 shadow-sm'
                                            : 'bg-slate-950 text-slate-500 border-white/10 hover:border-white/30'
                                    }`}
                                    title={st.title}
                                >
                                    {isReached ? <IconComp size={16} /> : st.num}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CURRENT ACTIVE STATION DISPLAY CARD (GLASSMORPHISM FROST) */}
            <div className="bg-slate-900/80 backdrop-blur-2xl border-2 border-emerald-400/80 rounded-3xl p-5 sm:p-8 space-y-4 shadow-2xl relative z-10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${activeStationObj.color} text-slate-950 flex items-center justify-center font-black text-xl shadow-lg ${activeStationObj.bgGlow} shrink-0`}>
                            <ActiveIcon size={22} />
                        </div>
                        <div>
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-400">Station {activeStationObj.num} of 10</span>
                            <h3 className="text-lg sm:text-2xl font-black text-white">{activeStationObj.title}</h3>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button
                            disabled={currentStation === 0}
                            onClick={() => {
                                setCurrentStation(prev => prev - 1);
                                setIsPlaying(false);
                            }}
                            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold transition-all border border-white/15 backdrop-blur-md"
                        >
                            ← Prev Station
                        </button>
                        <button
                            disabled={currentStation === stations.length - 1}
                            onClick={() => {
                                setCurrentStation(prev => prev + 1);
                                setIsPlaying(false);
                            }}
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Next Station →
                        </button>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {activeStationObj.details}
                </p>

                {/* All 10 Stations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                    {stations.map((st, idx) => {
                        const Icon = st.icon;
                        const isCurrent = idx === currentStation;
                        return (
                            <button
                                key={st.num}
                                onClick={() => {
                                    setCurrentStation(idx);
                                    setIsPlaying(false);
                                }}
                                className={`p-2.5 rounded-xl border text-left transition-all ${
                                    isCurrent
                                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-md scale-95'
                                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                                }`}
                            >
                                <div className="flex items-center justify-between text-[10px]">
                                    <span>Station #{st.num}</span>
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

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    GraduationCap, PhoneCall, ShieldCheck, Lock, FileText, QrCode,
    Clock, CheckCircle2, DollarSign, Scale, ChevronRight, Sparkles
} from 'lucide-react';

export default function TenStepVerification() {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef(null);

    const steps = [
        {
            number: 1,
            title: 'Institutional Email & Student ID Verification',
            icon: GraduationCap,
            color: 'from-emerald-500 to-teal-600',
            textColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            description: 'Authentication via official college domain email (.edu/.ac.in) ensuring 100% campus identity accountability.'
        },
        {
            number: 2,
            title: '2FA Mobile OTP Authentication',
            icon: PhoneCall,
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            description: 'Real-time SMS OTP verification linking user profiles to verified mobile contact numbers.'
        },
        {
            number: 3,
            title: '7-Factor Reputation Trust Score Engine',
            icon: ShieldCheck,
            color: 'from-indigo-500 to-purple-600',
            textColor: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200',
            description: 'Algorithmic 0-100 rating evaluating past return timeliness, physical care, and peer reviews.'
        },
        {
            number: 4,
            title: 'Refundable Security Deposit Escrow Hold',
            icon: Lock,
            color: 'from-purple-500 to-pink-600',
            textColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            description: 'Refundable security deposit locked safely in platform escrow prior to equipment release.'
        },
        {
            number: 5,
            title: 'Pre-Handover Condition Photo Inspection',
            icon: FileText,
            color: 'from-amber-500 to-orange-600',
            textColor: 'text-amber-600',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            description: 'Timestamped photo check logging lens, screen, body, and included accessories.'
        },
        {
            number: 6,
            title: 'Encrypted Digital QR & Passcode Handover',
            icon: QrCode,
            color: 'from-teal-500 to-emerald-600',
            textColor: 'text-teal-600',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-200',
            description: 'Dual-party in-person QR code scanning confirming physical exchange of equipment.'
        },
        {
            number: 7,
            title: 'Real-Time Borrow Countdown & Overdue Alerts',
            icon: Clock,
            color: 'from-sky-500 to-blue-600',
            textColor: 'text-sky-600',
            bgColor: 'bg-sky-50',
            borderColor: 'border-sky-200',
            description: 'Automated SMS/push notifications guiding timely campus returns before deadline.'
        },
        {
            number: 8,
            title: 'Post-Borrow Return Physical Condition Check',
            icon: CheckCircle2,
            color: 'from-emerald-600 to-green-600',
            textColor: 'text-emerald-700',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-300',
            description: 'Lender verifies physical state against pre-handover log upon receiving item.'
        },
        {
            number: 9,
            title: 'Automated Instant Escrow Deposit Refund',
            icon: DollarSign,
            color: 'from-green-500 to-emerald-700',
            textColor: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            description: '100% of held security deposit instantly credited back to borrower upon clean return.'
        },
        {
            number: 10,
            title: 'Admin Arbitration & Dispute Insurance Coverage',
            icon: Scale,
            color: 'from-indigo-600 to-slate-900',
            textColor: 'text-slate-900',
            bgColor: 'bg-slate-100',
            borderColor: 'border-slate-300',
            description: 'Platform dispute protection & institutional arbitration resolving accidental damage claims fairly.'
        }
    ];

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.querySelectorAll('.step-card'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [activeStep]);

    const currentStepObj = steps[activeStep];
    const IconComponent = currentStepObj.icon;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                    <Sparkles size={14} /> Complete Safety & Security Protocol
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                    10-Step Campus Verification Architecture
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
                    How Campus Circular guarantees 100% accountability, deposit safety, and physical equipment protection for every exchange.
                </p>
            </div>

            {/* Interactive Step Carousel / Progress Strip */}
            <div className="flex overflow-x-auto gap-2 pb-2 text-xs font-bold scrollbar-none">
                {steps.map((s, idx) => (
                    <button
                        key={s.number}
                        onClick={() => setActiveStep(idx)}
                        className={`px-3.5 py-2.5 rounded-2xl flex items-center gap-2 shrink-0 transition-all border ${
                            activeStep === idx
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                        }`}
                    >
                        <span className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                            activeStep === idx ? 'bg-emerald-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}>
                            {s.number}
                        </span>
                        <span className="truncate max-w-[130px]">{s.title.split(' ')[0]}...</span>
                    </button>
                ))}
            </div>

            {/* Highlighted Step Feature Card */}
            <div ref={containerRef} className="bg-white border-2 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStepObj.color} text-white flex items-center justify-center shadow-lg font-black text-xl`}>
                            <IconComponent size={28} />
                        </div>
                        <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Step {currentStepObj.number} of 10</span>
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{currentStepObj.title}</h3>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep(prev => prev - 1)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 rounded-xl text-xs font-bold transition-all"
                        >
                            ← Previous Step
                        </button>
                        <button
                            disabled={activeStep === steps.length - 1}
                            onClick={() => setActiveStep(prev => prev + 1)}
                            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all"
                        >
                            Next Step →
                        </button>
                    </div>
                </div>

                <div className={`p-5 rounded-2xl ${currentStepObj.bgColor} border ${currentStepObj.borderColor} text-slate-800 text-sm font-medium leading-relaxed`}>
                    {currentStepObj.description}
                </div>

                {/* 10 Step Grid Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                    {steps.map((s, idx) => {
                        const StepIcon = s.icon;
                        const isSelected = activeStep === idx;
                        return (
                            <div
                                key={s.number}
                                onClick={() => setActiveStep(idx)}
                                className={`step-card p-3 rounded-2xl border cursor-pointer transition-all ${
                                    isSelected
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-400'
                                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black text-slate-400">#0{s.number}</span>
                                    <StepIcon size={14} className={isSelected ? 'text-emerald-400' : 'text-slate-500'} />
                                </div>
                                <div className="text-[11px] font-bold line-clamp-1">{s.title}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

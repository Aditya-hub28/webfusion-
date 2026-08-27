import React from 'react';
import { useCircularStore } from '../../stores/circularStore';
import { UserCheck, Shield, Play, RotateCcw, Sparkles } from 'lucide-react';

export default function DemoPersonaBar() {
    const { persona, setPersona, demoStep, advanceDemo, resetDemoState } = useCircularStore();

    const demoSteps = [
        '1. Landing Page Prompt',
        '2. AI Need Parser',
        '3. 96% Smart Matching',
        '4. Resource Details',
        '5. Borrow Request',
        '6. Owner Accepts',
        '7. Digital Handover',
        '8. Active Borrowed State',
        '9. Return Due Alert',
        '10. Condition Check',
        '11. Settlement & Refund',
        '12. Rating Submitted',
        '13. Trust Score Updated',
        '14. Campus Impact Updated'
    ];

    return (
        <div className="bg-slate-900 text-white text-xs border-b border-slate-800 py-2.5 px-4 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm flex items-center gap-1">
                        <Sparkles size={12} /> Hackathon Demo Mode
                    </span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">Active Persona:</span>

                    <div className="flex bg-slate-800 p-0.5 rounded-xl border border-slate-700">
                        <button
                            onClick={() => setPersona('borrower')}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                persona === 'borrower' ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold' : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <UserCheck size={13} /> Borrower (Aditya)
                        </button>

                        <button
                            onClick={() => setPersona('owner')}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                persona === 'owner' ? 'bg-indigo-500 text-white shadow-sm font-bold' : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <UserCheck size={13} /> Lender (Priya)
                        </button>

                        <button
                            onClick={() => setPersona('admin')}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                persona === 'admin' ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            <Shield size={13} /> Admin
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="hidden lg:flex items-center text-slate-400 text-[11px]">
                        <span>Demo Step {demoStep + 1}/14: <strong className="text-emerald-300">{demoSteps[demoStep] || 'Complete Flow'}</strong></span>
                    </div>

                    <button
                        onClick={advanceDemo}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                    >
                        <Play size={13} fill="currentColor" /> Step {demoStep + 1} Demo Tour
                    </button>

                    <button
                        onClick={resetDemoState}
                        title="Reset Demo State"
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                    >
                        <RotateCcw size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}

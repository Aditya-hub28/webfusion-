import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import ImpactVisualizer from '../components/impact/ImpactVisualizer';
import MethodologyModal from '../components/impact/MethodologyModal';
import { BarChart2, Leaf, HelpCircle, User, Package, Globe, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ImpactDashboardPage() {
    const { impact, borrowerPersonalSavings, lenderEarnings, userTrustScore, resources } = useCircularStore();
    const [activePersona, setActivePersona] = useState('borrower'); // 'borrower' | 'lender' | 'campus'
    const [methodologyOpen, setMethodologyOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header Title */}
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-1">
                        <BarChart2 size={16} /> Dynamic Multi-Persona Impact Ledger
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Personalized Circular Impact & Savings
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Customized financial savings, e-waste avoided, and circular utilization metrics for each campus persona.
                    </p>
                </div>

                <button
                    onClick={() => setMethodologyOpen(true)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                    <HelpCircle size={15} /> How do we calculate this?
                </button>
            </div>

            {/* Persona Switcher Bar */}
            <div className="bg-slate-900 p-2 rounded-3xl text-white flex flex-col sm:flex-row justify-between items-center gap-3 shadow-lg">
                <div className="flex items-center gap-2 px-3 text-xs font-bold text-slate-300">
                    <Sparkles size={16} className="text-emerald-400" /> Select Persona View:
                </div>

                <div className="flex bg-slate-800 p-1.5 rounded-2xl gap-1 w-full sm:w-auto text-xs font-bold">
                    <button
                        onClick={() => setActivePersona('borrower')}
                        className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                            activePersona === 'borrower' ? 'bg-emerald-500 text-slate-950 font-black shadow-md' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        <User size={15} /> 🎓 Aditya (Borrower Impact)
                    </button>

                    <button
                        onClick={() => setActivePersona('lender')}
                        className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                            activePersona === 'lender' ? 'bg-indigo-500 text-white font-black shadow-md' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        <Package size={15} /> 💼 Priya (Lender Impact)
                    </button>

                    <button
                        onClick={() => setActivePersona('campus')}
                        className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                            activePersona === 'campus' ? 'bg-white text-slate-900 font-black shadow-md' : 'text-slate-300 hover:text-white'
                        }`}
                    >
                        <Globe size={15} /> 🌐 Total Campus Platform
                    </button>
                </div>
            </div>

            {/* Dynamic Visualizer Body */}
            <ImpactVisualizer
                activePersona={activePersona}
                impact={impact}
                borrowerPersonalSavings={borrowerPersonalSavings}
                lenderEarnings={lenderEarnings}
                userTrustScore={userTrustScore}
                resourcesCount={resources.length}
            />

            {/* Sustainability Highlights */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Leaf size={18} className="text-emerald-400" /> Sustainability & Reusability Impact Highlights
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Personal Money Saved</span>
                        <div className="text-xl font-black text-emerald-400">
                            {activePersona === 'borrower' ? `₹${borrowerPersonalSavings.toLocaleString()} Saved` : activePersona === 'lender' ? `₹${lenderEarnings.toLocaleString()} Earned` : '₹48,250 Saved'}
                        </div>
                        <p className="text-[11px] text-slate-400">
                            {activePersona === 'borrower' ? 'Avoided purchasing new expensive camera & robotics equipment.' : activePersona === 'lender' ? 'Earned passive rental income from idle student gear.' : 'Combined campus student savings.'}
                        </p>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Circular Asset Efficiency</span>
                        <div className="text-xl font-black text-blue-400">89.2% Utilization</div>
                        <p className="text-[11px] text-slate-400">Average idle time per shared camera reduced from 18 days to 2.4 days.</p>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Campus Trust Verification</span>
                        <div className="text-xl font-black text-indigo-400">
                            {activePersona === 'borrower' ? '94/100 Trust Rating' : activePersona === 'lender' ? '98/100 Super Lender' : '94.8% On-Time Returns'}
                        </div>
                        <p className="text-[11px] text-slate-400">Zero unreturned items due to deposit hold & trust score incentives.</p>
                    </div>
                </div>
            </div>

            {/* Methodology Modal */}
            <MethodologyModal
                isOpen={methodologyOpen}
                onClose={() => setMethodologyOpen(false)}
            />
        </div>
    );
}

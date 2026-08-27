import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import ImpactVisualizer from '../components/impact/ImpactVisualizer';
import MethodologyModal from '../components/impact/MethodologyModal';
import { BarChart2, Leaf, HelpCircle } from 'lucide-react';

export default function ImpactDashboardPage() {
    const { impact } = useCircularStore();
    const [methodologyOpen, setMethodologyOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-1">
                        <BarChart2 size={16} /> Circular Campus Impact Ledger
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Campus Circular Impact & Savings
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Real-time metrics showing student financial savings, e-waste avoided, and circular resource utilization.
                    </p>
                </div>

                <button
                    onClick={() => setMethodologyOpen(true)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                    <HelpCircle size={15} /> How do we calculate this?
                </button>
            </div>

            <ImpactVisualizer impact={impact} />

            {/* Sustainability Highlights */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Leaf size={18} className="text-emerald-400" /> Sustainability & Reusability Impact Highlights
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Money Saved By Students</span>
                        <div className="text-xl font-black text-emerald-400">₹48,250 Saved</div>
                        <p className="text-[11px] text-slate-400">Avoided unnecessary purchases of high-end media & robotics gear.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Circular Utilization Rate</span>
                        <div className="text-xl font-black text-blue-400">88.4% Efficiency</div>
                        <p className="text-[11px] text-slate-400">Average idle time per shared camera reduced from 18 days to 2.4 days.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Campus Trust Reliability</span>
                        <div className="text-xl font-black text-indigo-400">94.8% On-Time Returns</div>
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

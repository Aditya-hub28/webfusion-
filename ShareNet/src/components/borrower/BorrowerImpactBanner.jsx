import React from 'react';
import { DollarSign, ShieldCheck, Award } from 'lucide-react';

export default function BorrowerImpactBanner({ savings = 2840, trustScore = 94 }) {
    return (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 shadow-md border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Personal Campus Economy Impact</span>
                    <h3 className="text-lg font-black text-white">You saved ₹{savings} by borrowing instead of buying!</h3>
                    <p className="text-xs text-slate-300">Avoided high retail prices for DSLR cameras and project gear this semester.</p>
                </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-700 px-4 py-2.5 rounded-2xl text-center shrink-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Your Trust Status</span>
                <span className="text-base font-black text-emerald-400 flex items-center justify-center gap-1">
                    <Award size={16} /> {trustScore}/100 <span className="text-xs font-normal text-slate-300">(Reliable)</span>
                </span>
            </div>
        </div>
    );
}

import React from 'react';
import { ShieldCheck, Star, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function BorrowerRiskCard({ borrowerName = 'Aditya Sharma', trustScore = 94 }) {
    return (
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-md">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck size={16} /> Smart Borrower Risk View
                </div>
                <span className="text-xs font-bold text-slate-300">Verified Campus Member</span>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-base font-bold text-white">{borrowerName}</h4>
                    <span className="text-xs text-slate-400">Computer Science & Engg • Final Year</span>
                </div>
                <div className="bg-slate-800 px-3.5 py-1.5 rounded-xl text-center border border-slate-700">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Trust Score</span>
                    <span className="text-lg font-black text-emerald-400">{trustScore}/100</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">On-Time Returns</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">98%</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">Exchanges</span>
                    <span className="font-bold text-white mt-0.5 block">47 Completed</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-semibold">Disputes</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">0 Disputes</span>
                </div>
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>Low Risk Borrower: Highly recommended for high-value media & camera gear.</span>
            </div>
        </div>
    );
}

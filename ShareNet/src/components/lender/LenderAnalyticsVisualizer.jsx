import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { DollarSign, RefreshCw, Star, ShieldCheck } from 'lucide-react';

export default function LenderAnalyticsVisualizer({ earnings }) {
    const monthlyEarnings = [
        { month: 'Mar', income: 450, exchanges: 3 },
        { month: 'Apr', income: 720, exchanges: 5 },
        { month: 'May', income: 1100, exchanges: 8 },
        { month: 'Jun', income: 1350, exchanges: 9 },
        { month: 'Jul', income: 1450, exchanges: 11 },
        { month: 'Aug', income: 1800, exchanges: 14 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Total Earnings</span>
                    <div className="text-2xl font-black text-indigo-900 mt-1">₹{earnings || 1450}</div>
                    <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">↑ ₹350 this month</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Deposits Held</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">₹500</div>
                    <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">1 Active Borrowing</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Utilization Rate</span>
                    <div className="text-2xl font-black text-emerald-600 mt-1">92.4%</div>
                    <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">High Demand</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Owner Trust Rating</span>
                    <div className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1">
                        <Star size={20} fill="currentColor" /> 4.9 <span className="text-xs text-slate-400 font-normal">(52 reviews)</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Monthly Lending Income & Exchange Growth</h3>
                <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyEarnings}>
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip />
                            <Area type="monotone" dataKey="income" stroke="#6366f1" fill="#e0e7ff" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

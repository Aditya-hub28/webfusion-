import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, RefreshCw, ShieldCheck, Leaf } from 'lucide-react';

export default function ImpactVisualizer({ impact }) {
    const monthlyData = [
        { month: 'Mar', exchanges: 120, savings: 14500 },
        { month: 'Apr', exchanges: 210, savings: 22000 },
        { month: 'May', exchanges: 340, savings: 38000 },
        { month: 'Jun', exchanges: 490, savings: 54000 },
        { month: 'Jul', exchanges: 680, savings: 72000 },
        { month: 'Aug', exchanges: 890, savings: 98000 },
    ];

    const categoryData = [
        { name: 'Cameras', value: 38, color: '#10b981' },
        { name: 'Electronics', value: 24, color: '#3b82f6' },
        { name: 'Books', value: 18, color: '#f59e0b' },
        { name: 'Sports', value: 12, color: '#8b5cf6' },
        { name: 'Music', value: 8, color: '#ec4899' },
    ];

    return (
        <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                        <DollarSign size={20} />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">Total Money Saved</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">₹{impact.moneySaved.toLocaleString()}</div>
                    <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">↑ 24% vs last month</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                        <RefreshCw size={20} />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">Resources Reused</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">{impact.resourcesReused}</div>
                    <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">462 Active listings</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3">
                        <ShieldCheck size={20} />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">On-Time Returns</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">{impact.onTimeReturnsPercent}%</div>
                    <span className="text-[11px] text-indigo-600 font-bold mt-1 inline-block">3,920 Total Exchanges</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-3">
                        <Leaf size={20} />
                    </div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">Waste Avoided</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">{impact.wasteAvoidedKg} kg</div>
                    <span className="text-[11px] text-teal-600 font-bold mt-1 inline-block">E-waste & Plastic</span>
                </div>
            </div>

            {/* Recharts Graphical Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Exchanges & Student Savings Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip />
                                <Bar dataKey="exchanges" fill="#10b981" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Popular Campus Category Usage</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

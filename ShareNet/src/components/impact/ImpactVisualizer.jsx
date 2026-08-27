import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, RefreshCw, ShieldCheck, Leaf, Award, TrendingUp, Sparkles, CheckCircle2, UserCheck, Package } from 'lucide-react';

export default function ImpactVisualizer({ activePersona, impact, borrowerPersonalSavings, lenderEarnings, userTrustScore, resourcesCount }) {
    // 1. Borrower Specific Data
    const borrowerCategoryData = [
        { name: 'Electronics & Tech', value: 15200, color: '#10b981' },
        { name: 'Event & AV', value: 7400, color: '#3b82f6' },
        { name: 'Sports & Fitness', value: 3800, color: '#f59e0b' },
        { name: 'Academic & Lab', value: 2050, color: '#8b5cf6' }
    ];

    const borrowerMonthlySavings = [
        { month: 'Mar', savings: 3200, items: 4 },
        { month: 'Apr', savings: 4500, items: 7 },
        { month: 'May', savings: 5800, items: 9 },
        { month: 'Jun', savings: 7100, items: 12 },
        { month: 'Jul', savings: 8900, items: 15 },
        { month: 'Aug', savings: 28450, items: 47 }
    ];

    // 2. Lender Specific Data
    const lenderRevenueData = [
        { name: 'Electronics & Tech', value: 6800, color: '#10b981' },
        { name: 'Event & AV Equipment', value: 4200, color: '#6366f1' },
        { name: 'Sports & Outdoor', value: 1800, color: '#f59e0b' },
        { name: 'Camping Gear', value: 1700, color: '#ec4899' }
    ];

    const lenderMonthlyEarnings = [
        { month: 'Mar', earnings: 1200, rentals: 3 },
        { month: 'Apr', earnings: 2500, rentals: 6 },
        { month: 'May', earnings: 4100, rentals: 10 },
        { month: 'Jun', earnings: 6800, rentals: 16 },
        { month: 'Jul', earnings: 9400, rentals: 22 },
        { month: 'Aug', earnings: 14500, rentals: 32 }
    ];

    // 3. Platform Combined Data
    const campusMonthlyData = [
        { month: 'Mar', exchanges: 120, savings: 14500 },
        { month: 'Apr', exchanges: 210, savings: 22000 },
        { month: 'May', exchanges: 340, savings: 38000 },
        { month: 'Jun', exchanges: 490, savings: 54000 },
        { month: 'Jul', exchanges: 680, savings: 72000 },
        { month: 'Aug', exchanges: 890, savings: 98000 }
    ];

    const campusCategoryData = [
        { name: 'Electronics', value: 42, color: '#10b981' },
        { name: 'Event & AV', value: 26, color: '#3b82f6' },
        { name: 'Sports & Fitness', value: 16, color: '#f59e0b' },
        { name: 'Academic & Lab', value: 10, color: '#8b5cf6' },
        { name: 'Camping', value: 6, color: '#ec4899' }
    ];

    return (
        <div className="space-y-6">
            {/* PERSONA 1: ADITYA SHARMA (BORROWER) IMPACT */}
            {activePersona === 'borrower' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                                <UserCheck size={16} /> Borrower Personal Impact Ledger
                            </span>
                            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                                ⭐ Trust Score 94/100
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">Aditya Sharma's Borrowing Summary</h2>
                            <p className="text-xs text-slate-300 mt-1">
                                Money saved by borrowing high-end cameras, laptops, and kits instead of purchasing new.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border-2 border-emerald-200 shadow-sm">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Personal Savings</span>
                            <div className="text-2xl font-black text-emerald-700 mt-1">₹{borrowerPersonalSavings.toLocaleString()}</div>
                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">Saved vs buying new gear</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                                <RefreshCw size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Items Borrowed</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">47 Items</div>
                            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">100% On-Time Returns</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-3">
                                <Leaf size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">E-Waste Avoided</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">48.5 kg</div>
                            <span className="text-[11px] text-teal-600 font-bold mt-1 inline-block">Carbon offset equivalent</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3">
                                <Award size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Community Rank</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">Top 5%</div>
                            <span className="text-[11px] text-indigo-600 font-bold mt-1 inline-block">Verified Student Leader</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-slate-900">Personal Savings Growth Over Time (₹)</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={borrowerMonthlySavings}>
                                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                        <YAxis stroke="#94a3b8" fontSize={12} />
                                        <Tooltip />
                                        <Bar dataKey="savings" fill="#10b981" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-slate-900">Savings Distribution by Category</h3>
                            <div className="h-64 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={borrowerCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {borrowerCategoryData.map((entry, index) => (
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
            )}

            {/* PERSONA 2: PRIYA PATEL (LENDER) IMPACT */}
            {activePersona === 'lender' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                                <Package size={16} /> Resource Owner & Lender Impact Ledger
                            </span>
                            <span className="text-xs font-bold bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/40">
                                👑 Super Lender 98/100
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">Priya Patel's Lending Summary</h2>
                            <p className="text-xs text-slate-300 mt-1">
                                Revenue generated by sharing unused cameras, lighting kits, and lab tools with campus peers.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-200 shadow-sm">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Lending Earnings</span>
                            <div className="text-2xl font-black text-indigo-700 mt-1">₹{lenderEarnings.toLocaleString()}</div>
                            <span className="text-[11px] text-indigo-600 font-bold mt-1 inline-block">Monetized idle equipment</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                                <Package size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Inventory Shared</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">{resourcesCount} Listings</div>
                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">across 5 campus categories</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Utilization Rate</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">89.2%</div>
                            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">High demand for media gear</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-3">
                                <Leaf size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">CO2 Offset</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">142 kg</div>
                            <span className="text-[11px] text-teal-600 font-bold mt-1 inline-block">Community shared economy</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-slate-900">Monthly Rental Earnings (₹)</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={lenderMonthlyEarnings}>
                                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                        <YAxis stroke="#94a3b8" fontSize={12} />
                                        <Tooltip />
                                        <Bar dataKey="earnings" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-slate-900">Revenue by Equipment Category</h3>
                            <div className="h-64 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={lenderRevenueData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {lenderRevenueData.map((entry, index) => (
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
            )}

            {/* PERSONA 3: ENTIRE CAMPUS PLATFORM IMPACT */}
            {activePersona === 'campus' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                                <DollarSign size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Total Money Saved</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">₹{impact.moneySaved.toLocaleString()}</div>
                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">↑ 24% vs last month</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                                <RefreshCw size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Resources Reused</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">{impact.resourcesReused}</div>
                            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">462 Active listings</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">On-Time Returns</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">{impact.onTimeReturnsPercent}%</div>
                            <span className="text-[11px] text-indigo-600 font-bold mt-1 inline-block">3,920 Total Exchanges</span>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-3">
                                <Leaf size={20} />
                            </div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Waste Avoided</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">{impact.wasteAvoidedKg} kg</div>
                            <span className="text-[11px] text-teal-600 font-bold mt-1 inline-block">E-waste & Plastic</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Exchanges & Student Savings Growth</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={campusMonthlyData}>
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
                                        <Pie data={campusCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {campusCategoryData.map((entry, index) => (
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
            )}
        </div>
    );
}

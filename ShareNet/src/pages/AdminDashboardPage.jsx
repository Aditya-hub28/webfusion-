import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import DisputeInvestigationModal from '../components/admin/DisputeInvestigationModal';
import AdminAuditLog from '../components/admin/AdminAuditLog';
import MethodologyModal from '../components/impact/MethodologyModal';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { ShieldCheck, Users, Package, AlertTriangle, CheckCircle, Flag, Ban, UserCheck, Clock, DollarSign, HelpCircle, AlertCircle, Layers } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminDashboardPage() {
    const {
        users,
        resources,
        disputes,
        borrowings,
        auditLogs,
        verifyStudentUser,
        suspendStudentUser,
        approveResourceListing,
        overrideAdminSettlement,
        sendOverdueReminder
    } = useCircularStore();

    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'resources' | 'disputes' | 'overdue' | 'audit'
    const [selectedDispute, setSelectedDispute] = useState(null);
    const [methodologyOpen, setMethodologyOpen] = useState(false);

    const pendingUsers = users.filter(u => u.status !== 'Verified');
    const openDisputes = disputes.filter(d => d.status.includes('Review'));
    const overdueBorrowings = borrowings.filter(b => b.stage.includes('Active'));

    const revenueData = [
        { month: 'Mar', revenue: 2400, exchanges: 120 },
        { month: 'Apr', revenue: 4200, exchanges: 210 },
        { month: 'May', revenue: 6800, exchanges: 340 },
        { month: 'Jun', revenue: 9500, exchanges: 475 },
        { month: 'Jul', revenue: 11800, exchanges: 590 },
        { month: 'Aug', revenue: 14200, exchanges: 710 },
    ];

    const handleVerify = (userId) => {
        verifyStudentUser(userId);
        toast.success('Student verified! VERIFIED badge issued.');
    };

    const handleSuspend = (userId) => {
        suspendStudentUser(userId);
        toast.error('Student account suspended.');
    };

    const handleReminder = (bId) => {
        sendOverdueReminder(bId);
        toast.success('Automated return reminder pushed to borrower!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5 mb-1">
                        <ShieldCheck size={16} /> Campus Administrator Operational Control Center
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Platform Operations & Governance
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Student verification, resource moderation, dispute investigation, overdue monitoring, and platform safety analytics.
                    </p>
                </div>
                <span className="text-xs font-bold px-3.5 py-1.5 bg-amber-100 text-amber-900 rounded-xl border border-amber-300">
                    Admin Access: ACTIVE
                </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-200/70 p-1.5 rounded-2xl overflow-x-auto gap-1 text-xs font-bold">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <ShieldCheck size={15} /> Operations Overview
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'users' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Users size={15} /> Student Verification ({pendingUsers.length})
                </button>
                <button
                    onClick={() => setActiveTab('resources')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'resources' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Package size={15} /> Resource Moderation
                </button>
                <button
                    onClick={() => setActiveTab('disputes')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'disputes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <AlertTriangle size={15} /> Dispute Center ({openDisputes.length})
                </button>
                <button
                    onClick={() => setActiveTab('overdue')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'overdue' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Clock size={15} /> Overdue Returns & Risk Alerts
                </button>
                <button
                    onClick={() => setActiveTab('audit')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'audit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Layers size={15} /> Audit Log & Rules
                </button>
            </div>

            {/* TAB 1: OPERATIONS OVERVIEW */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-semibold uppercase">Total Students</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">1,284</div>
                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">1,150 Verified</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-semibold uppercase">Active Resources</span>
                            <div className="text-2xl font-black text-emerald-600 mt-1">462</div>
                            <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">across 7 categories</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-semibold uppercase">Platform Revenue</span>
                            <div className="text-2xl font-black text-indigo-600 mt-1">₹14,200</div>
                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">↑ 18% growth</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-semibold uppercase">Open Disputes</span>
                            <div className="text-2xl font-black text-amber-600 mt-1">{openDisputes.length}</div>
                            <span className="text-[11px] text-amber-600 font-bold mt-1 inline-block">Action Required</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-slate-900">Platform Service Revenue & Exchange Volume Growth</h3>
                        <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                    <YAxis stroke="#94a3b8" fontSize={12} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="#fef3c7" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: STUDENT VERIFICATION & USERS */}
            {activeTab === 'users' && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Users size={18} className="text-indigo-600" /> Student ID Verification Queue & User Management
                    </h3>

                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 space-y-4">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-200">
                                    <th className="p-3">Student Name</th>
                                    <th className="p-3">Department & Year</th>
                                    <th className="p-3">Trust Score</th>
                                    <th className="p-3">Exchanges</th>
                                    <th className="p-3">Verification</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="p-3 font-bold text-slate-900">{u.name}</td>
                                        <td className="p-3">{u.dept} ({u.year})</td>
                                        <td className="p-3 font-bold text-emerald-600">{u.trust}/100</td>
                                        <td className="p-3">{u.exchanges}</td>
                                        <td className="p-3">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                u.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                u.status === 'Suspended' ? 'bg-red-50 text-red-700 border border-red-200' :
                                                'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="p-3 flex items-center gap-2">
                                            {u.status !== 'Verified' && (
                                                <Button size="sm" onClick={() => handleVerify(u.id)} className="bg-emerald-600 hover:bg-emerald-700 text-[11px] py-1 px-2.5">
                                                    Verify Student
                                                </Button>
                                            )}
                                            {u.status !== 'Suspended' && (
                                                <button onClick={() => handleSuspend(u.id)} className="text-[11px] text-red-600 font-bold hover:underline">
                                                    Suspend
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 3: RESOURCE MODERATION & SUPPLY GAPS */}
            {activeTab === 'resources' && (
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Package size={18} className="text-emerald-600" /> Resource Moderation Queue
                        </h3>

                        <div className="space-y-3">
                            {resources.map((res) => (
                                <div key={res.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                                    <div>
                                        <span className="font-bold text-slate-900 text-sm block">{res.title}</span>
                                        <span className="text-slate-500">Owner: {res.owner.name} • Fee: ₹{res.dailyCharge}/day • Deposit: ₹{res.deposit}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">Approved & Active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Supply Demand Gaps */}
                    <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Layers size={18} className="text-emerald-400" /> Campus Resource Supply-Demand Gap Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                                <span className="text-[10px] text-amber-400 font-bold uppercase">High Demand / Low Supply</span>
                                <h4 className="font-bold text-white">DSLR 4K Cameras</h4>
                                <p className="text-[11px] text-slate-400">Demand: 42 requests/wk vs Supply: 8 items listed.</p>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                                <span className="text-[10px] text-emerald-400 font-bold uppercase">Balanced Market</span>
                                <h4 className="font-bold text-white">Fluid Head Tripods</h4>
                                <p className="text-[11px] text-slate-400">Demand: 19 requests/wk vs Supply: 16 items listed.</p>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                                <span className="text-[10px] text-blue-400 font-bold uppercase">Surplus Supply</span>
                                <h4 className="font-bold text-white">Scientific Calculators</h4>
                                <p className="text-[11px] text-slate-400">Demand: 6 requests/wk vs Supply: 34 items listed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: DISPUTE CENTER & INVESTIGATION */}
            {activeTab === 'disputes' && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" /> Active Dispute Moderation Queue & Settlement Override
                    </h3>

                    <div className="space-y-4">
                        {disputes.map((d) => (
                            <div key={d.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-900">{d.id}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${d.status.includes('Review') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                            {d.status}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-amber-700">Claim Amount: ₹{d.amount}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{d.itemTitle}</h4>
                                        <p className="text-slate-500 mt-0.5">Borrower: <strong>{d.borrower}</strong> vs Owner: <strong>{d.owner}</strong></p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Reason: {d.reason}</p>
                                    </div>

                                    {d.status.includes('Review') ? (
                                        <Button onClick={() => setSelectedDispute(d)} className="bg-amber-600 hover:bg-amber-700 text-xs py-2 px-4">
                                            Investigate Evidence & Set Override
                                        </Button>
                                    ) : (
                                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                            <CheckCircle size={16} /> Settled & Closed
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 5: OVERDUE RETURNS & RISK ALERTS */}
            {activeTab === 'overdue' && (
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Clock size={18} className="text-red-500" /> Overdue Borrowed Loans & Late Fee Tracker
                        </h3>

                        {overdueBorrowings.map((b) => (
                            <div key={b.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                                <div>
                                    <span className="font-bold text-slate-900 text-sm block">{b.title}</span>
                                    <span className="text-slate-500">Borrower: {b.borrowerName} • Owner: {b.ownerName} • Due: {b.endDate}</span>
                                </div>
                                <Button size="sm" onClick={() => handleReminder(b.id)} className="bg-slate-900 hover:bg-slate-800 text-white text-xs">
                                    Push Return Reminder
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 space-y-2 text-xs text-amber-900">
                        <h4 className="font-bold flex items-center gap-1.5"><AlertCircle size={16} className="text-amber-600" /> Trust & Safety Risk Alert Feed</h4>
                        <p className="text-[11px] text-amber-800">User Rohan Verma (Trust Score: 89) logged 1 late return in the last 14 days. Monitored automatically.</p>
                    </div>
                </div>
            )}

            {/* TAB 6: AUDIT LOG & RULES */}
            {activeTab === 'audit' && (
                <AdminAuditLog auditLogs={auditLogs} />
            )}

            {/* Modals */}
            <DisputeInvestigationModal
                isOpen={!!selectedDispute}
                onClose={() => setSelectedDispute(null)}
                dispute={selectedDispute}
                onResolveOverride={overrideAdminSettlement}
            />

            <MethodologyModal
                isOpen={methodologyOpen}
                onClose={() => setMethodologyOpen(false)}
            />
        </div>
    );
}

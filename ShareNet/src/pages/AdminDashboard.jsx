import React, { useState } from 'react';
import useLendingStore from '../stores/lendingStore';
import { mockItems, mockKits, mockLocations } from '../lib/mockData';
import LocationBadge from '../components/ui/LocationBadge';
import Button from '../components/ui/Button';
import { ShieldCheck, Package, AlertTriangle, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
    const { disputes, resolveDispute, reservations } = useLendingStore();
    const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'reservations' | 'disputes' | 'locations'

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-1">
                        <ShieldCheck size={16} /> Campus Administrator Command Center
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Leihs & Shelf Admin Management
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Manage campus inventory, approve lending requests, resolve disputes, and track equipment locations.
                    </p>
                </div>

                <div className="flex gap-2">
                    <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                        Admin Role: Verified
                    </span>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
                {[
                    { id: 'inventory', label: 'Inventory & Asset Tags', icon: Package },
                    { id: 'reservations', label: 'Lending Approvals', icon: Clock },
                    { id: 'disputes', label: 'Disputes & Claims', icon: AlertTriangle },
                    { id: 'locations', label: 'Shelf Storage Locations', icon: MapPin },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 pb-3 border-b-2 transition-all ${
                            activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 font-bold'
                                : 'border-transparent text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab 1: Inventory & Asset Tags */}
            {activeTab === 'inventory' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-medium">Total Registered Assets</span>
                            <div className="text-2xl font-black text-slate-900 mt-1">{mockItems.length + mockKits.length}</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-medium">Equipment Kits (Shelf)</span>
                            <div className="text-2xl font-black text-blue-600 mt-1">{mockKits.length}</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-500 font-medium">Active Campus Lenders</span>
                            <div className="text-2xl font-black text-emerald-600 mt-1">42</div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                    <th className="p-4">Item / Asset</th>
                                    <th className="p-4">Asset Tag</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {mockItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="p-4 font-semibold text-slate-900">{item.title}</td>
                                        <td className="p-4 font-mono text-slate-600">{item.assetTag}</td>
                                        <td className="p-4"><LocationBadge location={item.location} /></td>
                                        <td className="p-4">
                                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium px-2 py-0.5 rounded text-[11px]">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tab 2: Reservations */}
            {activeTab === 'reservations' && (
                <div className="space-y-4">
                    {reservations.map((res) => (
                        <div key={res.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <span className="text-xs font-bold text-blue-600">{res.type} Reservation</span>
                                <h4 className="text-sm font-bold text-slate-900">{res.itemOrKitName}</h4>
                                <p className="text-xs text-slate-600 mt-1">Purpose: {res.purpose}</p>
                                <span className="text-[11px] text-slate-500 mt-1 block">Borrower: <strong>{res.borrower.fullName}</strong> (Trust Score: {res.borrower.trustScore})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                                    Approved
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab 3: Disputes */}
            {activeTab === 'disputes' && (
                <div className="space-y-4">
                    {disputes.map((disp) => (
                        <div key={disp.id} className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">{disp.status}</span>
                                    <span className="text-xs text-slate-500">{disp.date}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 mt-1">{disp.itemTitle}</h4>
                                <p className="text-xs text-slate-700 mt-1">Reason: <strong>{disp.reason}</strong></p>
                                <span className="text-[11px] text-slate-500 mt-1 block">
                                    Reporter: {disp.reporterName} vs Respondent: {disp.respondentName}
                                </span>
                            </div>
                            {disp.status !== 'Resolved by Admin' ? (
                                <Button size="sm" onClick={() => resolveDispute(disp.id)} className="bg-blue-600 hover:bg-blue-700 text-xs">
                                    Resolve Dispute
                                </Button>
                            ) : (
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                    <CheckCircle size={16} /> Resolved
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Tab 4: Locations */}
            {activeTab === 'locations' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockLocations.map((loc) => (
                        <div key={loc.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                <MapPin size={18} /> {loc.building}
                            </div>
                            <p className="text-xs text-slate-700 font-medium">Room / Locker: {loc.room}</p>
                            <p className="text-xs text-slate-500">Storage Rack: {loc.cabinet}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

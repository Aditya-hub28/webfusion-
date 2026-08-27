import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import LenderAnalyticsVisualizer from '../components/lender/LenderAnalyticsVisualizer';
import LenderCalendar from '../components/lender/LenderCalendar';
import BorrowerRiskCard from '../components/lender/BorrowerRiskCard';
import DamageReportModal from '../components/lender/DamageReportModal';
import AddResourceModal from '../components/lender/AddResourceModal';
import HandoverModal from '../components/transactions/HandoverModal';
import ConditionCheckTable from '../components/transactions/ConditionCheckTable';
import SettlementCard from '../components/transactions/SettlementCard';
import TransactionStepper from '../components/transactions/TransactionStepper';
import { Inbox, Package, Calendar, BarChart2, CheckCircle2, XCircle, Plus, AlertTriangle, ShieldCheck, Layers, Star, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function MyLendingPage() {
    const {
        resources,
        kits,
        borrowings,
        lenderEarnings,
        acceptBorrowRequest,
        confirmHandover,
        returnResource,
        reportLenderDamage,
        toggleResourceAvailability,
        addLenderResource,
        addEquipmentKit
    } = useCircularStore();

    const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'requests' | 'inventory' | 'calendar' | 'active'
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [damageModalOpen, setDamageModalOpen] = useState(null);
    const [handoverModalOpen, setHandoverModalOpen] = useState(null);

    const pendingRequests = borrowings.filter(b => b.stage === 'Requested');
    const activeBorrowingsList = borrowings.filter(b => b.stage.includes('Active') || b.stage === 'Accepted' || b.stage === 'Returned');

    const handleAcceptRequest = (bId) => {
        acceptBorrowRequest(bId);
        toast.success('Borrow request accepted! Borrower notified.');
    };

    const handleRejectRequest = (bId) => {
        toast.error('Borrow request declined.');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header & Persona Title */}
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5 mb-1">
                        <Inbox size={16} /> Lender & Resource Owner Control Hub
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Priya Patel's Resource Inventory
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Manage listed resources, create equipment kits, evaluate borrower risk, complete digital handovers, and track lending earnings.
                    </p>
                </div>

                <Button onClick={() => setAddModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold py-2.5 px-4 shadow-md">
                    <Plus size={16} className="mr-1" /> Add Resource / Equipment Kit
                </Button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-200/70 p-1.5 rounded-2xl overflow-x-auto gap-1 text-xs font-bold">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <BarChart2 size={15} /> Overview & Analytics
                </button>
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'requests' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Inbox size={15} /> Incoming Requests ({pendingRequests.length})
                </button>
                <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Package size={15} /> Inventory & Equipment Kits ({resources.length})
                </button>
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Calendar size={15} /> Availability Calendar
                </button>
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'active' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <CheckCircle2 size={15} /> Active Exchanges & Handovers ({activeBorrowingsList.length})
                </button>
            </div>

            {/* TAB 1: OVERVIEW & ANALYTICS */}
            {activeTab === 'overview' && (
                <LenderAnalyticsVisualizer earnings={lenderEarnings} />
            )}

            {/* TAB 2: INCOMING REQUESTS & BORROWER RISK VIEW */}
            {activeTab === 'requests' && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Inbox size={18} className="text-indigo-600" /> Pending Borrow Requests & Smart Risk Assessment
                    </h3>

                    {pendingRequests.length === 0 ? (
                        <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center text-xs text-slate-500">
                            No pending borrow requests right now.
                        </div>
                    ) : (
                        pendingRequests.map((req) => (
                            <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                                        Incoming Borrow Request
                                    </span>
                                    <span className="text-xs text-slate-400">Requested for: <strong>{req.startDate} to {req.endDate}</strong></span>
                                </div>

                                <TransactionStepper currentStage={req.stage} />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Request Info */}
                                    <div className="space-y-3">
                                        <h4 className="text-base font-bold text-slate-900">{req.title}</h4>
                                        <div className="text-xs text-slate-600 space-y-1">
                                            <div>Requested By: <strong className="text-slate-900">{req.borrowerName}</strong></div>
                                            <div>Daily Fee: <strong>₹{req.dailyCharge}/day</strong></div>
                                            <div>Security Deposit: <strong>₹{req.deposit} (Refundable)</strong></div>
                                            <div>Purpose: <strong>Club Reel Video Shoot</strong></div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button onClick={() => handleAcceptRequest(req.id)} className="bg-emerald-600 hover:bg-emerald-700 text-xs py-2 px-4 font-bold">
                                                Accept Borrow Request
                                            </Button>
                                            <Button onClick={() => handleRejectRequest(req.id)} variant="secondary" className="text-xs py-2 px-4">
                                                Decline
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Smart Risk View */}
                                    <BorrowerRiskCard borrowerName={req.borrowerName} trustScore={94} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* TAB 3: INVENTORY & EQUIPMENT KITS */}
            {activeTab === 'inventory' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Package size={18} className="text-emerald-600" /> Equipment Kits & Individual Inventory
                        </h3>
                        <Button onClick={() => setAddModalOpen(true)} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                            + Add Item or Kit
                        </Button>
                    </div>

                    {/* Kits */}
                    <div className="space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Created Equipment Kits</span>
                        {kits.map((kit) => (
                            <div key={kit.id} className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm space-y-3 border border-indigo-900">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                                        Multi-Resource Bundle • Saves ₹80/day
                                    </span>
                                    <span className="text-xs font-bold text-emerald-400">{kit.status}</span>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-white">{kit.name}</h4>
                                    <p className="text-xs text-slate-300 mt-0.5">{kit.tagline}</p>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                                    <span className="font-bold text-emerald-400">₹{kit.dailyCharge}/day + ₹{kit.deposit} deposit</span>
                                    <button onClick={() => toast.success('Kit status updated')} className="text-indigo-300 hover:underline">
                                        Pause Kit Listing
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resources */}
                    <div className="space-y-3 pt-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Individual Resources</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((r) => (
                                <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-900">{r.title}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {r.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-500 flex justify-between">
                                        <span>Fee: <strong>₹{r.dailyCharge}/day</strong></span>
                                        <span>Deposit: <strong>₹{r.deposit}</strong></span>
                                    </div>
                                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                                        <button onClick={() => toggleResourceAvailability(r.id)} className="text-emerald-600 font-bold hover:underline">
                                            Toggle Status ({r.status})
                                        </button>
                                        <span className="text-slate-400">Pristine Condition</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: AVAILABILITY CALENDAR */}
            {activeTab === 'calendar' && (
                <LenderCalendar resources={resources} />
            )}

            {/* TAB 5: ACTIVE EXCHANGES & HANDOVERS */}
            {activeTab === 'active' && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-600" /> Active Lending Transactions & Digital Handover
                    </h3>

                    {activeBorrowingsList.map((b) => (
                        <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                                    {b.stage}
                                </span>
                                <span className="text-xs text-slate-400">Borrower: <strong>{b.borrowerName}</strong></span>
                            </div>

                            <TransactionStepper currentStage={b.stage} />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                                    <div>Duration: <strong>{b.startDate} to {b.endDate}</strong></div>
                                </div>

                                <div>
                                    <div>Daily Rate: <strong>₹{b.dailyCharge}/day</strong></div>
                                    <div>Security Deposit Held: <strong>₹{b.deposit}</strong></div>
                                </div>

                                <div className="space-y-2">
                                    {b.stage === 'Accepted' && (
                                        <Button onClick={() => setHandoverModalOpen(b)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs py-2 font-bold">
                                            Start Lender Digital Handover
                                        </Button>
                                    )}

                                    {b.stage.includes('Active') && (
                                        <Button onClick={() => setDamageModalOpen(b)} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs py-2 font-bold">
                                            Report Damage / Return Inspection
                                        </Button>
                                    )}

                                    {b.stage === 'Returned' && (
                                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold text-center">
                                            ✓ Item Returned & Inspected!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals */}
            <AddResourceModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAddResource={addLenderResource}
                onAddKit={addEquipmentKit}
            />

            <DamageReportModal
                isOpen={!!damageModalOpen}
                onClose={() => setDamageModalOpen(null)}
                borrowing={damageModalOpen}
                onSubmitDamage={reportLenderDamage}
            />

            <HandoverModal
                isOpen={!!handoverModalOpen}
                onClose={() => setHandoverModalOpen(null)}
                resourceName={handoverModalOpen?.title}
                onConfirm={() => confirmHandover(handoverModalOpen?.id)}
            />
        </div>
    );
}

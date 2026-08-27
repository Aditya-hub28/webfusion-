import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import LenderAnalyticsVisualizer from '../components/lender/LenderAnalyticsVisualizer';
import LenderCalendar from '../components/lender/LenderCalendar';
import BorrowerRiskCard from '../components/lender/BorrowerRiskCard';
import DamageReportModal from '../components/lender/DamageReportModal';
import AddResourceModal from '../components/lender/AddResourceModal';
import EditResourceModal from '../components/lender/EditResourceModal';
import HandoverModal from '../components/transactions/HandoverModal';
import TransactionStepper from '../components/transactions/TransactionStepper';
import {
    Inbox, Package, Calendar, BarChart2, CheckCircle2, Plus, Edit3, Trash2,
    ToggleLeft, ToggleRight, Tag, MapPin, ShieldCheck, Camera, Speaker, Trophy, BookOpen, Tent
} from 'lucide-react';
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
        reportLenderDamage,
        toggleResourceAvailability,
        addLenderResource,
        addEquipmentKit,
        updateLenderResource,
        deleteLenderResource
    } = useCircularStore();

    const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'overview' | 'requests' | 'calendar' | 'active'
    const [categoryFilter, setCategoryFilter] = useState('All');

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editingResource, setEditingResource] = useState(null);
    const [damageModalOpen, setDamageModalOpen] = useState(null);
    const [handoverModalOpen, setHandoverModalOpen] = useState(null);

    const pendingRequests = borrowings.filter(b => b.stage === 'Requested');
    const activeBorrowingsList = borrowings.filter(b => b.stage.includes('Active') || b.stage === 'Accepted' || b.stage === 'Returned');

    const handleAcceptRequest = (bId) => {
        acceptBorrowRequest(bId);
        toast.success('Borrow request accepted! Borrower notified.');
    };

    const handleDelete = (resourceId, title) => {
        if (window.confirm(`Are you sure you want to delete listing "${title}"?`)) {
            deleteLenderResource(resourceId);
            toast.error(`Deleted "${title}" listing.`);
        }
    };

    const categoriesList = [
        { key: 'All', label: 'All Resources', icon: Package, count: resources.length },
        { key: 'Electronics', label: 'Electronics & Tech', icon: Camera, count: resources.filter(r => r.category === 'Electronics').length },
        { key: 'Event & AV', label: 'Event & AV', icon: Speaker, count: resources.filter(r => r.category === 'Event & AV').length },
        { key: 'Sports', label: 'Sports & Fitness', icon: Trophy, count: resources.filter(r => r.category === 'Sports').length },
        { key: 'Academic', label: 'Academic & Lab', icon: BookOpen, count: resources.filter(r => r.category === 'Academic').length },
        { key: 'Camping', label: 'Camping & Outdoor', icon: Tent, count: resources.filter(r => r.category === 'Camping').length }
    ];

    const filteredResources = categoryFilter === 'All'
        ? resources
        : resources.filter(r => r.category === categoryFilter);

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
                        Manage listed resources, edit prices/deposits, organize 5 campus categories, evaluate risk, and track earnings.
                    </p>
                </div>

                <Button onClick={() => setAddModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold py-2.5 px-4 shadow-md">
                    <Plus size={16} className="mr-1" /> Add Resource / Equipment Kit
                </Button>
            </div>

            {/* Main Navigation Tabs */}
            <div className="flex bg-slate-200/70 p-1.5 rounded-2xl overflow-x-auto gap-1 text-xs font-bold">
                <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Package size={15} /> Inventory & Equipment Kits ({resources.length})
                </button>
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

            {/* TAB 1: INVENTORY & EQUIPMENT KITS WITH EDIT & 5 CATEGORY FILTERS */}
            {activeTab === 'inventory' && (
                <div className="space-y-6">
                    {/* Category Filter Bar */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <Package size={18} className="text-emerald-600" /> 5 Campus Categories ({resources.length} Total Listings)
                            </h3>
                            <span className="text-xs text-slate-500 font-semibold">
                                Showing: <strong>{filteredResources.length} Items</strong>
                            </span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                            {categoriesList.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => setCategoryFilter(cat.key)}
                                    className={`px-3.5 py-2 rounded-2xl font-extrabold flex items-center gap-1.5 transition-all shrink-0 border ${
                                        categoryFilter === cat.key
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                            : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                                    }`}
                                >
                                    <cat.icon size={14} />
                                    {cat.label} ({cat.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Created Equipment Kits */}
                    <div className="space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Created Multi-Item Bundles</span>
                        {kits.map((kit) => (
                            <div key={kit.id} className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-5 shadow-md space-y-3 border border-indigo-900/60">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                                        Multi-Resource Bundle • Saves ₹80/day
                                    </span>
                                    <span className="text-xs font-bold text-emerald-400">🟢 {kit.status}</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-white">{kit.name}</h4>
                                    <p className="text-xs text-slate-300 mt-0.5">{kit.tagline}</p>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                                    <span className="font-extrabold text-emerald-400 text-sm">
                                        ₹{kit.dailyCharge}/day <span className="text-slate-400 font-normal text-xs">+ ₹{kit.deposit} deposit</span>
                                    </span>
                                    <button onClick={() => toast.success('Kit status updated')} className="text-indigo-300 hover:underline font-bold">
                                        Pause Kit Listing
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Individual Resources Grid */}
                    <div className="space-y-3 pt-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Individual Listings ({filteredResources.length})
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredResources.map((r) => (
                                <div key={r.id} className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between group">
                                    <div className="space-y-3">
                                        {/* Image & Category */}
                                        <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                                            <img
                                                src={r.images && r.images[0] ? r.images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'}
                                                alt={r.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                                                {r.category}
                                            </span>
                                            <span className={`absolute top-2 right-2 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                                                r.status === 'Available' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700' : 'bg-slate-900/80 text-slate-400 border-slate-700'
                                            }`}>
                                                {r.status === 'Available' ? '🟢 Available' : '🔴 Paused'}
                                            </span>
                                        </div>

                                        {/* Title & Info */}
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900 line-clamp-2">{r.title}</h4>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                                                <MapPin size={13} className="text-slate-400 shrink-0" />
                                                <span className="truncate">{r.location}</span>
                                            </div>
                                        </div>

                                        {/* Price & Deposit */}
                                        <div className="p-2.5 bg-slate-50 rounded-2xl flex justify-between items-center text-xs border border-slate-100">
                                            <div>
                                                <span className="text-slate-400 text-[10px] block">Daily Fee</span>
                                                <strong className="text-emerald-700 text-sm font-black">₹{r.dailyCharge}/day</strong>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-slate-400 text-[10px] block">Deposit</span>
                                                <strong className="text-slate-900 font-extrabold">₹{r.deposit}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons: Edit, Pause, Delete */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-xs font-bold">
                                        <button
                                            onClick={() => setEditingResource(r)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-colors border border-indigo-200/80"
                                            title="Edit Listing Details"
                                        >
                                            <Edit3 size={14} /> Edit
                                        </button>

                                        <button
                                            onClick={() => toggleResourceAvailability(r.id)}
                                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl transition-colors border ${
                                                r.status === 'Available'
                                                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200/80'
                                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200/80'
                                            }`}
                                            title="Toggle Availability"
                                        >
                                            {r.status === 'Available' ? <ToggleLeft size={15} /> : <ToggleRight size={15} />}
                                            {r.status === 'Available' ? 'Pause' : 'Resume'}
                                        </button>

                                        <button
                                            onClick={() => handleDelete(r.id, r.title)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                            title="Delete Listing"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: OVERVIEW & ANALYTICS */}
            {activeTab === 'overview' && (
                <LenderAnalyticsVisualizer earnings={lenderEarnings} />
            )}

            {/* TAB 3: INCOMING REQUESTS */}
            {activeTab === 'requests' && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Inbox size={18} className="text-indigo-600" /> Pending Borrow Requests & Risk Assessment
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
                                    <div className="space-y-3">
                                        <h4 className="text-base font-bold text-slate-900">{req.title}</h4>
                                        <div className="text-xs text-slate-600 space-y-1">
                                            <div>Requested By: <strong className="text-slate-900">{req.borrowerName}</strong></div>
                                            <div>Daily Fee: <strong>₹{req.dailyCharge}/day</strong></div>
                                            <div>Security Deposit: <strong>₹{req.deposit} (Refundable)</strong></div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button onClick={() => handleAcceptRequest(req.id)} className="bg-emerald-600 hover:bg-emerald-700 text-xs py-2 px-4 font-bold">
                                                Accept Borrow Request
                                            </Button>
                                        </div>
                                    </div>
                                    <BorrowerRiskCard borrowerName={req.borrowerName} trustScore={94} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* TAB 4: CALENDAR */}
            {activeTab === 'calendar' && (
                <LenderCalendar resources={resources} />
            )}

            {/* TAB 5: ACTIVE EXCHANGES */}
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

            <EditResourceModal
                isOpen={!!editingResource}
                onClose={() => setEditingResource(null)}
                resource={editingResource}
                onSave={updateLenderResource}
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

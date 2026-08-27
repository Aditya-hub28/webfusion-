import React, { useState } from 'react';
import { useCircularStore } from '../stores/circularStore';
import HandoverModal from '../components/transactions/HandoverModal';
import ConditionCheckTable from '../components/transactions/ConditionCheckTable';
import SettlementCard from '../components/transactions/SettlementCard';
import RatingModal from '../components/transactions/RatingModal';
import CountdownTimer from '../components/ui/CountdownTimer';
import RequestExtensionModal from '../components/borrower/RequestExtensionModal';
import BorrowerImpactBanner from '../components/borrower/BorrowerImpactBanner';
import TransactionStepper from '../components/transactions/TransactionStepper';
import { Clock, ShieldCheck, CheckCircle2, AlertTriangle, Star, RefreshCw, Bookmark, Calendar, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function MyBorrowingsPage() {
    const {
        borrowings,
        resources,
        savedResourceIds,
        userTrustScore,
        borrowerPersonalSavings,
        confirmHandover,
        returnResource,
        settleTransaction,
        raiseDispute,
        submitRating,
        requestExtension,
        cancelBorrowRequest
    } = useCircularStore();

    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'pending' | 'history' | 'saved'
    const [selectedHandover, setSelectedHandover] = useState(null);
    const [ratingModalOpen, setRatingModalOpen] = useState(null);
    const [extensionModalOpen, setExtensionModalOpen] = useState(null);

    const activeList = borrowings.filter(b => b.stage.includes('Active') || b.stage === 'Accepted');
    const pendingList = borrowings.filter(b => b.stage === 'Requested');
    const historyList = borrowings.filter(b => b.stage === 'Returned' || b.stage.includes('Settled') || b.stage.includes('Rated'));
    const savedResourcesList = resources.filter(r => savedResourceIds.includes(r.id));

    const handleReturnNoDamage = (bId) => {
        returnResource(bId, { body: 'Excellent', screen: 'Excellent', lens: 'Excellent', accessories: 'Complete' }, 0);
        toast.success('Return logged cleanly! Proceeding to deposit settlement.');
    };

    const handleReturnWithDamage = (bId) => {
        returnResource(bId, { body: 'Minor Scratch Reported', screen: 'Excellent', lens: 'Excellent', accessories: 'Complete' }, 300);
        toast.error('Damage reported: ₹300 deduction from deposit.');
    };

    const handleRaiseDispute = (bId) => {
        raiseDispute(bId, 'Disputed scratch deduction charge');
        toast.error('Dispute raised! Status updated to Under Review for Admin moderation.');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header & Persona Title */}
            <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-1">
                        <RefreshCw size={16} /> Student Borrower Control Hub
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Aditya Sharma's Borrowing Center
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Track active borrowings, complete digital handovers, request period extensions, verify return conditions, and build your trust score.
                    </p>
                </div>
            </div>

            {/* Personal Savings Banner */}
            <BorrowerImpactBanner savings={borrowerPersonalSavings} trustScore={userTrustScore} />

            {/* Navigation Tabs */}
            <div className="flex bg-slate-200/70 p-1.5 rounded-2xl overflow-x-auto gap-1 text-xs font-bold">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'active' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Clock size={15} /> Active Borrowings ({activeList.length})
                </button>
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <RefreshCw size={15} /> Pending Requests ({pendingList.length})
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <CheckCircle2 size={15} /> Borrowing History ({historyList.length})
                </button>
                <button
                    onClick={() => setActiveTab('saved')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${activeTab === 'saved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                    <Bookmark size={15} /> Saved Resources ({savedResourcesList.length})
                </button>
            </div>

            {/* TAB 1: ACTIVE BORROWINGS */}
            {activeTab === 'active' && (
                <div className="space-y-6">
                    {activeList.length === 0 ? (
                        <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center text-xs text-slate-500">
                            No active borrowings right now. Discover resources using AI search!
                        </div>
                    ) : (
                        activeList.map((b) => (
                            <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                                {/* Status Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                            b.stage.includes('Active') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                                        }`}>
                                            {b.stage}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
                                    </div>

                                    {b.stage.includes('Active') && (
                                        <CountdownTimer dueTimestamp={b.dueTimestamp} />
                                    )}
                                </div>

                                {/* 10-Step Visual Lifecycle Stepper */}
                                <TransactionStepper currentStage={b.stage} />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded-2xl border border-slate-100" />

                                    <div className="space-y-2 text-xs text-slate-600">
                                        <div>Owner: <strong className="text-slate-900">{b.ownerName}</strong></div>
                                        <div>Borrowing Dates: <strong>{b.startDate} to {b.endDate}</strong></div>
                                        <div>Daily Charge: <strong>₹{b.dailyCharge}/day</strong></div>
                                        <div>Security Deposit: <strong>₹{b.deposit} (Refundable)</strong></div>
                                    </div>

                                    <div className="flex flex-col justify-between space-y-3">
                                        {b.stage === 'Accepted' && (
                                            <Button onClick={() => setSelectedHandover(b)} className="bg-emerald-600 hover:bg-emerald-700 text-xs py-2.5 font-bold">
                                                Confirm Digital Handover Protocol
                                            </Button>
                                        )}

                                        {b.stage.includes('Active') && (
                                            <div className="space-y-2">
                                                <Button onClick={() => handleReturnNoDamage(b.id)} className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs py-2.5 font-bold">
                                                    Return Resource (No Damage)
                                                </Button>

                                                <button
                                                    onClick={() => setExtensionModalOpen(b)}
                                                    className="w-full text-center text-xs text-indigo-600 hover:underline font-semibold"
                                                >
                                                    Request Borrowing Extension →
                                                </button>

                                                <button
                                                    onClick={() => handleReturnWithDamage(b.id)}
                                                    className="w-full text-center text-[11px] text-amber-700 hover:underline font-semibold"
                                                >
                                                    Simulate Damage Scenario (Scratch report: ₹300 deduction)
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* TAB 2: PENDING REQUESTS */}
            {activeTab === 'pending' && (
                <div className="space-y-6">
                    {pendingList.length === 0 ? (
                        <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center text-xs text-slate-500">
                            No pending borrow requests right now.
                        </div>
                    ) : (
                        pendingList.map((req) => (
                            <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                                            Status: PENDING OWNER APPROVAL
                                        </span>
                                        <h4 className="text-base font-bold text-slate-900 mt-2">{req.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Owner: {req.ownerName} • Dates: {req.startDate} to {req.endDate} • Fee: ₹{req.dailyCharge}/day</p>
                                    </div>

                                    <Button size="sm" onClick={() => cancelBorrowRequest(req.id)} variant="secondary" className="text-xs text-red-600 border-red-200 hover:bg-red-50">
                                        Cancel Request
                                    </Button>
                                </div>
                                <TransactionStepper currentStage={req.stage} />
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* TAB 3: BORROWING HISTORY */}
            {activeTab === 'history' && (
                <div className="space-y-6">
                    {historyList.map((b) => (
                        <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                                    {b.stage}
                                </span>
                                <span className="text-xs text-slate-400">Dates: {b.startDate} to {b.endDate}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h4 className="text-base font-bold text-slate-900">{b.title}</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Owner: {b.ownerName} • Daily Fee: ₹{b.dailyCharge}/day • Deposit Refunded: ₹{b.deposit}</p>
                                </div>

                                {b.settled && !b.rated && (
                                    <Button onClick={() => setRatingModalOpen(b)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 px-4">
                                        <Star size={14} className="mr-1 inline" /> Rate & Bump Trust Score (+1)
                                    </Button>
                                )}

                                {b.rated && (
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                        <CheckCircle2 size={16} /> Rated 5.0 ⭐ & Trust Score Updated
                                    </span>
                                )}
                            </div>
                            <TransactionStepper currentStage={b.stage} />
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 4: SAVED RESOURCES */}
            {activeTab === 'saved' && (
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Bookmark size={18} className="text-emerald-600" /> Saved Resources & Bookmarks
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {savedResourcesList.map((res) => (
                            <div key={res.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                                <img src={res.images[0]} alt={res.title} className="w-full h-36 object-cover rounded-xl" />
                                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{res.title}</h4>
                                <div className="text-xs text-slate-500">Fee: <strong>₹{res.dailyCharge}/day</strong> • Deposit: <strong>₹{res.deposit}</strong></div>
                                <Button size="sm" onClick={() => toast.success('Redirecting to AI Match')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs">
                                    Borrow Saved Resource
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modals */}
            <HandoverModal
                isOpen={!!selectedHandover}
                onClose={() => setSelectedHandover(null)}
                resourceName={selectedHandover?.title}
                onConfirm={() => confirmHandover(selectedHandover?.id)}
            />

            <RequestExtensionModal
                isOpen={!!extensionModalOpen}
                onClose={() => setExtensionModalOpen(null)}
                borrowing={extensionModalOpen}
                onRequestExtension={requestExtension}
            />

            <RatingModal
                isOpen={!!ratingModalOpen}
                onClose={() => setRatingModalOpen(null)}
                resourceName={ratingModalOpen?.title}
                onSubmitRating={(ratingVal, reviewText) => submitRating(ratingModalOpen?.id, ratingVal, reviewText)}
            />
        </div>
    );
}

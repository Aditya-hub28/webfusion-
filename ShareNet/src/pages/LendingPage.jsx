import React, { useState } from 'react';
import useLendingStore from '../stores/lendingStore';
import ReturnTracker from '../components/lending/ReturnTracker';
import QRCodeModal from '../components/ui/QRCodeModal';
import ConditionLogModal from '../components/items/ConditionLogModal';

import { Calendar, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function LendingPage() {
    const { reservations, updateReservationStatus, conditionLogs, addConditionLog } = useLendingStore();
    const [selectedQR, setSelectedQR] = useState(null);
    const [selectedInspect, setSelectedInspect] = useState(null);

    const handleReturn = (reservationId) => {
        updateReservationStatus(reservationId, 'Returned & Verified');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-1">
                    <Calendar size={16} /> Leihs Lending Workflow
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Active Borrowings & Return Ledger
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Track equipment return due dates, perform QR scanner check-ins, and view pre/post borrow condition logs.
                </p>
            </div>

            {/* Active Reservations */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Clock size={18} className="text-blue-600" /> Active Reservations & Borrowings ({reservations.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reservations.map((res) => (
                        <ReturnTracker
                            key={res.id}
                            reservation={res}
                            onReturn={handleReturn}
                            onShowQR={(r) => setSelectedQR(r)}
                            onInspect={(r) => setSelectedInspect(r)}
                        />
                    ))}
                </div>
            </div>

            {/* Shelf Condition Inspection Logs */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-blue-600" /> Pre/Post Borrow Condition Audit Logs
                </h2>

                <div className="space-y-3">
                    {conditionLogs.map((log) => (
                        <div key={log.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-900">{log.itemName}</span>
                                    <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{log.assetTag}</span>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{log.rating}</span>
                                </div>
                                <p className="text-xs text-slate-600 mt-1.5">{log.notes}</p>
                            </div>
                            <div className="text-right text-[11px] text-slate-400 shrink-0">
                                <span>Logged by: {log.loggedBy}</span>
                                <div className="mt-0.5">{log.timestamp}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <QRCodeModal
                isOpen={!!selectedQR}
                onClose={() => setSelectedQR(null)}
                itemOrKit={selectedQR}
            />

            <ConditionLogModal
                isOpen={!!selectedInspect}
                onClose={() => setSelectedInspect(null)}
                reservation={selectedInspect}
                onSubmit={(log) => addConditionLog(log)}
            />
        </div>
    );
}

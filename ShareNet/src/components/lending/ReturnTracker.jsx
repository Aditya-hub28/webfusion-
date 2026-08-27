import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';
import Button from '../ui/Button';

export default function ReturnTracker({ reservation, onReturn, onShowQR, onInspect }) {
    if (!reservation) return null;

    const isOverdue = reservation.status === 'Overdue';

    return (
        <div className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${
            isOverdue ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
        }`}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                        reservation.status === 'Active Lending' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        reservation.status === 'Overdue' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                        {reservation.status}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2">{reservation.itemOrKitName}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Asset Tag: <span className="font-mono">{reservation.assetTag}</span></p>
                </div>
                <button
                    onClick={() => onShowQR(reservation)}
                    className="p-2 text-slate-600 hover:text-blue-600 bg-slate-100 rounded-xl hover:bg-blue-50 transition-colors"
                    title="View QR Code for Return Scan"
                >
                    <QrCode size={18} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Due Date & Time</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Clock size={13} className="text-blue-600" /> {reservation.returnDueDate}
                    </span>
                </div>
                <div>
                    <span className="text-slate-400 font-medium block text-[11px]">Return Location</span>
                    <span className="font-semibold text-slate-800 truncate block mt-0.5">
                        {reservation.pickupLocation}
                    </span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                    onClick={() => onInspect(reservation)}
                    className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
                >
                    <ShieldCheck size={14} /> Log Pre/Post Inspection
                </button>
                <Button
                    size="sm"
                    onClick={() => onReturn(reservation.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                >
                    <CheckCircle size={14} className="mr-1 inline" /> Check-in & Return
                </Button>
            </div>
        </div>
    );
}

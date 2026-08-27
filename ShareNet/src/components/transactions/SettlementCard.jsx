import React from 'react';
import { CheckCircle2, DollarSign, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export default function SettlementCard({ borrowing, onSettle }) {
    if (!borrowing) return null;

    const charge = borrowing.dailyCharge || 200;
    const fee = borrowing.platformFee || 20;
    const deposit = borrowing.deposit || 500;
    const damageDeduction = borrowing.damageDeduction || 0;
    const refundAmount = deposit - damageDeduction;
    const totalPaid = charge + fee + deposit;
    const finalNetCost = charge + fee + damageDeduction;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                        <ShieldCheck size={14} /> Transparent Settlement Ledger
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{borrowing.title}</h3>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {borrowing.settled ? 'Settled & Refunded' : 'Pending Settlement'}
                </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                    <span>Borrowing Charge (1 Day):</span>
                    <span className="font-semibold text-slate-900">₹{charge}</span>
                </div>
                <div className="flex justify-between">
                    <span>Platform Service Fee:</span>
                    <span className="font-semibold text-slate-900">₹{fee}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                    <span>Security Deposit Held:</span>
                    <span>₹{deposit}</span>
                </div>

                {damageDeduction > 0 && (
                    <div className="flex justify-between text-amber-700 font-semibold bg-amber-50 p-2 rounded-lg">
                        <span>Damage Deduction:</span>
                        <span>- ₹{damageDeduction}</span>
                    </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
                    <span>Refunded to Security Deposit:</span>
                    <span className="text-emerald-600">₹{refundAmount}</span>
                </div>

                <div className="flex justify-between text-xs font-medium text-slate-500 pt-1">
                    <span>Final Net Borrowing Cost:</span>
                    <span>₹{finalNetCost}</span>
                </div>
            </div>

            {!borrowing.settled && (
                <Button onClick={onSettle} className="w-full bg-emerald-600 hover:bg-emerald-700 text-xs py-2.5">
                    <CheckCircle2 size={16} className="mr-1.5 inline" /> Confirm Settlement & Release ₹{refundAmount} Refund
                </Button>
            )}
        </div>
    );
}

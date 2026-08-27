import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ShieldCheck, Calendar, FileText, CheckCircle2, Clock } from 'lucide-react';

export default function BorrowingAgreementModal({ isOpen, onClose, resource, onConfirmRequest }) {
    const [agreed, setAgreed] = useState(true);

    if (!isOpen || !resource) return null;

    const dailyRate = resource.dailyCharge || 200;
    const days = 2;
    const borrowingFee = dailyRate * days;
    const platformFee = resource.platformFee || 20;
    const deposit = resource.deposit || 500;
    const totalUpfront = borrowingFee + platformFee + deposit;

    const handleConfirm = () => {
        if (onConfirmRequest) {
            onConfirmRequest(resource);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Digital Borrowing Agreement & Terms Confirmation">
            <div className="space-y-5 text-xs text-slate-700">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-900">
                    <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-bold block">TSEC Campus Circular Security & Responsibility Terms</span>
                        <span className="text-[11px]">Before confirming your request, review the summary of responsibilities, return deadline, and deposit refund policies.</span>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900 text-sm pb-2 border-b border-slate-200">
                        <span>Resource: {resource.title || resource.name}</span>
                        <span className="text-emerald-600">₹{dailyRate}/day</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-600">
                        <div>Borrower: <strong>Aditya Sharma (CS Dept)</strong></div>
                        <div>Owner: <strong>Priya Patel (Media Dept)</strong></div>
                        <div>Start Date: <strong>28 Aug 2026</strong></div>
                        <div>Return Deadline: <strong>30 Aug 2026 (6:00 PM)</strong></div>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-slate-300"><span>Borrowing Charge ({days} Days):</span><span>₹{borrowingFee}</span></div>
                    <div className="flex justify-between text-slate-300"><span>Configurable Platform Fee:</span><span>₹{platformFee}</span></div>
                    <div className="flex justify-between text-amber-300 font-semibold"><span>Refundable Security Deposit:</span><span>₹{deposit}</span></div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                        <span>Total Upfront Amount:</span>
                        <span className="text-emerald-400">₹{totalUpfront}</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-bold text-center mt-1">₹{deposit} deposit is 100% refundable after successful return inspection.</p>
                </div>

                {/* Agreement Terms */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-900 block">Borrower Responsibilities:</span>
                    <ul className="list-disc pl-4 space-y-0.5">
                        <li>Return equipment in original condition before the deadline.</li>
                        <li>Handle all accessories (batteries, cables, lenses) with extreme care.</li>
                        <li>Agree to damage deduction if physical damage or loss occurs.</li>
                    </ul>
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                    />
                    I accept all borrowing terms and agree to return before deadline.
                </label>

                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!agreed}
                        className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                    >
                        Confirm Agreement & Send Request
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

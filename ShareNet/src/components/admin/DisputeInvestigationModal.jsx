import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertTriangle, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DisputeInvestigationModal({ isOpen, onClose, dispute, onResolveOverride }) {
    const [approvedAmount, setApprovedAmount] = useState(200);
    const [settled, setSettled] = useState(false);

    if (!isOpen || !dispute) return null;

    const handleResolve = (e) => {
        e.preventDefault();
        setSettled(true);
        if (onResolveOverride) {
            onResolveOverride(dispute.id, Number(approvedAmount));
        }
        toast.success(`Dispute ${dispute.id} resolved! Approved damage settlement of ₹${approvedAmount}.`);
        setTimeout(() => {
            setSettled(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Dispute Investigation & Resolution • ${dispute.id}`}>
            {settled ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Dispute Resolved & Closed!</h3>
                    <p className="text-xs text-slate-600">Settlement override of ₹{approvedAmount} approved. State updated for both parties.</p>
                </div>
            ) : (
                <div className="space-y-5 text-xs text-slate-700">
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900">
                        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold block">Admin Evidence Review Protocol</span>
                            <span className="text-[11px]">Inspect condition evidence, hear both sides, and set an authoritative damage settlement override.</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Borrower</span>
                            <div className="font-bold text-slate-900 mt-0.5">{dispute.borrower}</div>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Resource Owner</span>
                            <div className="font-bold text-slate-900 mt-0.5">{dispute.owner}</div>
                        </div>
                    </div>

                    {/* Evidence Box */}
                    <div className="space-y-3">
                        <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 space-y-1">
                            <span className="font-bold text-amber-900 block">Owner Evidence Claim:</span>
                            <p className="text-[11px] text-amber-800 italic">"{dispute.ownerEvidence || 'Minor scratch discovered near lens mount during return inspection.'}"</p>
                        </div>

                        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 space-y-1">
                            <span className="font-bold text-indigo-900 block">Borrower Response:</span>
                            <p className="text-[11px] text-indigo-800 italic">"{dispute.borrowerResponse || 'Scratch was pre-existing prior to digital handover.'}"</p>
                        </div>
                    </div>

                    {/* Settlement Override Form */}
                    <form onSubmit={handleResolve} className="space-y-4 pt-2 border-t border-slate-100">
                        <div>
                            <label className="block font-bold text-slate-700 uppercase mb-1">
                                Admin Approved Damage Settlement (₹)
                            </label>
                            <input
                                type="number"
                                value={approvedAmount}
                                onChange={(e) => setApprovedAmount(e.target.value)}
                                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-sm"
                                required
                            />
                            <p className="text-[11px] text-slate-400 mt-1">
                                Claim: ₹{dispute.amount} • Approved: ₹{approvedAmount} • Refund to Borrower: ₹{Math.max(0, 500 - approvedAmount)}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                                Approve Settlement Override & Resolve Dispute
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </Modal>
    );
}

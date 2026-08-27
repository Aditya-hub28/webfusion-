import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertTriangle, Camera, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DamageReportModal({ isOpen, onClose, borrowing, onSubmitDamage }) {
    const [damageType, setDamageType] = useState('Minor Scratch');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(300);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen || !borrowing) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (onSubmitDamage) {
            onSubmitDamage(borrowing.id, damageType, description || 'Scratch reported during return inspection.', cost);
        }
        toast.error(`Damage report filed! ₹${cost} deduction proposed.`);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Report Resource Damage • ${borrowing.title}`}>
            {submitted ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-amber-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Damage Report Logged!</h3>
                    <p className="text-xs text-slate-600">Deduction of ₹{cost} submitted to transaction settlement ledger.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900">
                        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold block">File Evidence-Based Damage Claim</span>
                            <span className="text-[11px]">Deductions will be subtracted from the ₹{borrowing.deposit} security deposit held.</span>
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Damage Category</label>
                        <select
                            value={damageType}
                            onChange={(e) => setDamageType(e.target.value)}
                            className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-semibold"
                        >
                            <option value="Minor Scratch">Minor Body / Lens Scratch (₹300 deduction)</option>
                            <option value="Missing Accessory">Missing Accessory Cable / Lens Cap (₹200 deduction)</option>
                            <option value="Major Functional Repair">Functional Malfunction (₹500 full deposit hold)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Damage Description & Inspection Notes</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe damage details discovered during return inspection..."
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Repair Cost</span>
                            <div className="text-base font-black text-amber-700 mt-0.5">₹{cost}</div>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Refund to Borrower</span>
                            <div className="text-base font-black text-emerald-600 mt-0.5">₹{Math.max(0, (borrowing.deposit || 500) - cost)}</div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
                            Submit Damage Report
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertTriangle, ShieldCheck, Camera, Clock, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RaiseDisputeModal({ isOpen, onClose, onRaiseDispute }) {
    const [itemTitle, setItemTitle] = useState('Sony Alpha A7 III 4K Camera');
    const [borrower, setBorrower] = useState('Rohan Verma');
    const [owner, setOwner] = useState('Priya Patel');
    const [type, setType] = useState('Lens Body Scratch & Cosmetic Damage');
    const [amount, setAmount] = useState(250);
    const [reason, setReason] = useState('Scratch on camera lens barrel detected during return inspection.');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRaiseDispute({
            itemTitle,
            borrower,
            owner,
            type,
            amount: Number(amount),
            reason,
            evidencePhotos: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600']
        });
        toast.success(`Raised Dispute for "${itemTitle}"! Added to Admin Escrow Queue.`);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Raise New Admin Dispute Case (Late Return / Damage)">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-amber-900 font-medium">
                    <span className="font-bold block flex items-center gap-1.5 text-amber-800">
                        <AlertTriangle size={15} /> Admin Escrow & Dispute Resolution
                    </span>
                    Log a formal complaint for late returns, scratches, missing accessories, or overdue unreturned assets.
                </div>

                <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Equipment Title</label>
                    <input
                        type="text"
                        value={itemTitle}
                        onChange={(e) => setItemTitle(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Borrower Name</label>
                        <input
                            type="text"
                            value={borrower}
                            onChange={(e) => setBorrower(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Lender / Owner Name</label>
                        <input
                            type="text"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Dispute Category</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                        >
                            <option value="Late Return Penalty">⏰ Late Return Penalty (Overdue)</option>
                            <option value="Lens Body Scratch & Cosmetic Damage">⚡ Scratch / Body Damage</option>
                            <option value="Missing Accessory Component">🎒 Missing Cable / Accessory</option>
                            <option value="Unreturned Asset Escalation (Over 48h)">❌ Unreturned Asset (Over 48h Overdue)</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="font-bold text-slate-700 block">Escrow Claim Amount (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Detailed Dispute Evidence & Notes</label>
                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Provide details on timestamp, scratch location, or late return delay..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-amber-500"
                        required
                    ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
                    <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
                        Raise Dispute Case
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

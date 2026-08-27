import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RequestExtensionModal({ isOpen, onClose, borrowing, onRequestExtension }) {
    const [newReturnDate, setNewReturnDate] = useState('2026-08-31');
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen || !borrowing) return null;

    const dailyRate = borrowing.dailyCharge || 200;
    const additionalDays = 2;
    const additionalCost = dailyRate * additionalDays;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (onRequestExtension) {
            onRequestExtension(borrowing.id, newReturnDate, additionalCost);
        }
        toast.success(`Extension requested to ${newReturnDate}! Owner notified.`);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Request Borrowing Extension • ${borrowing.title}`}>
            {submitted ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Extension Request Sent!</h3>
                    <p className="text-xs text-slate-600">Priya Patel will review your extension request for {newReturnDate}.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs text-slate-700">
                    <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-2.5 text-indigo-900">
                        <Clock size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold block">Extend Borrowing Duration</span>
                            <span className="text-[11px]">Request additional days before return due time. Subject to owner approval.</span>
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">Current Return Date</label>
                        <input
                            type="text"
                            value={borrowing.endDate}
                            disabled
                            className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-500"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1.5">New Requested Return Date</label>
                        <input
                            type="date"
                            value={newReturnDate}
                            onChange={(e) => setNewReturnDate(e.target.value)}
                            className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                            required
                        />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex justify-between font-semibold"><span>Daily Rate:</span><span>₹{dailyRate}/day</span></div>
                        <div className="flex justify-between font-semibold"><span>Additional Days:</span><span>+{additionalDays} Days</span></div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                            <span>Additional Fee:</span>
                            <span className="text-emerald-600">₹{additionalCost}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                            Send Extension Request
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

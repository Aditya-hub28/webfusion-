import React, { useState } from 'react';
import { ShieldCheck, Camera, CheckCircle2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function ConditionLogModal({ isOpen, onClose, reservation, onSubmit }) {
    const [rating, setRating] = useState('Pristine');
    const [notes, setNotes] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!reservation) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (onSubmit) {
            onSubmit({
                reservationId: reservation.id,
                rating,
                notes: notes || 'Condition verified cleanly upon check-in.',
                timestamp: new Date().toLocaleString()
            });
        }
        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Shelf Asset Condition Inspection Log">
            {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Inspection Log Saved!</h3>
                    <p className="text-sm text-slate-600">Pre/Post borrow condition recorded to campus asset ledger.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                        <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-blue-900">
                            <span className="font-semibold block">{reservation.itemOrKitName}</span>
                            <span>Asset Tag: {reservation.assetTag || 'SHLF-EQUIP-101'}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Condition Assessment
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Pristine', 'Good', 'Minor Wear'].map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setRating(c)}
                                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                                        rating === c
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Inspection Notes & Accessories Check
                        </label>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g. Lens clean, all cables included, no battery swelling..."
                            className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <div className="p-4 border border-dashed border-slate-300 rounded-xl text-center bg-slate-50">
                        <Camera size={24} className="text-slate-400 mx-auto mb-1" />
                        <span className="text-xs text-slate-600 font-medium">Attach Verification Photo (Optional)</span>
                        <p className="text-[10px] text-slate-400">Simulates pre-borrow or post-return photo record</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Log Condition & Verify
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HandoverModal({ isOpen, onClose, resourceName, onConfirm }) {
    const [checkedItems, setCheckedItems] = useState({
        body: true,
        screen: true,
        lens: true,
        accessories: true
    });
    const [isConfirmed, setIsConfirmed] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        setIsConfirmed(true);
        setTimeout(() => {
            setIsConfirmed(false);
            onConfirm();
            onClose();
        }, 1200);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Digital Handover Protocol • ${resourceName}`}>
            {isConfirmed ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Handover Confirmed!</h3>
                    <p className="text-sm text-slate-600">Resource status changed to <strong>BORROWED (ACTIVE)</strong>.</p>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                        <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-900">
                            Verify the physical condition of the resource together with the owner before confirming handover.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Condition Snapshot Checklist
                        </label>
                        {[
                            { key: 'body', label: 'Body & Chassis: Excellent (No cracks or deep dents)' },
                            { key: 'screen', label: 'Screen / Optics: Clean & Scratch-free' },
                            { key: 'lens', label: 'Lens & Sensor: Spotless & Fully Functional' },
                            { key: 'accessories', label: 'Accessories: 2x Batteries, SD Card, Carrying Case complete' }
                        ].map((chk) => (
                            <label key={chk.key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-semibold text-slate-800">
                                <input
                                    type="checkbox"
                                    checked={checkedItems[chk.key]}
                                    onChange={(e) => setCheckedItems({ ...checkedItems, [chk.key]: e.target.checked })}
                                    className="w-4 h-4 text-emerald-600 rounded"
                                />
                                {chk.label}
                            </label>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700">
                            Confirm Handover & Start Borrowing
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
}

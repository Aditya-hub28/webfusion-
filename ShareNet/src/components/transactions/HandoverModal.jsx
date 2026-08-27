import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HandoverModal({ isOpen, onClose, resourceName, borrowing, onConfirm }) {
    const [checkedItems, setCheckedItems] = useState({
        body: true,
        screen: true,
        lens: true,
        accessories: true
    });
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        // All checkboxes must be checked
        if (!checkedItems.body || !checkedItems.screen || !checkedItems.lens || !checkedItems.accessories) {
            toast.error('Please verify all checklist items first!');
            return;
        }

        // Verify the 4-digit code (falls back to 8491 for default mocks)
        const expectedCode = borrowing?.securityCode || '8491';
        if (otpInput.trim() !== expectedCode) {
            setErrorMsg(`Incorrect Handover Verification Code! (Hint: check notification popover or chat logs)`);
            toast.error('Verification Code Mismatch!');
            return;
        }

        setErrorMsg('');
        setIsConfirmed(true);
        setTimeout(() => {
            setIsConfirmed(false);
            setOtpInput('');
            onConfirm();
            onClose();
        }, 1200);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Digital Handover Protocol • ${resourceName}`}>
            {isConfirmed ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Handover Verified & Confirmed!</h3>
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

                    {/* Condition checklist */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Condition Snapshot Checklist
                        </label>
                        {[
                            { key: 'body', label: 'Body & Chassis: Excellent (No cracks or deep dents)' },
                            { key: 'screen', label: 'Screen / Optics: Clean & Scratch-free' },
                            { key: 'lens', label: 'Lens & Sensor: Spotless & Fully Functional' },
                            { key: 'accessories', label: 'Accessories: Complete & accounted for' }
                        ].map((chk) => (
                            <label key={chk.key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-xs font-semibold text-slate-800">
                                <input
                                    type="checkbox"
                                    checked={checkedItems[chk.key]}
                                    onChange={(e) => setCheckedItems({ ...checkedItems, [chk.key]: e.target.checked })}
                                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                                />
                                {chk.label}
                            </label>
                        ))}
                    </div>

                    {/* Verification OTP input */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                        <label className="text-xs font-bold text-slate-750 uppercase tracking-wider flex items-center gap-1.5">
                            <Lock size={14} className="text-emerald-600 shrink-0" /> Enter 4-Digit Handover Verification Code
                        </label>
                        <input
                            type="text"
                            value={otpInput}
                            onChange={(e) => {
                                setOtpInput(e.target.value);
                                if (errorMsg) setErrorMsg('');
                            }}
                            placeholder="e.g. 8491"
                            className="w-full text-center tracking-[0.5em] font-mono text-lg font-black p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            maxLength={4}
                        />
                        {errorMsg && (
                            <p className="text-[11px] text-red-600 font-bold leading-tight">{errorMsg}</p>
                        )}
                        <p className="text-[10px] text-slate-400">
                            The lender will provide this 4-digit code. It is visible in your notification drawer and the trade chat history.
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-xs py-2 px-4">
                            Confirm Handover & Start Borrowing
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
}

import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Leaf, DollarSign, RefreshCw, HelpCircle } from 'lucide-react';

export default function MethodologyModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="How Do We Calculate Campus Impact Figures?">
            <div className="space-y-4 text-xs text-slate-700">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-1">
                    <span className="font-bold block flex items-center gap-1.5">
                        <Leaf size={16} className="text-emerald-600" /> Estimated Methodology Transparency
                    </span>
                    <p className="text-[11px]">All financial and environmental metrics are computed based on average retail replacement costs and standard manufacturing carbon footprints.</p>
                </div>

                <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                            <DollarSign size={14} className="text-emerald-600" /> ₹48,250 Estimated Money Saved
                        </h4>
                        <p className="text-[11px] text-slate-500">Calculated as (Retail Purchase Price - Daily Borrowing Charge) × Days Borrowed across 3,920 exchanges.</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                            <RefreshCw size={14} className="text-blue-600" /> 462 Shared Resources
                        </h4>
                        <p className="text-[11px] text-slate-500">Active registered inventory shared by verified campus members across 4 main hostels and 3 academic blocks.</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                            <Leaf size={14} className="text-teal-600" /> 317 kg Estimated Waste Avoided
                        </h4>
                        <p className="text-[11px] text-slate-500">Based on plastic and e-waste manufacturing reduction rates per reused electronics item.</p>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button variant="secondary" onClick={onClose}>Close Methodology</Button>
                </div>
            </div>
        </Modal>
    );
}

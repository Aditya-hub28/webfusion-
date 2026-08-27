import React, { useState } from 'react';
import { X, Package, Plus, CheckCircle2, DollarSign, Tag, Layers } from 'lucide-react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function CreateKitModal({ isOpen, onClose, resources, onAddKit }) {
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [dailyCharge, setDailyCharge] = useState(250);
    const [deposit, setDeposit] = useState(500);
    const [selectedItems, setSelectedItems] = useState([]);

    if (!isOpen) return null;

    const handleItemToggle = (title) => {
        if (selectedItems.includes(title)) {
            setSelectedItems(selectedItems.filter(i => i !== title));
        } else {
            setSelectedItems([...selectedItems, title]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItems.length < 2) {
            toast.error('Select at least 2 resources to bundle into an equipment kit!');
            return;
        }

        const newKit = {
            name,
            tagline: tagline || selectedItems.join(' + '),
            dailyCharge: Number(dailyCharge),
            deposit: Number(deposit),
            status: 'Available',
            itemsIncluded: selectedItems
        };

        onAddKit(newKit);
        toast.success(`Equipment Kit "${name}" created successfully!`);
        setName('');
        setTagline('');
        setSelectedItems([]);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                >
                    <X size={20} />
                </button>

                <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                        <Package size={16} /> Multi-Resource Studio
                    </span>
                    <h2 className="text-xl font-black text-slate-900">
                        Create Equipment Kit Bundle
                    </h2>
                    <p className="text-xs text-slate-500">
                        Bundle multiple campus resources together into a discounted kit for students.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Kit Name / Title</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Complete Reel Production Kit"
                            required
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold text-slate-900"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Tagline / Summary Description</label>
                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            placeholder="e.g. 4K Camera + Fluid Head Tripod + Dual Wireless Mics + LED Video Light"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-slate-900"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Bundle Rental Rate (₹/day)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                                <input
                                    type="number"
                                    value={dailyCharge}
                                    onChange={(e) => setDailyCharge(e.target.value)}
                                    required
                                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-extrabold text-slate-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Bundle Security Deposit (₹)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                                <input
                                    type="number"
                                    value={deposit}
                                    onChange={(e) => setDeposit(e.target.value)}
                                    required
                                    className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-extrabold text-slate-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Select Items to Include */}
                    <div className="space-y-2 pt-2">
                        <label className="font-bold text-slate-800 flex justify-between items-center">
                            <span>Select Items to Include in Kit (At least 2)</span>
                            <span className="text-emerald-600 font-extrabold">{selectedItems.length} Selected</span>
                        </label>

                        <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-2xl p-2 space-y-1.5 bg-slate-50">
                            {resources.map((r) => {
                                const isChecked = selectedItems.includes(r.title);
                                return (
                                    <label
                                        key={r.id}
                                        onClick={() => handleItemToggle(r.title)}
                                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                                            isChecked
                                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                                                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => {}}
                                                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                                            />
                                            <span className="text-xs font-semibold">{r.title}</span>
                                        </div>
                                        <span className="text-[11px] text-slate-500">₹{r.dailyCharge}/day</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <Button type="button" variant="secondary" onClick={onClose} className="text-xs">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold px-5">
                            <Plus size={16} className="mr-1" /> Publish Equipment Kit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

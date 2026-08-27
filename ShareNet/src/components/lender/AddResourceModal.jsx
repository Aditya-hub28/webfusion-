import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Package, PlusCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddResourceModal({ isOpen, onClose, onAddResource, onAddKit }) {
    const [activeTab, setActiveTab] = useState('single'); // 'single' | 'kit'
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Cameras');
    const [dailyCharge, setDailyCharge] = useState(150);
    const [deposit, setDeposit] = useState(400);
    const [condition, setCondition] = useState('Excellent');
    const [location, setLocation] = useState('Media Center Block B, Room 204');
    const [accessoriesStr, setAccessoriesStr] = useState('Carrying Pouch, Power Cable');

    // Kit fields
    const [kitName, setKitName] = useState('Complete Filmmaking Suite');
    const [kitTagline, setKitTagline] = useState('Camera + Tripod + Mics + Light');
    const [kitCharge, setKitCharge] = useState(280);
    const [kitDeposit, setKitDeposit] = useState(500);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'single') {
            onAddResource({
                title: title || 'Canon EOS DSLR Camera',
                category,
                dailyCharge: Number(dailyCharge),
                deposit: Number(deposit),
                condition,
                location,
                accessories: accessoriesStr.split(',').map(s => s.trim())
            });
            toast.success('New resource listing added successfully!');
        } else {
            onAddKit({
                name: kitName,
                tagline: kitTagline,
                dailyCharge: Number(kitCharge),
                deposit: Number(kitDeposit),
                itemsIncluded: ['Camera Body', 'Fluid Head Tripod', 'Wireless Mic Set', 'LED Video Light']
            });
            toast.success('New Equipment Kit Bundle created!');
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Resource Listing or Create Equipment Kit">
            <div className="space-y-5 text-xs text-slate-700">
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('single')}
                        className={`flex-1 py-2 font-bold rounded-lg transition-colors ${activeTab === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Single Resource Listing
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('kit')}
                        className={`flex-1 py-2 font-bold rounded-lg transition-colors ${activeTab === 'kit' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Create Equipment Kit (Save ₹80/day)
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === 'single' ? (
                        <>
                            <div>
                                <label className="block font-bold text-slate-700 uppercase mb-1">Resource Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Sony Alpha A7 III 4K Mirrorless Camera"
                                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                                    >
                                        <option value="Cameras">Cameras</option>
                                        <option value="Tripods">Tripods</option>
                                        <option value="Microphones">Microphones</option>
                                        <option value="Lighting">Lighting</option>
                                        <option value="Sports">Sports Equipment</option>
                                        <option value="Projectors">Projectors & Displays</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-700 uppercase mb-1">Physical Condition</label>
                                    <select
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                                    >
                                        <option value="Pristine">Pristine (Like New)</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 uppercase mb-1">Daily Borrowing Fee (₹/day)</label>
                                    <input
                                        type="number"
                                        value={dailyCharge}
                                        onChange={(e) => setDailyCharge(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-700 uppercase mb-1">Refundable Security Deposit (₹)</label>
                                    <input
                                        type="number"
                                        value={deposit}
                                        onChange={(e) => setDeposit(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 uppercase mb-1">Accessories Included (Comma Separated)</label>
                                <input
                                    type="text"
                                    value={accessoriesStr}
                                    onChange={(e) => setAccessoriesStr(e.target.value)}
                                    placeholder="2x Batteries, 128GB SD Card, Strap, Bag"
                                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block font-bold text-slate-700 uppercase mb-1">Kit Name</label>
                                <input
                                    type="text"
                                    value={kitName}
                                    onChange={(e) => setKitName(e.target.value)}
                                    placeholder="e.g. Complete Reel Production Kit"
                                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 uppercase mb-1">Kit Tagline & Items</label>
                                <input
                                    type="text"
                                    value={kitTagline}
                                    onChange={(e) => setKitTagline(e.target.value)}
                                    placeholder="Camera + Tripod + Mics + Light"
                                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-slate-700 uppercase mb-1">Bundle Daily Fee (₹/day)</label>
                                    <input
                                        type="number"
                                        value={kitCharge}
                                        onChange={(e) => setKitCharge(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-xl font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 uppercase mb-1">Bundle Deposit (₹)</label>
                                    <input
                                        type="number"
                                        value={kitDeposit}
                                        onChange={(e) => setKitDeposit(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-xl font-bold"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 font-bold">
                            Save & Publish Listing
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Package, PlusCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddResourceModal({ isOpen, onClose, onAddResource, onAddKit }) {
    const [activeTab, setActiveTab] = useState('single'); // 'single' | 'kit'
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [dailyCharge, setDailyCharge] = useState(150);
    const [deposit, setDeposit] = useState(400);
    const [condition, setCondition] = useState('Excellent');
    const [location, setLocation] = useState('Media Center Block B, Room 204');
    const [accessoriesStr, setAccessoriesStr] = useState('Carrying Pouch, Power Cable');
    const [imageUrl, setImageUrl] = useState('');

    // Kit fields
    const [kitName, setKitName] = useState('Complete Filmmaking Suite');
    const [kitTagline, setKitTagline] = useState('Camera + Tripod + Mics + Light');
    const [kitCharge, setKitCharge] = useState(280);
    const [kitDeposit, setKitDeposit] = useState(500);

    if (!isOpen) return null;

    const categoryImages = {
        'Electronics': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
        'Event & AV': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        'Sports': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
        'Academic': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        'Camping': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'single') {
            const selectedImg = imageUrl.trim() || categoryImages[category] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800';
            onAddResource({
                title: title || 'Canon EOS DSLR Camera',
                category,
                dailyCharge: Number(dailyCharge),
                deposit: Number(deposit),
                condition,
                location,
                accessories: accessoriesStr.split(',').map(s => s.trim()),
                images: [selectedImg, selectedImg, selectedImg, selectedImg, selectedImg]
            });
            toast.success('New resource listing added successfully!');
        } else {
            onAddKit({
                name: kitName,
                tagline: kitTagline,
                dailyCharge: Number(kitCharge),
                deposit: Number(kitDeposit),
                itemsIncluded: ['Camera Body', 'Fluid Head Tripod', 'Wireless Mic Set', 'LED Video Light'],
                images: [
                    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
                    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800'
                ]
            });
            toast.success('New Equipment Kit Bundle created!');
        }
        setTitle('');
        setImageUrl('');
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
                                        className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-bold"
                                    >
                                        <option value="Electronics">Electronics & Tech</option>
                                        <option value="Event & AV">Event & AV Equipment</option>
                                        <option value="Sports">Sports & Fitness</option>
                                        <option value="Academic">Academic Supplies</option>
                                        <option value="Camping">Camping & Outdoor</option>
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

                            <div>
                                <label className="block font-bold text-slate-700 uppercase mb-1">Product Photo URL (Optional)</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Paste Unsplash image link or leave blank for auto-image"
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

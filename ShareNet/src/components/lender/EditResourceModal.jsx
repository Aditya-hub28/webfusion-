import React, { useState, useEffect } from 'react';
import { X, Edit3, DollarSign, Shield, MapPin, Tag, FileText, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function EditResourceModal({ isOpen, onClose, resource, onSave }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [dailyCharge, setDailyCharge] = useState(100);
    const [deposit, setDeposit] = useState(300);
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('Pristine');
    const [status, setStatus] = useState('Available');
    const [accessoriesText, setAccessoriesText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (resource) {
            setTitle(resource.title || '');
            setCategory(resource.category || 'Electronics');
            setDailyCharge(resource.dailyCharge || 100);
            setDeposit(resource.deposit || 300);
            setLocation(resource.location || 'Campus Center Block B');
            setCondition(resource.condition || 'Pristine');
            setStatus(resource.status || 'Available');
            setAccessoriesText(Array.isArray(resource.accessories) ? resource.accessories.join(', ') : '');
            setImageUrl(resource.images && resource.images[0] ? resource.images[0] : '');
        }
    }, [resource]);

    if (!isOpen || !resource) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = {
            title,
            category,
            dailyCharge: Number(dailyCharge),
            deposit: Number(deposit),
            location,
            condition,
            status,
            accessories: accessoriesText.split(',').map(s => s.trim()).filter(Boolean),
            images: imageUrl.trim() ? [imageUrl.trim(), imageUrl.trim(), imageUrl.trim(), imageUrl.trim(), imageUrl.trim()] : resource.images
        };

        onSave(resource.id, updated);
        toast.success(`Updated listing for "${title}"!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
                >
                    <X size={20} />
                </button>

                <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                        <Edit3 size={16} /> Lender Edit Portal
                    </span>
                    <h2 className="text-xl font-black text-slate-900">
                        Edit Resource Listing
                    </h2>
                    <p className="text-xs text-slate-500">
                        Update daily price, deposit, category, pickup location, or availability status.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Resource Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-900"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-900"
                            >
                                <option value="Electronics">Electronics & Tech</option>
                                <option value="Event & AV">Event & AV Equipment</option>
                                <option value="Sports">Sports & Fitness</option>
                                <option value="Academic">Academic & Lab Tools</option>
                                <option value="Camping">Camping & Outdoor</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-900"
                            >
                                <option value="Available">🟢 Available</option>
                                <option value="Unavailable">🔴 Paused / Unavailable</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Daily Fee (₹/day)</label>
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
                            <label className="font-bold text-slate-700 block mb-1">Security Deposit (₹)</label>
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

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Pickup Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-900"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Accessories Included (comma separated)</label>
                        <input
                            type="text"
                            value={accessoriesText}
                            onChange={(e) => setAccessoriesText(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-slate-900"
                            placeholder="e.g. 2x Batteries, Carrying Bag, Charger"
                        />
                    </div>

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Product Photo URL (Optional)</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-slate-900"
                            placeholder="e.g. https://images.unsplash.com/photo-..."
                        />
                    </div>

                    <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <Button type="button" variant="secondary" onClick={onClose} className="text-xs">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold px-5">
                            <CheckCircle2 size={16} className="mr-1" /> Save Listing Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

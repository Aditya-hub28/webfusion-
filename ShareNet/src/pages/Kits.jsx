import React, { useState } from 'react';
import useKitStore from '../stores/kitStore';
import KitCard from '../components/kits/KitCard';
import QRCodeModal from '../components/ui/QRCodeModal';
import ReservationCalendar from '../components/lending/ReservationCalendar';
import Modal from '../components/ui/Modal';
import { Package, Sparkles } from 'lucide-react';

export default function Kits() {
    const { getFilteredKits, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useKitStore();
    const kits = getFilteredKits();

    const [selectedKitForQR, setSelectedKitForQR] = useState(null);
    const [selectedKitForReserve, setSelectedKitForReserve] = useState(null);

    const categories = ['All', 'Media Production', 'Engineering & Robotics', 'Audio & Music'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5 mb-1">
                        <Package size={16} /> Shelf Equipment Bundles
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Campus Equipment Kits
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Pre-assembled equipment suites for film projects, robotics competitions, and podcasting.
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search equipment kits..."
                    className="w-full sm:w-64 text-xs px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                />
            </div>

            {/* Kit Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kits.map((kit) => (
                    <KitCard
                        key={kit.id}
                        kit={kit}
                        onSelect={(k) => setSelectedKitForReserve(k)}
                        onShowQR={(k) => setSelectedKitForQR(k)}
                    />
                ))}
            </div>

            {/* QR Modal */}
            <QRCodeModal
                isOpen={!!selectedKitForQR}
                onClose={() => setSelectedKitForQR(null)}
                itemOrKit={selectedKitForQR}
            />

            {/* Reservation Modal */}
            <Modal
                isOpen={!!selectedKitForReserve}
                onClose={() => setSelectedKitForReserve(null)}
                title={`Reserve Equipment Kit • ${selectedKitForReserve?.name}`}
            >
                <ReservationCalendar
                    itemOrKit={selectedKitForReserve}
                    onConfirm={() => setTimeout(() => setSelectedKitForReserve(null), 1500)}
                />
            </Modal>
        </div>
    );
}

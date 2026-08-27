import React, { useState } from 'react';
import AISmartSearch from '../components/ui/AISmartSearch';
import QRCodeModal from '../components/ui/QRCodeModal';
import Modal from '../components/ui/Modal';
import ReservationCalendar from '../components/lending/ReservationCalendar';

export default function SmartSearchPage() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showQR, setShowQR] = useState(null);
    const [showReserve, setShowReserve] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <AISmartSearch
                onSelectResult={(item) => {
                    setSelectedItem(item);
                    setShowReserve(true);
                }}
            />

            {/* Selected item modal */}
            <Modal
                isOpen={showReserve}
                onClose={() => setShowReserve(false)}
                title={`Reserve Resource • ${selectedItem?.title || selectedItem?.name}`}
            >
                <ReservationCalendar
                    itemOrKit={selectedItem}
                    onConfirm={() => setTimeout(() => setShowReserve(false), 1500)}
                />
            </Modal>

            <QRCodeModal
                isOpen={!!showQR}
                onClose={() => setShowQR(null)}
                itemOrKit={showQR}
            />
        </div>
    );
}

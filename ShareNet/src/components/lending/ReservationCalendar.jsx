import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function ReservationCalendar({ itemOrKit, onConfirm }) {
    const [startDate, setStartDate] = useState('2026-08-28');
    const [endDate, setEndDate] = useState('2026-08-30');
    const [purpose, setPurpose] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!itemOrKit) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            if (onConfirm) {
                onConfirm({
                    itemOrKitName: itemOrKit.title || itemOrKit.name,
                    startDate,
                    endDate,
                    purpose: purpose || 'Academic Project Use',
                    assetTag: itemOrKit.assetTag || itemOrKit.id,
                    pickupLocation: itemOrKit.location ? `${itemOrKit.location.building}, ${itemOrKit.location.room}` : 'Main Resource Center'
                });
            }
        }, 1200);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-blue-600" />
                Leihs Equipment Reservation Calendar
            </h3>

            {success ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                    <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                    <h4 className="text-base font-bold text-emerald-900">Reservation Confirmed!</h4>
                    <p className="text-xs text-emerald-700">
                        Your equipment reservation for <strong>{startDate}</strong> to <strong>{endDate}</strong> has been logged to the Leihs lending queue.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Pickup Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                Return Date
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Borrowing Purpose / Project Context
                        </label>
                        <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            placeholder="e.g. Media Lab Documentary Shoot / CS Hackathon"
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-blue-900">
                            <Clock size={16} className="text-blue-600" />
                            <span>Max Borrow Duration: <strong>7 Days</strong></span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
                            Dates Available
                        </span>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2.5" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging Reservation...' : 'Confirm Leihs Reservation'}
                    </Button>
                </form>
            )}
        </div>
    );
}

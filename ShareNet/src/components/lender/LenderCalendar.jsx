import React, { useState } from 'react';
import { Calendar as CalendarIcon, Lock, CheckCircle2, Clock } from 'lucide-react';

export default function LenderCalendar({ resources }) {
    const [blockedDates, setBlockedDates] = useState(['2026-09-05', '2026-09-06']);

    const daysInMonth = Array.from({ length: 31 }, (_, i) => {
        const dayNum = i + 1;
        const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;

        let status = 'AVAILABLE';
        if (dateStr === '2026-08-27' || dateStr === '2026-08-28' || dateStr === '2026-08-29') {
            status = 'BORROWED';
        } else if (dateStr === '2026-08-30' || dateStr === '2026-08-31') {
            status = 'BOOKED';
        } else if (blockedDates.includes(dateStr)) {
            status = 'UNAVAILABLE';
        }

        return { dayNum, dateStr, status };
    });

    const toggleBlockDate = (dateStr) => {
        if (blockedDates.includes(dateStr)) {
            setBlockedDates(blockedDates.filter(d => d !== dateStr));
        } else {
            setBlockedDates([...blockedDates, dateStr]);
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                    <CalendarIcon size={18} /> Resource Availability & Booking Calendar (August 2026)
                </div>
                <span className="text-xs text-slate-500 font-medium">Click any available date to block / unblock</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span> AVAILABLE</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-600"></span> BORROWED (Sony Camera)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-400"></span> BOOKED</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-300"></span> BLOCKED / UNAVAILABLE</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="font-bold text-slate-400 text-[10px] uppercase">{d}</div>
                ))}

                {daysInMonth.map((d) => (
                    <button
                        key={d.dateStr}
                        onClick={() => d.status !== 'BORROWED' && d.status !== 'BOOKED' && toggleBlockDate(d.dateStr)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                            d.status === 'BORROWED' ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' :
                            d.status === 'BOOKED' ? 'bg-blue-500 text-white border-blue-600' :
                            d.status === 'UNAVAILABLE' ? 'bg-slate-200 text-slate-500 border-slate-300' :
                            'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        }`}
                    >
                        <span>{d.dayNum}</span>
                        <span className="block text-[9px] font-semibold mt-0.5 opacity-80">{d.status}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

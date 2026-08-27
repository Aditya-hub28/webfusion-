import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ dueTimestamp }) {
    const target = dueTimestamp || (Date.now() + 18 * 3600 * 1000 + 24 * 60 * 1000);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

    function getTimeLeft(endTime) {
        const diff = Math.max(0, endTime - Date.now());
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return { hours, minutes, seconds, isOverdue: diff <= 0 };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(target));
        }, 1000);
        return () => clearInterval(interval);
    }, [target]);

    if (timeLeft.isOverdue) {
        return (
            <div className="bg-amber-950 text-amber-300 font-mono text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-amber-800">
                <Clock size={14} className="animate-pulse" /> ⚠️ RETURN OVERDUE (Late fee applies)
            </div>
        );
    }

    return (
        <div className="bg-slate-950 text-emerald-400 font-mono text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm border border-slate-800">
            <Clock size={14} className="animate-pulse" /> RETURN DUE IN {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    );
}

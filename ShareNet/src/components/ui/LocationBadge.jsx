import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationBadge({ location }) {
    if (!location) return null;

    return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs font-medium">
            <MapPin size={13} className="text-blue-600 shrink-0" />
            <span>
                <strong className="font-semibold text-slate-900">{location.building}</strong> • {location.room} ({location.cabinet})
            </span>
        </div>
    );
}

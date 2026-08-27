import React from 'react';
import { Package, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';
import LocationBadge from '../ui/LocationBadge';
import Button from '../ui/Button';

export default function KitCard({ kit, onSelect, onShowQR }) {
    if (!kit) return null;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
            <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {kit.category}
                </div>
                <button
                    onClick={() => onShowQR(kit)}
                    title="View Kit QR Code"
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-slate-800 rounded-lg hover:bg-white transition-all shadow-sm"
                >
                    <QrCode size={16} />
                </button>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                        <Package size={14} /> {kit.totalItemsCount} Bundled Equipment Items
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {kit.status}
                    </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {kit.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{kit.tagline}</p>

                <div className="mt-4 pt-3 border-t border-slate-100">
                    <LocationBadge location={kit.location} />
                </div>

                <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Kit Contents:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                        {kit.itemsIncluded.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                <span className="truncate">{item}</span>
                            </li>
                        ))}
                        {kit.itemsIncluded.length > 3 && (
                            <li className="text-[11px] text-slate-500 font-medium pl-3">
                                +{kit.itemsIncluded.length - 3} more items in bundle
                            </li>
                        )}
                    </ul>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                        <ShieldCheck size={14} className="text-blue-600" />
                        <span>Req. Trust: <strong className="text-slate-900">{kit.trustRequirement}+</strong></span>
                    </div>
                    <Button onClick={() => onSelect(kit)} className="bg-blue-600 hover:bg-blue-700 text-xs px-3.5 py-2">
                        Reserve Kit <ArrowRight size={14} className="ml-1 inline" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

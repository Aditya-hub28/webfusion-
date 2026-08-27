import React from 'react';

export default function ConditionCheckTable({ conditionBefore, conditionAfter, damageReported }) {
    const after = conditionAfter || { body: 'Excellent', screen: 'Excellent', lens: 'Excellent', accessories: 'Complete' };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Condition Inspection Comparison</span>
                {damageReported ? (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">Minor Scratch Reported</span>
                ) : (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">✓ No Damage Detected</span>
                )}
            </div>

            <table className="w-full text-left text-xs">
                <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                        <th className="p-3">Component</th>
                        <th className="p-3">Before Handover</th>
                        <th className="p-3">After Return</th>
                        <th className="p-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr>
                        <td className="p-3 font-semibold text-slate-900">Body & Frame</td>
                        <td className="p-3">{conditionBefore?.body || 'Excellent'}</td>
                        <td className="p-3">{after.body}</td>
                        <td className="p-3 text-emerald-600 font-bold">Matched</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-slate-900">Screen / Optics</td>
                        <td className="p-3">{conditionBefore?.screen || 'Excellent'}</td>
                        <td className="p-3">{after.screen}</td>
                        <td className="p-3 text-emerald-600 font-bold">Matched</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-slate-900">Lens & Sensor</td>
                        <td className="p-3">{conditionBefore?.lens || 'Excellent'}</td>
                        <td className="p-3">{after.lens}</td>
                        <td className="p-3 text-emerald-600 font-bold">Matched</td>
                    </tr>
                    <tr>
                        <td className="p-3 font-semibold text-slate-900">Accessories Pack</td>
                        <td className="p-3">{conditionBefore?.accessories || 'Complete'}</td>
                        <td className="p-3">{after.accessories}</td>
                        <td className="p-3 text-emerald-600 font-bold">Matched</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

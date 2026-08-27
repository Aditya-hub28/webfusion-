import React from 'react';
import { ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function AdminAuditLog({ auditLogs }) {
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-600" /> Admin Operational Activity & Audit Log
            </h3>

            <div className="space-y-3">
                {auditLogs.map((log) => (
                    <div key={log.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                            <span className="font-bold text-slate-900 block">{log.action} • <span className="text-indigo-600">{log.target}</span></span>
                            <span className="text-slate-500 text-[11px]">Result: {log.result}</span>
                        </div>
                        <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
                            <Clock size={13} /> {log.timestamp}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

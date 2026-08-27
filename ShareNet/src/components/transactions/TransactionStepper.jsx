import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function TransactionStepper({ currentStage }) {
    const steps = [
        { label: 'Available', key: 'Available' },
        { label: 'Requested', key: 'Requested' },
        { label: 'Accepted', key: 'Accepted' },
        { label: 'Handover', key: 'Handover' },
        { label: 'Borrowed', key: 'Borrowed' },
        { label: 'Return Due', key: 'Return Due' },
        { label: 'Returned', key: 'Returned' },
        { label: 'Inspection', key: 'Inspection' },
        { label: 'Settled', key: 'Settled' },
        { label: 'Rated', key: 'Rated' }
    ];

    const getStageIndex = (stageStr) => {
        if (!stageStr) return 1;
        if (stageStr.includes('Requested')) return 1;
        if (stageStr.includes('Accepted')) return 2;
        if (stageStr.includes('Handover')) return 3;
        if (stageStr.includes('Active') || stageStr.includes('Borrowed')) return 4;
        if (stageStr.includes('Return Due')) return 5;
        if (stageStr.includes('Returned')) return 6;
        if (stageStr.includes('Inspection')) return 7;
        if (stageStr.includes('Settled')) return 8;
        if (stageStr.includes('Rated') || stageStr.includes('Completed')) return 9;
        return 1;
    };

    const activeIndex = getStageIndex(currentStage);

    return (
        <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <span>10-Step Transaction Lifecycle Progress</span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
                    Current Stage: {currentStage}
                </span>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-10 gap-1 text-center">
                {steps.map((step, idx) => {
                    const isCompleted = idx < activeIndex;
                    const isCurrent = idx === activeIndex;
                    return (
                        <div key={step.key} className="space-y-1">
                            <div
                                className={`h-2 rounded-full transition-all ${
                                    isCurrent ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' :
                                    isCompleted ? 'bg-emerald-600' : 'bg-slate-200'
                                }`}
                            ></div>
                            <span className={`block text-[9px] font-bold truncate ${
                                isCurrent ? 'text-emerald-700 font-extrabold' :
                                isCompleted ? 'text-slate-700 font-semibold' : 'text-slate-400'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

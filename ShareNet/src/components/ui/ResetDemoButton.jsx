import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useCircularStore } from '../../stores/circularStore';
import toast from 'react-hot-toast';

export default function ResetDemoButton() {
    const { resetDemoState } = useCircularStore();

    const handleReset = () => {
        resetDemoState();
        toast.success('Demo State Reset to Clean Initial Data! 🔄');
    };

    return (
        <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-slate-200 hover:bg-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-700 shadow-sm"
            title="Reset demo data to initial clean state"
        >
            <RefreshCw size={14} className="text-emerald-400" />
            <span>Reset Demo Data</span>
        </button>
    );
}

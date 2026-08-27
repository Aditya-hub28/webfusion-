import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { MATCH_FORMULA_METADATA } from '../../services/matchingService';
import { Sparkles, HelpCircle } from 'lucide-react';

export default function ScoreExplanationModal({ isOpen, onClose, matchData }) {
    if (!isOpen) return null;

    const factors = matchData?.factors || {
        availability: 100,
        suitability: 98,
        distance: 92,
        trust: 94,
        condition: 96,
        price: 90,
        deposit: 85
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="How is the 96% Match Score Calculated?">
            <div className="space-y-5">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
                    <Sparkles size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-bold block">Calculated, Not Random</span>
                        <span>Our 7-factor algorithm evaluates real-time campus data to ensure safety, proximity, and suitability.</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {MATCH_FORMULA_METADATA.map((meta) => {
                        const scoreKey = meta.factor === 'Trust Score' ? 'trust' :
                                         meta.factor === 'Daily Price' ? 'price' :
                                         meta.factor.toLowerCase();
                        const factorScore = factors[scoreKey] || 90;

                        return (
                            <div key={meta.factor} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1 text-xs">
                                <div className="flex justify-between items-center font-bold text-slate-900">
                                    <span>{meta.factor} ({meta.weight}% Weight)</span>
                                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{factorScore}% Factor Score</span>
                                </div>
                                <p className="text-[11px] text-slate-500">{meta.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-2 flex justify-end">
                    <Button variant="secondary" onClick={onClose}>
                        Close Explanation
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

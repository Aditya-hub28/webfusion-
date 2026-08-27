import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { parseUserRequirement } from '../services/aiService';
import { calculateMatchScore } from '../services/matchingService';
import { useCircularStore } from '../stores/circularStore';
import ScoreExplanationModal from '../components/ui/ScoreExplanationModal';
import ProductImageGallery from '../components/ui/ProductImageGallery';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { Sparkles, CheckCircle2, ShieldCheck, MapPin, ArrowRight, Layers, HelpCircle, Package, Mic, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AIMatchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const initialQuery = searchParams.get('prompt') || 'I need to shoot a club reel tomorrow under ₹300';
    
    const [inputPrompt, setInputPrompt] = useState(initialQuery);
    const { resources, createBorrowRequest } = useCircularStore();

    const [parsed, setParsed] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [explanationOpen, setExplanationOpen] = useState(false);

    useEffect(() => {
        const query = searchParams.get('prompt') || inputPrompt;
        const result = parseUserRequirement(query);
        setParsed(result);
        setInputPrompt(query);
    }, [searchParams]);

    const handleExecuteSearch = (queryText) => {
        const targetPrompt = queryText || inputPrompt;
        setSearchParams({ prompt: targetPrompt });
        const result = parseUserRequirement(targetPrompt);
        setParsed(result);
        toast.success(`AI Processed: "${targetPrompt}"`);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleExecuteSearch(inputPrompt);
    };

    const handlePresetClick = (preset) => {
        setInputPrompt(preset);
        handleExecuteSearch(preset);
    };

    const handleMicClick = () => {
        const voicePrompt = 'I need to shoot a club reel tomorrow under ₹300';
        setInputPrompt(voicePrompt);
        handleExecuteSearch(voicePrompt);
        toast.success('Voice input captured!');
    };

    if (!parsed) return null;

    const matchedResources = resources.map((r) => ({
        ...r,
        matchData: calculateMatchScore(r, parsed)
    })).sort((a, b) => b.matchData.matchPercentage - a.matchData.matchPercentage);

    const primaryMatch = matchedResources[0];
    const alternatives = matchedResources.slice(1, 4);

    const handleSendRequest = () => {
        if (!selectedResource) return;
        createBorrowRequest({
            resourceId: selectedResource.id || 'kit-bundle',
            title: selectedResource.title || selectedResource.name,
            image: selectedResource.images ? selectedResource.images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
            ownerName: selectedResource.owner ? selectedResource.owner.name : 'Priya Patel',
            ownerAvatar: selectedResource.owner ? selectedResource.owner.avatar : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            startDate: '2026-08-28',
            endDate: '2026-08-30',
            dailyCharge: selectedResource.dailyCharge,
            platformFee: selectedResource.platformFee || 20,
            deposit: selectedResource.deposit
        });
        setRequestSent(true);
        toast.success('Borrow request sent to owner!');
        setTimeout(() => {
            setRequestSent(false);
            setRequestModalOpen(false);
            navigate('/my-borrowings');
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Top Interactive AI Search Container */}
            <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        <Sparkles size={16} /> AI Need-Based Discovery Engine
                    </div>
                    <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                        Smart Entity Extraction: Active
                    </span>
                </div>

                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Tell us what you need...
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1">
                        Type any natural language prompt (e.g. video shoots, presentations, podcasting, sports) to get instant AI-matched equipment bundles.
                    </p>
                </div>

                {/* AI Search Bar Input */}
                <form onSubmit={handleFormSubmit} className="max-w-4xl">
                    <div className="bg-slate-900/90 backdrop-blur-xl p-2.5 rounded-2xl border-2 border-emerald-500/80 shadow-2xl flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex items-center px-3 gap-3">
                            <Sparkles className="text-emerald-400 shrink-0" size={20} />
                            <input
                                type="text"
                                value={inputPrompt}
                                onChange={(e) => setInputPrompt(e.target.value)}
                                placeholder="e.g. 'I need to shoot a club reel tomorrow under ₹300'"
                                className="w-full bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none py-2 font-medium"
                            />
                            <button
                                type="button"
                                onClick={handleMicClick}
                                className="text-slate-400 hover:text-emerald-400 p-1.5 transition-colors"
                                title="Click for voice search"
                            >
                                <Mic size={18} />
                            </button>
                        </div>
                        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg shrink-0 flex items-center justify-center gap-2">
                            <Search size={15} /> Search & Match
                        </Button>
                    </div>
                </form>

                {/* Preset Intent Prompt Suggestion Pills */}
                <div className="flex flex-wrap gap-2 text-xs pt-1">
                    <span className="text-slate-400 font-bold self-center mr-1">Quick Search Prompts:</span>
                    <button
                        onClick={() => handlePresetClick('I need to shoot a club reel tomorrow under ₹300')}
                        className="bg-slate-800/90 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                    >
                        🎬 "Shoot a club reel under ₹300"
                    </button>
                    <button
                        onClick={() => handlePresetClick('I need a podcast microphone setup')}
                        className="bg-slate-800/90 hover:bg-slate-700 text-teal-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                    >
                        🎙️ "Podcast recording setup"
                    </button>
                    <button
                        onClick={() => handlePresetClick('I need a projector for a presentation tomorrow')}
                        className="bg-slate-800/90 hover:bg-slate-700 text-indigo-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                    >
                        📊 "Projector for presentation"
                    </button>
                    <button
                        onClick={() => handlePresetClick('I need a cricket bat kit for a weekend match')}
                        className="bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                    >
                        🏏 "Cricket bat kit for match"
                    </button>
                    <button
                        onClick={() => handlePresetClick('I need camping tent equipment for outdoor trekking')}
                        className="bg-slate-800/90 hover:bg-slate-700 text-purple-300 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
                    >
                        ⛺ "Camping tent & trekking"
                    </button>
                </div>

                {/* AI Extracted Entity Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Extracted Purpose</span>
                        <div className="text-xs font-bold text-white mt-0.5">{parsed.purpose}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Target Budget</span>
                        <div className="text-xs font-bold text-emerald-400 mt-0.5">{parsed.estimatedBudget}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Required Date</span>
                        <div className="text-xs font-bold text-white mt-0.5">{parsed.date}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Required Equipment</span>
                        <div className="text-xs font-bold text-indigo-300 mt-0.5">{parsed.requiredResources.length} Items</div>
                    </div>
                </div>
            </div>

            {/* Complete Equipment Kit Bundle Recommendation */}
            {parsed.bundleKit && (
                <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-500/80 relative space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 flex items-center gap-1.5">
                            <Package size={14} /> Multi-Resource Solution • 🎬 {parsed.bundleKit.name}
                        </span>
                        <button
                            onClick={() => setExplanationOpen(true)}
                            className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1 underline underline-offset-4"
                        >
                            <HelpCircle size={14} /> How is 96% Match calculated?
                        </button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-black text-white">{parsed.bundleKit.name}</h2>
                        <p className="text-xs text-slate-300 mt-1">{parsed.bundleKit.tagline}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                        {parsed.bundleKit.itemsIncluded.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                                <span className="truncate">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
                        <div>
                            <span className="text-xs text-slate-400 font-medium">Complete Kit Daily Rate</span>
                            <div className="text-2xl font-black text-emerald-400">
                                ₹{parsed.bundleKit.dailyCharge}/day <span className="text-xs font-normal text-slate-400">+ ₹{parsed.bundleKit.deposit} refundable deposit (Saves ₹80/day)</span>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button
                                onClick={() => {
                                    setSelectedResource(parsed.bundleKit);
                                    setRequestModalOpen(true);
                                }}
                                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg"
                            >
                                Borrow Complete Kit (₹{parsed.bundleKit.dailyCharge}/day)
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Individual Matches & Explainable Breakdown */}
            <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Individual Matching Resources</h3>
                    <button onClick={() => setExplanationOpen(true)} className="text-xs font-bold text-emerald-600 hover:underline">
                        View 7-Factor Score Formula →
                    </button>
                </div>

                {primaryMatch && (
                    <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-md space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                                Individual Match • {primaryMatch.matchData.matchPercentage}% Match
                            </span>
                            <button onClick={() => setExplanationOpen(true)} className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1">
                                <HelpCircle size={14} /> Explain Score
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 5-Image Gallery */}
                            <ProductImageGallery images={primaryMatch.images} title={primaryMatch.title} />

                            {/* Info */}
                            <div className="space-y-3 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900">{primaryMatch.title}</h4>
                                    <div className="text-xs text-slate-500 space-y-1 mt-2">
                                        <div>Category: <strong>{primaryMatch.category}</strong></div>
                                        <div>Location: <strong>{primaryMatch.distanceKm} km away</strong> ({primaryMatch.location})</div>
                                        <div>Owner: <strong>{primaryMatch.owner.name}</strong> (Trust {primaryMatch.owner.trustScore}/100)</div>
                                        <div>Condition: <strong>{primaryMatch.condition}</strong></div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <div>
                                        <span className="text-2xl font-black text-slate-900">₹{primaryMatch.dailyCharge}/day</span>
                                        <span className="block text-[10px] text-slate-400">+ ₹{primaryMatch.deposit} deposit</span>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setSelectedResource(primaryMatch);
                                            setRequestModalOpen(true);
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-xs px-6 py-3 font-bold"
                                    >
                                        Borrow Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Smart Alternatives */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Layers size={18} className="text-emerald-600" /> Better Smart Alternatives
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {alternatives.map((res) => (
                        <div key={res.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600">{res.category}</span>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                    {res.matchData.matchPercentage}% Match
                                </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{res.title}</h4>
                            <div className="text-xs text-slate-500 space-y-1">
                                <div>Distance: <strong>{res.distanceKm} km away</strong></div>
                                <div>Owner Trust: <strong>{res.owner.trustScore}/100</strong></div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-900">₹{res.dailyCharge}/day</span>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        setSelectedResource(res);
                                        setRequestModalOpen(true);
                                    }}
                                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-1.5"
                                >
                                    Select
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <ScoreExplanationModal
                isOpen={explanationOpen}
                onClose={() => setExplanationOpen(false)}
                matchData={primaryMatch?.matchData}
            />

            <Modal
                isOpen={requestModalOpen}
                onClose={() => setRequestModalOpen(false)}
                title={`Multi-Step Borrow Request • ${selectedResource?.title || selectedResource?.name}`}
            >
                {requestSent ? (
                    <div className="py-8 text-center space-y-3">
                        <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                        <h3 className="text-lg font-bold text-slate-900">Request Sent to Owner!</h3>
                        <p className="text-xs text-slate-600">Priya Patel has been notified. Redirecting to My Borrowings...</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                            <div className="flex justify-between font-semibold"><span>Borrowing Fee (2 Days):</span><span>₹{(selectedResource?.dailyCharge || 200) * 2}</span></div>
                            <div className="flex justify-between font-semibold"><span>Platform Service Fee:</span><span>₹{selectedResource?.platformFee || 20}</span></div>
                            <div className="flex justify-between text-slate-500"><span>Refundable Security Deposit:</span><span>₹{selectedResource?.deposit || 500}</span></div>
                            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                                <span>Total upfront payment:</span>
                                <span>₹{(selectedResource?.dailyCharge || 200) * 2 + (selectedResource?.platformFee || 20) + (selectedResource?.deposit || 500)}</span>
                            </div>
                            <p className="text-[11px] text-emerald-700 font-bold text-center mt-1">₹{selectedResource?.deposit || 500} refundable after successful return.</p>
                        </div>

                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                            I agree to return before due time and maintain item condition.
                        </label>

                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" onClick={() => setRequestModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleSendRequest} className="bg-emerald-600 hover:bg-emerald-700">
                                Send Borrow Request
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

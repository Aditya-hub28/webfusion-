import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Calendar, Tag } from 'lucide-react';
import { mockItems, mockKits } from '../../lib/mockData';
import Button from './Button';

export default function AISmartSearch({ onSelectResult }) {
    const [prompt, setPrompt] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const examplePrompts = [
        'I need a 4K camera for a 2-day short film shoot near Media Center',
        'Robotics prototyping kit with Raspberry Pi for hackathon near Innovation Hub',
        'Dual wireless microphone system for podcast recording'
    ];

    const handleSearch = (queryText) => {
        const textToUse = queryText || prompt;
        if (!textToUse.trim()) return;

        setIsAnalyzing(true);
        setResults(null);

        setTimeout(() => {
            const queryLower = textToUse.toLowerCase();

            // Extracted requirements engine simulation
            const extractedCategory = queryLower.includes('camera') || queryLower.includes('film') ? 'Photography & Video' :
                                      queryLower.includes('robot') || queryLower.includes('pi') || queryLower.includes('arduino') ? 'Robotics & Microcontrollers' :
                                      queryLower.includes('mic') || queryLower.includes('audio') || queryLower.includes('podcast') ? 'Audio Equipment' : 'General Equipment';

            const extractedDuration = queryLower.includes('2-day') || queryLower.includes('2 day') ? '2 Days' :
                                       queryLower.includes('3-day') ? '3 Days' : 'Standard 1-3 Days';

            const extractedLocation = queryLower.includes('media') ? 'Media Center Block B' :
                                       queryLower.includes('innovation') || queryLower.includes('hub') ? 'Innovation Hub' : 'Campus Locker';

            // Match calculation score engine
            const matchedItems = mockItems.map(item => {
                let score = 50;
                if (item.category === 'Electronics') score += 20;
                if (item.title.toLowerCase().includes('camera') && queryLower.includes('camera')) score += 25;
                if (item.title.toLowerCase().includes('robotics') && queryLower.includes('robot')) score += 25;
                if (item.title.toLowerCase().includes('mic') && queryLower.includes('mic')) score += 25;
                if (item.owner.trustScore > 4.7) score += 5;

                return {
                    ...item,
                    matchType: 'Individual Item',
                    matchScore: Math.min(score, 98),
                    breakdown: {
                        categoryMatch: '+30%',
                        trustScore: `+${Math.round(item.owner.trustScore * 5)}%`,
                        proximity: '+20%',
                        datesAvailable: '+15%'
                    }
                };
            });

            const matchedKits = mockKits.map(kit => {
                let score = 60;
                if (kit.name.toLowerCase().includes('film') && queryLower.includes('film')) score += 32;
                if (kit.name.toLowerCase().includes('robotics') && queryLower.includes('robot')) score += 32;
                if (kit.name.toLowerCase().includes('podcast') && queryLower.includes('podcast')) score += 32;

                return {
                    ...kit,
                    title: kit.name,
                    matchType: 'Equipment Kit (Shelf Bundle)',
                    matchScore: Math.min(score, 96),
                    breakdown: {
                        bundleMatch: '+35%',
                        allInOneKit: '+25%',
                        locationMatch: '+20%',
                        highTrustRating: '+16%'
                    }
                };
            });

            const combined = [...matchedKits, ...matchedItems].sort((a, b) => b.matchScore - a.matchScore);

            setIsAnalyzing(false);
            setResults({
                query: textToUse,
                extracted: {
                    category: extractedCategory,
                    duration: extractedDuration,
                    location: extractedLocation
                },
                matches: combined.slice(0, 3)
            });
        }, 1200);
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles size={16} /> AI Multi-Resource Requirement Extraction
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Natural Language Smart Matching Engine
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Type what you need in plain English (e.g. equipment specifications, event purpose, location preference), and our AI engine will extract requirements and match across items, kits, and member trust scores.
            </p>

            <div className="mt-6">
                <div className="relative">
                    <textarea
                        rows={2}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. I need a DSLR camera with 4K recording for a 2-day shoot near Central Library..."
                        className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-2xl p-4 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
                    ></textarea>
                    <button
                        onClick={() => handleSearch()}
                        disabled={isAnalyzing || !prompt.trim()}
                        className="absolute right-3 bottom-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
                    >
                        {isAnalyzing ? 'Extracting...' : 'Smart Match'}
                        <ArrowRight size={14} />
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase">Try example:</span>
                    {examplePrompts.map((ex, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setPrompt(ex);
                                handleSearch(ex);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-indigo-200 px-3 py-1 rounded-lg border border-slate-700/60 text-[11px] transition-colors truncate max-w-xs"
                        >
                            "{ex.slice(0, 36)}..."
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Display */}
            {isAnalyzing && (
                <div className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center space-y-3">
                    <div className="inline-block w-8 h-8 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-indigo-300 font-medium">
                        Analyzing prompt semantics → Extracting Category, Duration & Proximity → Calculating Explainable Match Scores...
                    </p>
                </div>
            )}

            {results && !isAnalyzing && (
                <div className="mt-8 space-y-6 animate-in fade-in duration-300">
                    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-slate-400 font-semibold uppercase text-[11px]">Extracted Entities:</span>
                            <span className="bg-indigo-900/60 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-700/50 flex items-center gap-1">
                                <Tag size={12} /> {results.extracted.category}
                            </span>
                            <span className="bg-indigo-900/60 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-700/50 flex items-center gap-1">
                                <Calendar size={12} /> {results.extracted.duration}
                            </span>
                            <span className="bg-indigo-900/60 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-700/50 flex items-center gap-1">
                                <MapPin size={12} /> {results.extracted.location}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {results.matches.map((match) => (
                            <div
                                key={match.id}
                                className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500 transition-all shadow-lg"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                                            {match.matchType}
                                        </span>
                                        <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1">
                                            <CheckCircle2 size={12} /> {match.matchScore}% Match
                                        </span>
                                    </div>

                                    <h4 className="text-sm font-bold text-white line-clamp-1">{match.title}</h4>
                                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{match.description || match.tagline}</p>

                                    <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
                                            Explainable Match Breakdown:
                                        </span>
                                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                                            {Object.entries(match.breakdown).map(([k, v]) => (
                                                <div key={k} className="flex justify-between">
                                                    <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                                                    <span className="font-semibold text-indigo-300">{v}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => onSelectResult && onSelectResult(match)}
                                    className="w-full mt-5 bg-indigo-600 hover:bg-indigo-500 text-xs py-2"
                                >
                                    Select & View Details
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

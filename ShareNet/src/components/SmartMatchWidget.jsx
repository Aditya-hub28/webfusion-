import { useState } from 'react';
import mockDb from '../lib/mockDb';
import { Card, Button, Badge } from './ui';
import { Brain, MapPin, Calendar, Layers, Search, ChevronDown, ChevronUp, AlertCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmartMatchWidget() {
    const [query, setQuery] = useState('');
    const [extraction, setExtraction] = useState(null);
    const [matches, setMatches] = useState([]);
    const [expandedMatchId, setExpandedMatchId] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        const result = mockDb.smartMatch(query);
        setExtraction(result.extraction);
        setMatches(result.matches);
        setHasSearched(true);
        setExpandedMatchId(null);
    };

    const loadExample = (ex) => {
        setQuery(ex);
    };

    return (
        <Card className="p-6 border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 shadow-md rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Brain size={20} />
                </div>
                <div>
                    <h3 className="font-extrabold text-lg text-gray-900">🧠 Cognitive Smart Match Engine</h3>
                    <p className="text-xs text-gray-500">Natural Language → Extraction → Multi-resource Matching → Explainable Score</p>
                </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Try: 'I need a DSLR camera for a photoshoot this weekend at the Library'"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                        />
                        <Search className="absolute right-3 top-3.5 text-gray-400" size={18} />
                    </div>
                    <Button type="submit" className="rounded-xl px-6 bg-blue-600 hover:bg-blue-700">
                        Smart Search
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 items-center text-xs">
                    <span className="text-gray-400 font-medium">Examples:</span>
                    <button
                        type="button"
                        onClick={() => loadExample("Scientific calculator Casio for exam tomorrow")}
                        className="bg-white hover:bg-gray-100 border text-gray-600 px-3 py-1 rounded-full transition-colors"
                    >
                        Calculator casio
                    </button>
                    <button
                        type="button"
                        onClick={() => loadExample("Need VR Quest headset at engineering Innovation Hub for long term research")}
                        className="bg-white hover:bg-gray-100 border text-gray-600 px-3 py-1 rounded-full transition-colors"
                    >
                        VR Quest headset
                    </button>
                    <button
                        type="button"
                        onClick={() => loadExample("camera DSLR at Main Library for weekend")}
                        className="bg-white hover:bg-gray-100 border text-gray-600 px-3 py-1 rounded-full transition-colors"
                    >
                        DSLR at library
                    </button>
                </div>
            </form>

            {hasSearched && extraction && (
                <div className="mt-6 space-y-6 pt-6 border-t border-gray-100">
                    {/* Requirement Extraction Layer */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers size={14} className="text-gray-500" />
                            Step 1: NLP Requirement Extraction
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 block font-medium">Extracted Resource</span>
                                <span className="font-semibold text-gray-800">{extraction.resource || "Not specified"}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 block font-medium">Target Location</span>
                                <span className="font-semibold text-gray-800 flex items-center gap-1">
                                    <MapPin size={14} className="text-gray-400" />
                                    {extraction.location || "Any Campus"}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 block font-medium">Duration Window</span>
                                <span className="font-semibold text-gray-800 flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    {extraction.duration || "Standard"}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-gray-400 block font-medium">Fulfillment Preference</span>
                                <span className="font-semibold text-gray-800">{extraction.mode || "Any Mode"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Matching Results Layer */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Award size={14} className="text-gray-500" />
                            Step 2: Multi-Resource Smart Matching Results
                        </h4>

                        {matches.length === 0 ? (
                            <div className="text-center py-6 bg-white border border-dashed rounded-xl text-gray-500 text-sm">
                                No direct match found. Try adjusting keywords (e.g. adding location 'library' or item 'camera').
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {matches.map((match, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl border border-gray-150 hover:border-blue-300 transition-all p-4 shadow-sm space-y-3"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex gap-3">
                                                <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0 border">
                                                    <img src={match.image} alt={match.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <Badge variant="primary" className="text-[10px] bg-blue-50 text-blue-700 font-bold border-blue-100 uppercase">
                                                            {match.type}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                                            <MapPin size={12} />
                                                            {match.location.split(',')[0]}
                                                        </span>
                                                    </div>
                                                    <h5 className="font-bold text-gray-900 text-sm mt-1">{match.title}</h5>
                                                </div>
                                            </div>

                                            {/* Score Dial */}
                                            <div className="flex flex-col items-center">
                                                <div className="relative w-12 h-12 flex items-center justify-center">
                                                    {/* Circular Ring */}
                                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                        <path
                                                            className="text-gray-100"
                                                            strokeWidth="3.5"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path
                                                            className="text-blue-600"
                                                            strokeDasharray={`${match.score}, 100`}
                                                            strokeWidth="3.5"
                                                            strokeLinecap="round"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                    </svg>
                                                    <span className="absolute text-xs font-extrabold text-blue-700">{match.score}%</span>
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">Match</span>
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-500 line-clamp-2">{match.description}</p>

                                        {/* Action panel & explanation */}
                                        <div className="flex justify-between items-center pt-2 border-t text-xs">
                                            <button
                                                type="button"
                                                onClick={() => setExpandedMatchId(expandedMatchId === match.sourceId ? null : match.sourceId)}
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
                                            >
                                                {expandedMatchId === match.sourceId ? (
                                                    <>Hide Score Explanation <ChevronUp size={14} /></>
                                                ) : (
                                                    <>Explainable Match Score <ChevronDown size={14} /></>
                                                )}
                                            </button>

                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-md border text-[11px]">{match.price}</span>
                                                <Link to={match.detailsUrl}>
                                                    <Button size="xs" className="bg-blue-600 text-white rounded-md text-[11px] px-3 py-1 font-semibold">
                                                        Select Offer
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Expended Explanation Panel */}
                                        {expandedMatchId === match.sourceId && (
                                            <div className="bg-gray-50 border rounded-lg p-4 space-y-2 mt-2">
                                                <h6 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Score Calculation Breakdown</h6>
                                                <div className="space-y-1.5 text-xs">
                                                    {match.breakdown.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-gray-700">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className={`w-1.5 h-1.5 rounded-full ${item.matched ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                                <span>{item.criteria}</span>
                                                            </div>
                                                            <span className={`font-semibold ${item.points > 0 ? 'text-green-600' : (item.points < 0 ? 'text-red-500' : 'text-gray-400')}`}>
                                                                {item.points > 0 ? `+${item.points}` : item.points} pts
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="text-[10px] text-gray-400 border-t pt-2 mt-2 leading-relaxed">
                                                    Calculated dynamically from live inventory state (available in Shelf and leihs) and local student trust score metadata.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
}

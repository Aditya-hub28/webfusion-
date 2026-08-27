import React from 'react';
import { useCircularStore } from '../stores/circularStore';
import { ShieldCheck, Award, CheckCircle2, Clock, Star, RefreshCw, Shield } from 'lucide-react';

export default function TrustProfilePage() {
    const { userTrustScore, persona } = useCircularStore();

    // Persona-specific profile data
    const profile = persona === 'borrower' ? {
        name: 'Aditya Sharma',
        role: 'Verified Student Borrower',
        dept: 'Computer Science & Engineering • 4th Year',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        score: userTrustScore,
        trustLevel: 'Reliable Borrower (Level 4)',
        exchanges: 47,
        onTimePercent: 98,
        rating: '4.9 / 5',
        resourcesShared: 12,
        badges: [
            { id: 'b1', title: 'Reliable Borrower', desc: '95%+ On-Time Return Rate' },
            { id: 'b2', title: 'Fast Responder', desc: 'Avg Response < 15 mins' },
            { id: 'b3', title: 'Circular Contributor', desc: '40+ Successful Exchanges' },
            { id: 'b4', title: 'Verified Student', desc: 'TSEC Campus Verified ID' }
        ]
    } : persona === 'owner' ? {
        name: 'Priya Patel',
        role: 'Verified Resource Owner',
        dept: 'Media & Design • 3rd Year',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        score: 98,
        trustLevel: 'Top Verified Lender (Level 5)',
        exchanges: 32,
        onTimePercent: 100,
        rating: '4.95 / 5',
        resourcesShared: 32,
        badges: [
            { id: 'b1', title: 'Trusted Lender', desc: '30+ Shared Resources' },
            { id: 'b2', title: 'Pristine Gear Owner', desc: 'Zero Condition Disputes' },
            { id: 'b3', title: 'Top Verified Sharer', desc: '100% Five Star Ratings' },
            { id: 'b4', title: 'Verified Student', desc: 'TSEC Campus Verified ID' }
        ]
    } : {
        name: 'Campus Administrator',
        role: 'Platform Governance & Safety',
        dept: 'Campus Operations & Dispute Resolution',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        score: 100,
        trustLevel: 'Platform Governance Admin',
        exchanges: 1150,
        onTimePercent: 99.8,
        rating: '5.0 / 5',
        resourcesShared: 462,
        badges: [
            { id: 'b1', title: 'Verified Administrator', desc: 'Campus Platform Governance' },
            { id: 'b2', title: 'Platform Guardian', desc: '1,150+ Verified Students' },
            { id: 'b3', title: 'Dispute Arbitrator', desc: '42 Disputes Resolved' },
            { id: 'b4', title: 'Security Overseer', desc: 'Full System Access' }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-black text-slate-900">
                                    {profile.name}
                                </h1>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                    <ShieldCheck size={14} /> {profile.role}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{profile.dept}</p>
                        </div>
                    </div>

                    {/* Trust Score Gauge Card */}
                    <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 text-center min-w-[220px] shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                            Campus Trust Score
                        </span>
                        <div className="text-4xl font-black text-white">{profile.score}<span className="text-lg text-slate-400 font-normal">/100</span></div>
                        <span className="text-xs font-bold text-emerald-300 mt-1 inline-block">{profile.trustLevel}</span>
                    </div>
                </div>

                {/* Score Breakdown Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                        <CheckCircle2 size={20} className="text-emerald-600 mx-auto mb-1" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Successful Exchanges</span>
                        <span className="text-lg font-black text-slate-900">{profile.exchanges}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                        <Clock size={20} className="text-blue-600 mx-auto mb-1" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">On-Time Returns</span>
                        <span className="text-lg font-black text-slate-900">{profile.onTimePercent}%</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                        <Star size={20} className="text-amber-500 mx-auto mb-1" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Rating</span>
                        <span className="text-lg font-black text-slate-900">{profile.rating}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                        <RefreshCw size={20} className="text-indigo-600 mx-auto mb-1" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Resources Managed</span>
                        <span className="text-lg font-black text-slate-900">{profile.resourcesShared}</span>
                    </div>
                </div>

                {/* Badges Earned */}
                <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Award size={18} className="text-emerald-600" /> Earned Trust Badges
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {profile.badges.map((bdg) => (
                            <div key={bdg.id} className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-1">
                                <h4 className="text-xs font-bold text-emerald-900">{bdg.title}</h4>
                                <p className="text-[11px] text-emerald-700">{bdg.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

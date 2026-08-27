import React, { useState } from 'react';
import { Send, Camera, ShieldCheck, MapPin } from 'lucide-react';
import { useCircularStore } from '../stores/circularStore';

export default function MessagesPage() {
    const { borrowings } = useCircularStore();
    const activeBorrowing = borrowings[0];

    const [messages, setMessages] = useState([
        { sender: 'Priya Patel', text: 'Hi Aditya! The camera is packed with 2 batteries and SD card. You can collect it from Media Center Block B, Room 204 at 4 PM.', time: '02:15 PM' },
        { sender: 'Aditya Sharma', text: 'Perfect! I will be there at 4 PM sharp. Thanks Priya!', time: '02:18 PM' }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, { sender: 'Aditya Sharma', text: newMessage, time: 'Just now' }]);
        setNewMessage('');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
                {/* Conversations Sidebar */}
                <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/50 p-4 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900">Exchange Conversations</h3>
                    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-3 shadow-sm cursor-pointer space-y-1">
                        <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-900">Priya Patel</span>
                            <span className="text-[10px] text-slate-400">02:18 PM</span>
                        </div>
                        <p className="text-xs text-slate-600 truncate font-semibold">Sony Alpha A7 III 4K Camera</p>
                        <span className="text-[10px] text-emerald-600 font-bold block">Active Exchange • Handover Ready</span>
                    </div>
                </div>

                {/* Main Chat Panel */}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Header Context */}
                    <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={activeBorrowing?.image} alt={activeBorrowing?.title} className="w-10 h-10 object-cover rounded-xl border border-slate-200" />
                            <div>
                                <h4 className="text-xs font-bold text-slate-900">{activeBorrowing?.title}</h4>
                                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                    <MapPin size={12} className="text-emerald-600" /> Media Center Block B, Room 204
                                </span>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            Trust: 98/100
                        </span>
                    </div>

                    {/* Messages List */}
                    <div className="p-6 space-y-4 overflow-y-auto flex-1">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`flex flex-col ${m.sender === 'Aditya Sharma' ? 'items-end' : 'items-start'}`}>
                                <span className="text-[10px] text-slate-400 font-semibold mb-1">{m.sender} • {m.time}</span>
                                <div className={`p-3.5 rounded-2xl max-w-sm text-xs ${
                                    m.sender === 'Aditya Sharma'
                                        ? 'bg-emerald-600 text-white rounded-br-none shadow-sm font-medium'
                                        : 'bg-slate-100 text-slate-800 rounded-bl-none font-medium'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Send Bar */}
                    <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type message regarding exchange location or timing..."
                            className="flex-1 text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                            <Send size={14} /> Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

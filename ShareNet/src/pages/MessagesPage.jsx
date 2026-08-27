import React, { useState, useEffect, useRef } from 'react';
import { Send, Camera, ShieldCheck, MapPin, Smile, Phone, Video, Search, Shield, Info, Paperclip, MoreVertical, ChevronLeft } from 'lucide-react';
import { useCircularStore } from '../stores/circularStore';
import toast from 'react-hot-toast';

export default function MessagesPage() {
    const { borrowings } = useCircularStore();

    const [activeContactId, setActiveContactId] = useState('priya');
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showChatMobile, setShowChatMobile] = useState(false);
    
    // Custom formatted time utility
    const getFormattedTime = () => {
        const d = new Date();
        let hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        const strHours = hours < 10 ? '0' + hours : hours;
        return `${strHours}:${strMinutes} ${ampm}`;
    };

    const [conversations, setConversations] = useState({
        priya: {
            id: 'priya',
            name: 'Priya Patel',
            item: 'Sony Alpha A7 III 4K Camera',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            location: 'Media Center Block B, Room 204',
            trust: '98/100',
            status: 'Active Exchange • Handover Ready',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            online: true,
            messages: [
                { sender: 'Priya Patel', text: 'Hi Aditya! The camera is packed with 2 batteries and SD card. You can collect it from Media Center Block B, Room 204 at 4 PM.', time: '02:15 PM' },
                { sender: 'Aditya Sharma', text: 'Perfect! I will be there at 4 PM sharp. Thanks Priya!', time: '02:18 PM' }
            ],
            replyIndex: 0,
            botReplies: [
                "Awesome, let me know when you reach the Media Center building.",
                "Yes, I have the camera case and all accessories ready here.",
                "Awesome! Please double check the condition log once I handover.",
                "Perfect transaction, see you next time!"
            ]
        },
        rohan: {
            id: 'rohan',
            name: 'Rohan Verma',
            item: 'Heavy Duty Fluid Head DSLR Tripod',
            image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            location: 'Hostel Block 3, Room 112',
            trust: '91/100',
            status: 'Exchange Completed',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            online: false,
            messages: [
                { sender: 'Rohan Verma', text: 'Hey Aditya, did you find the quick release plate?', time: 'Yesterday' },
                { sender: 'Aditya Sharma', text: 'Yes, it was in the side pocket of the bag. Thanks!', time: 'Yesterday' },
                { sender: 'Rohan Verma', text: 'Great, glad it worked out!', time: 'Yesterday' }
            ],
            replyIndex: 0,
            botReplies: [
                "Sure, let me know if you need to borrow the tripod again next week.",
                "Happy to share! Make sure to lock the tripod legs properly.",
                "No problem, take care!"
            ]
        },
        ananya: {
            id: 'ananya',
            name: 'Ananya Roy',
            item: 'Rode Wireless GO II Microphone',
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
            location: 'Library Block C, Digital Desk',
            trust: '88/100',
            status: 'Pending Verification',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            online: true,
            messages: [
                { sender: 'Ananya Roy', text: 'Hi! Can you pick up the wireless mics tomorrow morning?', time: 'Tuesday' },
                { sender: 'Aditya Sharma', text: 'Sure, is 9:30 AM fine?', time: 'Tuesday' },
                { sender: 'Ananya Roy', text: 'Yes, that works perfectly.', time: 'Tuesday' }
            ],
            replyIndex: 0,
            botReplies: [
                "I will be waiting at the Library C Digital Desk at 9:30 AM tomorrow.",
                "Please make sure your trust profile is verified before handover.",
                "Got it! See you tomorrow morning."
            ]
        }
    });

    const activeChat = conversations[activeContactId];
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations, activeContactId, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMsg = {
            sender: 'Aditya Sharma',
            text: newMessage,
            time: getFormattedTime()
        };

        // Append user message to active chat
        setConversations(prev => {
            const chat = prev[activeContactId];
            return {
                ...prev,
                [activeContactId]: {
                    ...chat,
                    messages: [...chat.messages, userMsg]
                }
            };
        });

        const userText = newMessage.toLowerCase();
        setNewMessage('');

        // Trigger simulated reply from other user in 2 seconds
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setConversations(prev => {
                const chat = prev[activeContactId];
                
                // Context aware replies
                let botText = "";
                if (userText.includes("location") || userText.includes("where") || userText.includes("meet")) {
                    botText = `Let's meet at ${chat.location}. I'm on my way!`;
                } else if (userText.includes("time") || userText.includes("when") || userText.includes("clock") || userText.includes("pm") || userText.includes("am")) {
                    botText = "Sounds good. That time works perfectly for me.";
                } else if (userText.includes("thank") || userText.includes("thx") || userText.includes("thanks")) {
                    botText = "You're welcome! Glad to coordinate.";
                } else {
                    botText = chat.botReplies[chat.replyIndex % chat.botReplies.length];
                }

                const botMsg = {
                    sender: chat.name,
                    text: botText,
                    time: getFormattedTime()
                };

                return {
                    ...prev,
                    [activeContactId]: {
                        ...chat,
                        messages: [...chat.messages, botMsg],
                        replyIndex: chat.replyIndex + 1
                    }
                };
            });
            toast(`New message from ${activeChat.name}`, { icon: '💬' });
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-1">
                    <Send size={16} /> Campus Messenger Layer
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Exchange Messenger
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Chat with campus lenders/borrowers, discuss logistics, and finalize checkout handover terms.
                </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row h-[620px]">
                {/* Conversations Sidebar */}
                <div className={`w-full md:w-80 border-r border-slate-200 bg-slate-50/40 flex flex-col h-full ${showChatMobile ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-slate-200">
                        <h3 className="text-sm font-black text-slate-800">Exchange Conversations</h3>
                    </div>
                    
                    <div className="overflow-y-auto flex-1 p-3 space-y-2">
                        {Object.values(conversations).map((conv) => {
                            const lastMsg = conv.messages[conv.messages.length - 1];
                            const isSelected = activeContactId === conv.id;
                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => {
                                        setActiveContactId(conv.id);
                                        setNewMessage('');
                                        setShowChatMobile(true);
                                    }}
                                    className={`rounded-2xl p-3 cursor-pointer transition-all border ${
                                        isSelected
                                            ? 'bg-white border-emerald-500/80 shadow-[0_4px_12px_rgba(16,185,129,0.08)]'
                                            : 'bg-transparent border-transparent hover:bg-white/40'
                                    }`}
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative shrink-0">
                                                <img src={conv.avatar} alt={conv.name} className="w-8 h-8 rounded-full object-cover border border-white" />
                                                {conv.online && (
                                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-slate-800">{conv.name}</span>
                                                <p className="text-[10px] text-slate-400 font-semibold">{conv.item.split(' ').slice(0, 3).join(' ')}...</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] text-slate-400 font-bold shrink-0">{lastMsg?.time || 'Now'}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-medium truncate max-w-[150px]">{lastMsg?.text}</span>
                                        <span className={`font-bold shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`}>
                                            {conv.status.split('•')[0]}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Chat Panel */}
                <div className={`flex-1 flex flex-col justify-between h-full bg-white/30 ${showChatMobile ? 'flex' : 'hidden md:flex'}`}>
                    {/* Header Context */}
                    <div className="p-4 border-b border-slate-200/50 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowChatMobile(false)}
                                className="md:hidden p-1.5 -ml-1 rounded-xl text-slate-500 hover:bg-slate-200/40 transition-all shrink-0"
                                title="Back to conversations"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border flex-shrink-0">
                                <img src={activeChat.image} alt={activeChat.item} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-slate-800">{activeChat.item}</h4>
                                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                                    <MapPin size={12} className="text-emerald-600 shrink-0" /> {activeChat.location}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Owner Score</span>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    Trust: {activeChat.trust}
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <button className="p-2 rounded-full hover:bg-slate-200/40 text-slate-500 transition-colors" title="Mock Phone Call">
                                    <Phone size={14} />
                                </button>
                                <button className="p-2 rounded-full hover:bg-slate-200/40 text-slate-500 transition-colors" title="Mock Video Call">
                                    <Video size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-slate-50/20">
                        {activeChat.messages.map((m, idx) => (
                            <div key={idx} className={`flex flex-col ${m.sender === 'Aditya Sharma' ? 'items-end' : 'items-start'}`}>
                                <span className="text-[9px] text-slate-400 font-bold mb-1">{m.sender} • {m.time}</span>
                                <div className={`p-3.5 rounded-2xl max-w-sm text-xs shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 ${
                                    m.sender === 'Aditya Sharma'
                                        ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none font-medium'
                                }`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        
                        {/* Blinking Typing Indicator */}
                        {isTyping && (
                            <div className="flex flex-col items-start animate-pulse">
                                <span className="text-[9px] text-slate-400 font-bold mb-1">{activeChat.name} • typing...</span>
                                <div className="bg-white border border-slate-200 text-slate-800 p-3 py-4 rounded-2xl rounded-bl-none flex items-center space-x-1.5 shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Send Bar */}
                    <form onSubmit={handleSend} className="p-3 border-t border-slate-200/50 bg-white/80 backdrop-blur-md flex items-center gap-2">
                        <button type="button" className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors" title="Attach Files">
                            <Paperclip size={16} />
                        </button>
                        <button type="button" className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors" title="Camera Capture">
                            <Camera size={16} />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={`Type message to ${activeChat.name}...`}
                            className="flex-1 text-xs p-3 border border-slate-200 bg-slate-50/50 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-transparent transition-all"
                        />
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow-md shadow-emerald-600/10 transition-all flex items-center justify-center">
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

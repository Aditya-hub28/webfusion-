import React, { useState } from 'react';
import { QrCode, Scan, CheckCircle, X, Copy, Download } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export default function QRCodeModal({ isOpen, onClose, itemOrKit }) {
    const [scanned, setScanned] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState('view'); // 'view' | 'scan'

    if (!itemOrKit) return null;

    const qrPayload = itemOrKit.qrCode || `SHARENET-ASSET-${itemOrKit.assetTag || itemOrKit.id}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(qrPayload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSimulateScan = () => {
        setScanned(true);
        setTimeout(() => {
            setScanned(false);
            setMode('view');
        }, 2500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Asset QR Identifier • ${itemOrKit.title || itemOrKit.name}`}>
            <div className="space-y-6 text-center">
                <div className="flex justify-center space-x-2 bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setMode('view')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                            mode === 'view' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <QrCode size={16} className="inline mr-2" />
                        View QR & Tag
                    </button>
                    <button
                        onClick={() => setMode('scan')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                            mode === 'scan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Scan size={16} className="inline mr-2" />
                        Simulate Check-in Scanner
                    </button>
                </div>

                {mode === 'view' ? (
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
                        <div className="w-48 h-48 bg-white p-4 rounded-2xl shadow-md border flex flex-col items-center justify-center relative">
                            {/* Simulated SVG QR code */}
                            <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                                <rect x="0" y="0" width="30" height="30" rx="4" />
                                <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                                <rect x="9" y="9" width="12" height="12" rx="1" />

                                <rect x="70" y="0" width="30" height="30" rx="4" />
                                <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                                <rect x="79" y="9" width="12" height="12" rx="1" />

                                <rect x="0" y="70" width="30" height="30" rx="4" />
                                <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                                <rect x="9" y="79" width="12" height="12" rx="1" />

                                <rect x="35" y="10" width="10" height="10" />
                                <rect x="50" y="20" width="15" height="10" />
                                <rect x="35" y="40" width="25" height="25" rx="2" />
                                <rect x="65" y="45" width="10" height="20" />
                                <rect x="70" y="70" width="25" height="25" rx="2" />
                                <rect x="40" y="75" width="15" height="10" />
                            </svg>
                        </div>
                        <div className="mt-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Asset Tag ID</span>
                            <p className="text-lg font-mono font-bold text-slate-900">{itemOrKit.assetTag || 'SHLF-EQUIP-881'}</p>
                            <p className="text-xs font-mono text-slate-600 mt-1 break-all bg-slate-200/60 px-3 py-1 rounded-md">{qrPayload}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" onClick={handleCopy}>
                                <Copy size={14} className="mr-1.5" />
                                {copied ? 'Copied Tag' : 'Copy Tag'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 text-white rounded-2xl relative overflow-hidden">
                        {scanned ? (
                            <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                                <CheckCircle size={48} className="text-green-400 mx-auto" />
                                <h4 className="text-lg font-bold text-green-300">QR Asset Code Verified!</h4>
                                <p className="text-xs text-slate-300">Instant Shelf Asset check-in logged to audit ledger.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 text-center">
                                <div className="relative w-40 h-40 border-2 border-blue-400 rounded-xl flex items-center justify-center mx-auto bg-blue-950/40">
                                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-400 animate-pulse shadow-lg shadow-blue-500"></div>
                                    <Scan size={40} className="text-blue-300 opacity-60" />
                                </div>
                                <p className="text-xs text-slate-300">Point device camera or scanner at asset QR code</p>
                                <Button onClick={handleSimulateScan} className="bg-blue-600 hover:bg-blue-500">
                                    Simulate Camera Scan
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-end">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

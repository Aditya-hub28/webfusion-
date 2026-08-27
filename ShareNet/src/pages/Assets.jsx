import { useState, useEffect } from 'react';
import mockDb from '../lib/mockDb';
import { Card, Button, Badge, Input, Select, Modal } from '../components/ui';
import { QrCode, MapPin, ClipboardList, Camera, AlertCircle, Layers, CheckCircle2, RefreshCw, Upload, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Assets() {
    const [assets, setAssets] = useState([]);
    const [kits, setKits] = useState([]);
    const [activeTab, setActiveTab] = useState('assets'); // assets, kits, scanner
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showConditionModal, setShowConditionModal] = useState(false);
    
    // Condition form
    const [newCondition, setNewCondition] = useState('Good');
    const [conditionNotes, setConditionNotes] = useState('');
    const [conditionPhoto, setConditionPhoto] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400');
    
    // QR Scanner Sim state
    const [scannerSelectedCode, setScannerSelectedCode] = useState('');
    const [scannedResult, setScannedResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setAssets(mockDb.getLendingItems());
        setKits(mockDb.getKits());
    };

    const handleUpdateCondition = (asset) => {
        setSelectedAsset(asset);
        setNewCondition(asset.condition);
        setConditionNotes('');
        setShowConditionModal(true);
    };

    const saveConditionUpdate = () => {
        try {
            mockDb.updateLendingItem(selectedAsset._id, {
                condition: newCondition,
                description: `${selectedAsset.description} (Updated: ${newCondition} - ${conditionNotes})`,
                image: conditionPhoto
            });
            toast.success("Asset condition logged and updated!");
            setShowConditionModal(false);
            loadData();
        } catch (error) {
            toast.error("Failed to update condition.");
        }
    };

    const runMockScanner = () => {
        if (!scannerSelectedCode) {
            toast.error("Please select a QR code to simulate scanning.");
            return;
        }
        setIsScanning(true);
        setScannedResult(null);
        
        setTimeout(() => {
            setIsScanning(false);
            const foundAsset = assets.find(a => a.qrCode === scannerSelectedCode);
            const foundKit = kits.find(k => k.qrCode === scannerSelectedCode);
            
            if (foundAsset) {
                setScannedResult({ type: 'asset', data: foundAsset });
                toast.success("Asset QR scanned successfully!");
            } else if (foundKit) {
                setScannedResult({ type: 'kit', data: foundKit });
                toast.success("Kit QR scanned successfully!");
            } else {
                toast.error("QR Code not recognized in database.");
            }
        }, 1500); // simulate 1.5s camera scan
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Layers className="text-blue-600" size={32} />
                        Physical Asset Tracker (Shelf)
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Track physical hardware inventory, scan asset QR labels, manage bundled equipment kits, and verify hardware conditions.
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('assets')}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'assets'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Asset Management
                </button>
                <button
                    onClick={() => setActiveTab('kits')}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'kits'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Equipment Kits
                </button>
                <button
                    onClick={() => setActiveTab('scanner')}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'scanner'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Simulated QR Scanner
                </button>
            </div>

            {/* Asset Management Tab */}
            {activeTab === 'assets' && (
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b text-gray-500 text-xs font-semibold uppercase tracking-wider">
                                    <th className="py-3 px-6">Asset Details</th>
                                    <th className="py-3 px-6">QR Label</th>
                                    <th className="py-3 px-6">Location</th>
                                    <th className="py-3 px-6">Condition</th>
                                    <th className="py-3 px-6">Status</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-sm">
                                {assets.map((asset) => (
                                    <tr key={asset._id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">{asset.name}</div>
                                                    <div className="text-xs text-gray-400">S/N: {asset.serialNumber}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-xs text-blue-600">
                                            <div className="flex items-center gap-1.5">
                                                <QrCode size={14} className="text-blue-500" />
                                                {asset.qrCode}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 font-medium">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} className="text-gray-400" />
                                                {asset.location.split(',')[0]}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge
                                                variant={
                                                    asset.condition === 'Excellent' ? 'success' :
                                                    asset.condition === 'Good' ? 'primary' :
                                                    asset.condition === 'Fair' ? 'warning' : 'danger'
                                                }
                                            >
                                                {asset.condition.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge
                                                variant={
                                                    asset.status === 'available' ? 'success' :
                                                    asset.status === 'reserved' ? 'warning' : 'danger'
                                                }
                                            >
                                                {asset.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Button
                                                onClick={() => handleUpdateCondition(asset)}
                                                variant="outline"
                                                size="sm"
                                            >
                                                Verify Condition
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Kits Tab */}
            {activeTab === 'kits' && (
                <div className="grid md:grid-cols-2 gap-8">
                    {kits.map((kit) => (
                        <Card key={kit._id} className="p-6 border border-gray-200 shadow-sm flex flex-col justify-between h-full space-y-4">
                            <div>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-extrabold text-xl text-gray-900">{kit.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{kit.description}</p>
                                    </div>
                                    <Badge variant={kit.status === 'available' ? 'success' : 'danger'}>
                                        {kit.status.toUpperCase()}
                                    </Badge>
                                </div>

                                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bundled Kit Assets</h4>
                                    <div className="space-y-2">
                                        {kit.assets.map((asset, idx) => (
                                            <div key={idx} className="flex justify-between text-sm py-1.5 border-b border-gray-200 last:border-0">
                                                <span className="font-medium text-gray-700">{asset.name}</span>
                                                <span className="text-xs font-mono text-gray-400">S/N: {asset.serial}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>Storage Location: <span className="font-semibold text-gray-800">{kit.location}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <QrCode size={16} className="text-gray-400" />
                                    <span>Kit QR ID: <span className="font-mono text-blue-600 font-semibold">{kit.qrCode}</span></span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Simulated Scanner Tab */}
            {activeTab === 'scanner' && (
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Simulator Control */}
                    <Card className="p-6 border shadow-sm space-y-6">
                        <div>
                            <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                                <Camera size={20} className="text-blue-600" />
                                Simulated Mobile QR Reader
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Choose an asset QR code below to simulate scanning it with a physical mobile camera device.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Select Barcode / QR Code</label>
                                <Select
                                    value={scannerSelectedCode}
                                    onChange={(e) => setScannerSelectedCode(e.target.value)}
                                >
                                    <option value="">-- Choose Asset/Kit QR --</option>
                                    <optgroup label="Assets">
                                        {assets.map(a => (
                                            <option key={a._id} value={a.qrCode}>{a.name} ({a.qrCode})</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Kits">
                                        {kits.map(k => (
                                            <option key={k._id} value={k.qrCode}>{k.name} ({k.qrCode})</option>
                                        ))}
                                    </optgroup>
                                </Select>
                            </div>

                            <Button onClick={runMockScanner} className="w-full flex justify-center items-center gap-2">
                                <QrCode size={18} />
                                Trigger Simulator Scan
                            </Button>
                        </div>

                        {/* Scanner Animation View */}
                        <div className="relative border-4 border-dashed border-gray-300 rounded-xl aspect-video bg-gray-950 overflow-hidden flex items-center justify-center">
                            {isScanning ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <div className="text-blue-400 font-medium text-sm animate-pulse">Accessing Camera feed & Scanning...</div>
                                </div>
                            ) : (
                                <div className="text-center p-6 text-gray-500 space-y-2">
                                    <QrCode size={48} className="mx-auto text-gray-600 animate-pulse" />
                                    <p className="text-sm">Scan Chamber Idle</p>
                                    <p className="text-xs text-gray-600">Select a code and trigger the simulator to run scan.</p>
                                </div>
                            )}
                            
                            {/* Scanning Laser Line */}
                            {isScanning && (
                                <div className="absolute left-0 right-0 h-1 bg-red-500 shadow-md shadow-red-500/50 animate-bounce top-0"></div>
                            )}
                        </div>
                    </Card>

                    {/* Scanner Output Details */}
                    <div>
                        {scannedResult ? (
                            <Card className="p-6 border shadow-sm border-green-200 bg-green-50/10 space-y-4">
                                <div className="flex items-center gap-2 text-green-700 font-bold">
                                    <CheckCircle2 size={20} />
                                    <span>Scanning Complete! Found match.</span>
                                </div>

                                <div className="border-t pt-4 space-y-4">
                                    {scannedResult.type === 'asset' ? (
                                        <>
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden">
                                                    <img src={scannedResult.data.image} alt={scannedResult.data.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <Badge variant="primary" className="mb-1">PHYSICAL ASSET</Badge>
                                                    <h4 className="font-extrabold text-gray-900 text-lg">{scannedResult.data.name}</h4>
                                                    <p className="text-xs text-gray-500">S/N: {scannedResult.data.serialNumber}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                                                <div className="p-3 bg-white border rounded-lg">
                                                    <div className="text-xs text-gray-400 font-semibold">STORAGE AREA</div>
                                                    <div className="font-bold text-gray-800 mt-1 flex items-center gap-1">
                                                        <MapPin size={14} className="text-gray-400" />
                                                        {scannedResult.data.location}
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-white border rounded-lg">
                                                    <div className="text-xs text-gray-400 font-semibold">CONDITION VERIFIED</div>
                                                    <div className="mt-1">
                                                        <Badge variant={scannedResult.data.condition === 'Excellent' ? 'success' : 'primary'}>
                                                            {scannedResult.data.condition}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-3 bg-white border rounded-lg text-sm">
                                                <div className="text-xs text-gray-400 font-semibold">STATUS</div>
                                                <div className="font-bold mt-1 text-gray-700 capitalize">{scannedResult.data.status}</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <Badge variant="warning" className="mb-1">ASSET BUNDLED KIT</Badge>
                                                <h4 className="font-extrabold text-gray-900 text-lg">{scannedResult.data.name}</h4>
                                                <p className="text-sm text-gray-500 mt-1">{scannedResult.data.description}</p>
                                            </div>

                                            <div className="p-4 bg-white border rounded-lg space-y-2">
                                                <div className="text-xs font-bold text-gray-400 uppercase">KIT CONTENTS ({scannedResult.data.assets.length})</div>
                                                {scannedResult.data.assets.map((asset, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm py-1 border-b last:border-0">
                                                        <span className="text-gray-700 font-medium">{asset.name}</span>
                                                        <span className="text-xs font-mono text-gray-400">S/N: {asset.serial}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <div className="h-64 border border-dashed rounded-xl flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
                                No QR code scanned yet. Run a simulator scan to load asset logs.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Condition Upload and Verification Modal */}
            {showConditionModal && selectedAsset && (
                <Modal
                    isOpen={showConditionModal}
                    onClose={() => setShowConditionModal(false)}
                    title={`Update Condition: ${selectedAsset.name}`}
                >
                    <div className="space-y-4 py-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Select Rated Condition</label>
                            <Select
                                value={newCondition}
                                onChange={(e) => setNewCondition(e.target.value)}
                            >
                                <option value="Excellent">Excellent (No defects, brand new)</option>
                                <option value="Good">Good (Minor wear, fully functional)</option>
                                <option value="Fair">Fair (Noticeable scratches, usable)</option>
                                <option value="Damaged">Damaged (Broken parts, requires repair)</option>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Condition Notes / Audit Trail</label>
                            <textarea
                                value={conditionNotes}
                                onChange={(e) => setConditionNotes(e.target.value)}
                                className="w-full min-h-[80px] p-3 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                placeholder="Describe any scratches, lens quality, battery health, or accessories..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 block">Condition Audit Photo</label>
                            <div className="flex gap-4 items-center">
                                <div className="w-20 h-20 rounded bg-gray-100 border overflow-hidden flex items-center justify-center flex-shrink-0">
                                    <img src={conditionPhoto} alt="Condition audit" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-2">
                                    <Button
                                        onClick={() => {
                                            // Mock photo choices
                                            const options = [
                                                'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
                                                'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400',
                                                'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
                                            ];
                                            const nextIdx = (options.indexOf(conditionPhoto) + 1) % options.length;
                                            setConditionPhoto(options[nextIdx]);
                                            toast.success("Audit photo uploaded/attached.");
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                    >
                                        <Camera size={14} />
                                        Simulate Camera Capture
                                    </Button>
                                    <p className="text-xs text-gray-400">Capture a photo to log physical damage or proof of status.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowConditionModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={saveConditionUpdate}>
                                Log & Update
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

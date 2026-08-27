import { useState, useEffect } from 'react';
import mockDb from '../lib/mockDb';
import { Card, Button, Badge, Input, Modal } from '../components/ui';
import { Calendar, Clock, MapPin, ShieldCheck, Check, X, ClipboardList, User, ShieldAlert, Laptop, Sliders, RefreshCw, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Lending() {
    const [items, setItems] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('browse'); // browse, my-reservations, admin
    const [selectedItem, setSelectedItem] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showReserveModal, setShowReserveModal] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setItems(mockDb.getLendingItems());
        setReservations(mockDb.getReservations());
    };

    const handleReserve = (item) => {
        setSelectedItem(item);
        setStartDate(new Date().toISOString().split('T')[0]);
        setEndDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
        setShowReserveModal(true);
    };

    const submitReservation = () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            toast.error("Start date cannot be after end date.");
            return;
        }
        try {
            mockDb.createReservation({
                itemId: selectedItem._id,
                startDate,
                endDate
            });
            toast.success(`Reservation request submitted for ${selectedItem.name}!`);
            setShowReserveModal(false);
            loadData();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCancelReservation = (resId) => {
        mockDb.updateReservationStatus(resId, 'cancelled');
        toast.success("Reservation cancelled.");
        loadData();
    };

    // Admin commands
    const adminApprove = (resId) => {
        mockDb.updateReservationStatus(resId, 'approved');
        toast.success("Reservation approved!");
        loadData();
    };

    const adminCheckOut = (resId) => {
        mockDb.updateReservationStatus(resId, 'active');
        toast.success("Item successfully checked out (borrowed)!");
        loadData();
    };

    const adminCheckIn = (resId) => {
        mockDb.updateReservationStatus(resId, 'returned');
        toast.success("Item successfully checked in (returned)!");
        loadData();
    };

    const adminMarkOverdue = (resId) => {
        mockDb.updateReservationStatus(resId, 'overdue');
        toast.error("Reservation flagged as OVERDUE!");
        loadData();
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                        <Sliders className="text-blue-600" size={32} />
                        Campus Equipment Library (leihs)
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Official campus hardware inventory. Browse assets, reserve items, and track borrowing returns.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setIsAdmin(!isAdmin);
                            setActiveTab(isAdmin ? 'browse' : 'admin');
                            toast.success(`Switched to ${!isAdmin ? 'Librarian Admin' : 'Student'} mode`);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all shadow-sm ${
                            isAdmin 
                                ? 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700' 
                                : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                        }`}
                    >
                        <User size={16} />
                        {isAdmin ? 'Librarian View: Active' : 'Switch to Librarian View'}
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('browse')}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'browse'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    Browse Equipment
                </button>
                <button
                    onClick={() => setActiveTab('my-reservations')}
                    className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'my-reservations'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    My Bookings & Return Desk
                </button>
                {isAdmin && (
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
                            activeTab === 'admin'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Admin Command Center
                    </button>
                )}
            </div>

            {/* Browse Equipment Tab */}
            {activeTab === 'browse' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-all border border-gray-150 flex flex-col">
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3">
                                    <Badge
                                        variant={
                                            item.status === 'available' ? 'success' :
                                            item.status === 'reserved' ? 'warning' : 'danger'
                                        }
                                    >
                                        {item.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-gray-900 leading-snug">{item.name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-3">{item.description}</p>
                                </div>

                                <div className="space-y-2 pt-2 border-t text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-gray-400" />
                                        <span>Condition: <span className="font-medium text-gray-800">{item.condition}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>Serial: {item.serialNumber}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        onClick={() => handleReserve(item)}
                                        disabled={item.status !== 'available'}
                                        className="w-full"
                                    >
                                        {item.status === 'available' ? 'Reserve Item' : 'Currently Unavailable'}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* My Bookings Tab */}
            {activeTab === 'my-reservations' && (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock size={20} className="text-blue-600" />
                        Lending Workflow & Return Desk
                    </h2>

                    {reservations.filter(r => r.userId === 'user-1').length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">You do not have any active reservations.</p>
                            <Button onClick={() => setActiveTab('browse')} className="mt-4" variant="outline">
                                Browse Inventory
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border shadow-sm divide-y">
                            {reservations.filter(r => r.userId === 'user-1').map((res) => (
                                <div key={res._id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img src={res.itemDetail?.image} alt={res.itemDetail?.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{res.itemDetail?.name}</h4>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {res.startDate} to {res.endDate}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {res.itemDetail?.location}
                                                </span>
                                            </div>
                                            {res.status === 'overdue' && (
                                                <div className="flex items-center gap-1 text-red-600 text-sm font-semibold mt-2">
                                                    <ShieldAlert size={16} />
                                                    <span>OVERDUE! Please return this asset immediately to prevent score penalty.</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant={
                                                res.status === 'approved' ? 'success' :
                                                res.status === 'active' ? 'primary' :
                                                res.status === 'pending' ? 'warning' :
                                                res.status === 'returned' ? 'light' : 'danger'
                                            }
                                        >
                                            {res.status === 'active' ? 'IN USE' : res.status.toUpperCase()}
                                        </Badge>
                                        
                                        {res.status === 'pending' && (
                                            <Button
                                                onClick={() => handleCancelReservation(res._id)}
                                                variant="outline"
                                                size="sm"
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Admin Command Center Tab */}
            {activeTab === 'admin' && isAdmin && (
                <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-indigo-900 text-lg flex items-center gap-2">
                                <Award size={20} />
                                Librarian / Administrator Workspace
                            </h3>
                            <p className="text-sm text-indigo-700 mt-1">
                                Manage university-wide asset requests. Hand out devices to students, track overdue returns, and check assets back in.
                            </p>
                        </div>
                        <div className="text-sm font-medium bg-white px-4 py-2 rounded-lg text-indigo-800 border border-indigo-200 self-start md:self-auto">
                            Total Reservations: {reservations.length}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b text-gray-500 text-xs font-semibold uppercase tracking-wider">
                                        <th className="py-3 px-6">Requester</th>
                                        <th className="py-3 px-6">Equipment</th>
                                        <th className="py-3 px-6">Lending Period</th>
                                        <th className="py-3 px-6">Status</th>
                                        <th className="py-3 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y text-sm">
                                    {reservations.map((res) => (
                                        <tr key={res._id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium text-gray-900">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                                                        {res.userFullName.split(' ').map(n=>n[0]).join('')}
                                                    </div>
                                                    {res.userFullName}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-800">{res.itemDetail?.name}</div>
                                                <div className="text-xs text-gray-400">S/N: {res.itemDetail?.serialNumber}</div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {res.startDate} to {res.endDate}
                                            </td>
                                            <td className="py-4 px-6">
                                                <Badge
                                                    variant={
                                                        res.status === 'approved' ? 'success' :
                                                        res.status === 'active' ? 'primary' :
                                                        res.status === 'pending' ? 'warning' :
                                                        res.status === 'returned' ? 'light' : 'danger'
                                                    }
                                                >
                                                    {res.status === 'active' ? 'IN USE' : res.status.toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                {res.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            onClick={() => adminApprove(res._id)}
                                                            variant="success"
                                                            size="xs"
                                                            className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 text-xs rounded"
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleCancelReservation(res._id)}
                                                            variant="outline"
                                                            size="xs"
                                                            className="border-red-300 text-red-600 hover:bg-red-50 px-2.5 py-1 text-xs rounded"
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                {res.status === 'approved' && (
                                                    <Button
                                                        onClick={() => adminCheckOut(res._id)}
                                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1 text-xs rounded"
                                                        size="xs"
                                                    >
                                                        Check-Out (Handover)
                                                    </Button>
                                                )}
                                                {res.status === 'active' && (
                                                    <div className="inline-flex gap-2">
                                                        <Button
                                                            onClick={() => adminCheckIn(res._id)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 text-xs rounded"
                                                            size="xs"
                                                        >
                                                            Check-In (Return)
                                                        </Button>
                                                        <Button
                                                            onClick={() => adminMarkOverdue(res._id)}
                                                            variant="outline"
                                                            className="border-red-500 text-red-600 hover:bg-red-50 px-2.5 py-1 text-xs rounded font-semibold"
                                                            size="xs"
                                                        >
                                                            Mark Overdue
                                                        </Button>
                                                    </div>
                                                )}
                                                {res.status === 'overdue' && (
                                                    <Button
                                                        onClick={() => adminCheckIn(res._id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 text-xs rounded"
                                                        size="xs"
                                                    >
                                                        Process Return
                                                    </Button>
                                                )}
                                                {(res.status === 'returned' || res.status === 'cancelled') && (
                                                    <span className="text-xs text-gray-400">Archived</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Reservation Date Picker Modal */}
            {showReserveModal && selectedItem && (
                <Modal
                    isOpen={showReserveModal}
                    onClose={() => setShowReserveModal(false)}
                    title={`Reserve: ${selectedItem.name}`}
                >
                    <div className="space-y-4 py-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
                            <MapPin size={20} className="text-blue-600 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">Pick-up Location:</span> {selectedItem.location}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Start Date</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">End Date (Return Date)</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowReserveModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={submitReservation}>
                                Submit Reservation
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

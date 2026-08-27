import { create } from 'zustand';
import { mockReservations, mockConditionLogs, mockDisputes } from '../lib/mockData';

const useLendingStore = create((set, get) => ({
    reservations: mockReservations,
    conditionLogs: mockConditionLogs,
    disputes: mockDisputes,

    addReservation: (reservationData) => set(state => ({
        reservations: [
            {
                id: `res-${Date.now()}`,
                status: 'Approved & Scheduled',
                ...reservationData
            },
            ...state.reservations
        ]
    })),

    addConditionLog: (log) => set(state => ({
        conditionLogs: [
            {
                id: `cond-${Date.now()}`,
                timestamp: new Date().toLocaleString(),
                ...log
            },
            ...state.conditionLogs
        ]
    })),

    resolveDispute: (disputeId) => set(state => ({
        disputes: state.disputes.map(d =>
            d.id === disputeId ? { ...d, status: 'Resolved by Admin' } : d
        )
    })),

    updateReservationStatus: (id, status) => set(state => ({
        reservations: state.reservations.map(r =>
            r.id === id ? { ...r, status } : r
        )
    }))
}));

export default useLendingStore;

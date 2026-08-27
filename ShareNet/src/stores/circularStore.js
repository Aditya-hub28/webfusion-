import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialResources = [
    {
        id: 'res-1',
        title: 'Sony Alpha A7 III 4K Mirrorless Camera',
        category: 'Cameras',
        condition: 'Pristine',
        distanceKm: 1.2,
        dailyCharge: 200,
        deposit: 500,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 38,
        images: [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Media Center Block B, Room 204',
        owner: {
            name: 'Priya Patel',
            department: 'Media & Design',
            trustScore: 98,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['2x Batteries', '128GB SD Card', 'Camera Strap', 'Carrying Bag'],
        borrowingConditions: ['Return before 6 PM on due date', 'Do not use under heavy rain without rain cover']
    },
    {
        id: 'res-2',
        title: 'Heavy Duty Fluid Head DSLR Tripod',
        category: 'Tripods',
        condition: 'Excellent',
        distanceKm: 0.8,
        dailyCharge: 50,
        deposit: 200,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.8,
        reviewsCount: 19,
        images: [
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Hostel Block 3, Room 112',
        owner: {
            name: 'Rohan Verma',
            department: 'Computer Science',
            trustScore: 91,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['Quick Release Plate', 'Carrying Case'],
        borrowingConditions: ['Ensure leg locks are tightened properly']
    },
    {
        id: 'res-3',
        title: 'Rode Wireless GO II Dual Channel Microphone',
        category: 'Microphones',
        condition: 'Pristine',
        distanceKm: 0.5,
        dailyCharge: 80,
        deposit: 300,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.95,
        reviewsCount: 27,
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Library Block C, Digital Desk',
        owner: {
            name: 'Ananya Roy',
            department: 'Electrical Engg',
            trustScore: 88,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['2 Transmitters', '1 Receiver', '2 Lavalier Mics', 'Charging Cable'],
        borrowingConditions: ['Charge transmitters fully before returning']
    },
    {
        id: 'res-4',
        title: 'Shure SM7B Studio Podcast Microphone',
        category: 'Microphones',
        condition: 'Pristine',
        distanceKm: 1.5,
        dailyCharge: 120,
        deposit: 400,
        platformFee: 15,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.92,
        reviewsCount: 31,
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Audio Studio Block A',
        owner: {
            name: 'Ananya Roy',
            department: 'Electrical Engg',
            trustScore: 88,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['XLR Cable', 'Desktop Boom Arm', 'Pop Filter'],
        borrowingConditions: ['Requires XLR audio interface']
    },
    {
        id: 'res-5',
        title: 'Kashmir Willow Cricket Bat Match Kit',
        category: 'Sports',
        condition: 'Good',
        distanceKm: 0.6,
        dailyCharge: 60,
        deposit: 250,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.75,
        reviewsCount: 14,
        images: [
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Sports Complex Locker 14',
        owner: {
            name: 'Vikram Singh',
            department: 'Mechanical Engg',
            trustScore: 85,
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['3x Leather Balls', 'Wooden Stumps', 'Leg Guard Pads'],
        borrowingConditions: ['Clean bat grip after use']
    },
    {
        id: 'res-6',
        title: '4-Person Waterproof Camping Tent & Stove',
        category: 'Travel',
        condition: 'Excellent',
        distanceKm: 2.1,
        dailyCharge: 150,
        deposit: 600,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 22,
        images: [
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Hostel Block 1, Room 302',
        owner: {
            name: 'Sneha Rao',
            department: 'Biotech Dept',
            trustScore: 96,
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['4 Sleeping Bags', 'Portable Gas Stove', 'Headlamp'],
        borrowingConditions: ['Ensure tent is completely dry before packing']
    },
    {
        id: 'res-7',
        title: 'Full HD 1080p Portable LED Projector',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 160,
        deposit: 450,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.96,
        reviewsCount: 45,
        images: [
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Management Block Room 104',
        owner: {
            name: 'Siddharth Nair',
            department: 'MBA Dept',
            trustScore: 97,
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['HDMI Cable', 'Remote Control', 'Power Cord'],
        borrowingConditions: ['Keep lens cover on during transport']
    },
    {
        id: 'res-8',
        title: 'Casio FX-991EX Scientific Calculator',
        category: 'Academic',
        condition: 'Excellent',
        distanceKm: 0.2,
        dailyCharge: 20,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.85,
        reviewsCount: 52,
        images: [
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
        ],
        location: 'Architecture Studio 2',
        owner: {
            name: 'Tanvi Shah',
            department: 'Architecture',
            trustScore: 93,
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
        },
        accessories: ['Hard Protective Case'],
        borrowingConditions: ['Return before exam session ends']
    }
];

const initialKits = [
    {
        id: 'kit-1',
        name: 'Complete Reel Production Kit',
        tagline: 'Camera + Fluid Head Tripod + Dual Wireless Mics + Video Light',
        dailyCharge: 280,
        deposit: 500,
        status: 'Available',
        itemsIncluded: [
            'Sony Alpha A7 III 4K Camera',
            'Heavy Duty Fluid Head Tripod',
            'Rode Wireless GO II Dual Mics',
            'Godox SL-60W LED Video Light'
        ]
    }
];

const initialBorrowings = [
    {
        id: 'bor-101',
        resourceId: 'res-1',
        title: 'Sony Alpha A7 III 4K Mirrorless Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        borrowerName: 'Aditya Sharma',
        startDate: '2026-08-27',
        endDate: '2026-08-29',
        dueTimestamp: Date.now() + 18 * 3600 * 1000 + 24 * 60 * 1000,
        stage: 'Borrowed (Active)',
        dailyCharge: 200,
        platformFee: 20,
        deposit: 500,
        handoverConfirmed: true,
        conditionBefore: { body: 'Excellent', screen: 'Excellent', lens: 'Excellent', accessories: 'Complete' },
        conditionAfter: null,
        damageReported: false,
        damageDeduction: 0,
        settled: false,
        disputed: false,
        rated: false
    }
];

const initialDisputes = [
    {
        id: 'disp-204',
        borrowingId: 'bor-101',
        itemTitle: 'Sony Alpha Camera body scratch',
        borrower: 'Aditya Sharma',
        owner: 'Priya Patel',
        amount: 300,
        status: 'Under Review',
        reason: 'Scratch report deduction dispute',
        ownerEvidence: 'Body scratch detected near lens mount',
        borrowerResponse: 'Scratch was pre-existing before handover'
    }
];

const initialUsers = [
    { id: 'u1', name: 'Aditya Sharma', dept: 'Computer Science', year: '4th Year', trust: 94, exchanges: 47, status: 'Verified', disputes: 0 },
    { id: 'u2', name: 'Priya Patel', dept: 'Media & Design', year: '3rd Year', trust: 98, exchanges: 32, status: 'Verified', disputes: 0 },
    { id: 'u3', name: 'Rohan Verma', dept: 'Computer Science', year: '2nd Year', trust: 91, exchanges: 19, status: 'Verified', disputes: 0 },
    { id: 'u4', name: 'Ananya Roy', dept: 'Electrical Engg', year: '3rd Year', trust: 88, exchanges: 14, status: 'Verified', disputes: 0 },
    { id: 'u5', name: 'Vikram Singh', dept: 'Mechanical Engg', year: '4th Year', trust: 85, exchanges: 9, status: 'Verified', disputes: 1 },
    { id: 'u6', name: 'Sneha Rao', dept: 'Biotech Dept', year: '3rd Year', trust: 96, exchanges: 28, status: 'Verified', disputes: 0 },
    { id: 'u7', name: 'Karan Mehra', dept: 'Mechanical Engg', year: '1st Year', trust: 78, exchanges: 5, status: 'Pending Review', disputes: 2 }
];

const initialAuditLogs = [
    { id: 'log-1', action: 'Verified Student User', target: 'Aditya Sharma', timestamp: '10 mins ago', result: 'Verified Badge Issued' },
    { id: 'log-2', action: 'Approved Resource Listing', target: 'Sony Alpha Camera', timestamp: '2 hours ago', result: 'Published to Directory' },
    { id: 'log-3', action: 'Resolved Dispute #204', target: 'Dispute #204', timestamp: '1 day ago', result: 'Approved ₹200 Damage Settlement' }
];

const initialImpact = {
    moneySaved: 48250,
    resourcesReused: 462,
    successfulExchanges: 3920,
    onTimeReturnsPercent: 94.8,
    wasteAvoidedKg: 317
};

export const useCircularStore = create(
    persist(
        (set, get) => ({
            persona: 'borrower',
            demoStep: 0,
            resources: initialResources,
            kits: initialKits,
            borrowings: initialBorrowings,
            disputes: initialDisputes,
            users: initialUsers,
            auditLogs: initialAuditLogs,
            impact: initialImpact,
            savedResourceIds: ['res-1'],
            userTrustScore: 94,
            lenderEarnings: 1450,
            borrowerPersonalSavings: 2840,
            notificationsCount: 3,

            setPersona: (newPersona) => set({ persona: newPersona }),
            setDemoStep: (step) => set({ demoStep: step }),

            advanceDemo: () => {
                const current = get().demoStep;
                const nextStep = (current + 1) % 15;
                set({ demoStep: nextStep });

                if (nextStep >= 5 && nextStep <= 6) {
                    set({ persona: 'owner' });
                } else if (nextStep >= 14) {
                    set({ persona: 'admin' });
                } else {
                    set({ persona: 'borrower' });
                }
            },

            // Admin verify student
            verifyStudentUser: (userId) => set((state) => {
                const target = state.users.find(u => u.id === userId);
                return {
                    users: state.users.map(u => u.id === userId ? { ...u, status: 'Verified' } : u),
                    auditLogs: [
                        { id: `log-${Date.now()}`, action: 'Verified Student User', target: target ? target.name : 'Student', timestamp: 'Just now', result: 'Verified Badge Issued' },
                        ...state.auditLogs
                    ]
                };
            }),

            // Admin suspend user
            suspendStudentUser: (userId) => set((state) => {
                const target = state.users.find(u => u.id === userId);
                return {
                    users: state.users.map(u => u.id === userId ? { ...u, status: 'Suspended' } : u),
                    auditLogs: [
                        { id: `log-${Date.now()}`, action: 'Suspended Student Account', target: target ? target.name : 'Student', timestamp: 'Just now', result: 'Access Restricted' },
                        ...state.auditLogs
                    ]
                };
            }),

            // Admin approve resource
            approveResourceListing: (resourceId) => set((state) => ({
                resources: state.resources.map(r => r.id === resourceId ? { ...r, moderationStatus: 'Approved' } : r)
            })),

            // Admin override dispute settlement
            overrideAdminSettlement: (disputeId, approvedCost) => set((state) => {
                const targetDispute = state.disputes.find(d => d.id === disputeId);
                return {
                    disputes: state.disputes.map(d =>
                        d.id === disputeId ? { ...d, status: 'Settled & Closed', amount: approvedCost } : d
                    ),
                    borrowings: state.borrowings.map(b =>
                        targetDispute && b.id === targetDispute.borrowingId ? {
                            ...b,
                            stage: 'Returned',
                            disputed: false,
                            damageDeduction: approvedCost
                        } : b
                    ),
                    auditLogs: [
                        { id: `log-${Date.now()}`, action: `Resolved ${disputeId}`, target: disputeId, timestamp: 'Just now', result: `Approved ₹${approvedCost} Settlement Override` },
                        ...state.auditLogs
                    ]
                };
            }),

            // Admin send overdue reminder
            sendOverdueReminder: (borrowingId) => set((state) => ({
                notificationsCount: state.notificationsCount + 1,
                auditLogs: [
                    { id: `log-${Date.now()}`, action: 'Sent Overdue Reminder', target: borrowingId, timestamp: 'Just now', result: 'Notification Pushed' },
                    ...state.auditLogs
                ]
            })),

            toggleSaveResource: (resourceId) => set((state) => {
                const isSaved = state.savedResourceIds.includes(resourceId);
                return {
                    savedResourceIds: isSaved
                        ? state.savedResourceIds.filter(id => id !== resourceId)
                        : [...state.savedResourceIds, resourceId]
                };
            }),

            requestExtension: (borrowingId, newReturnDate, extraFee) => set((state) => ({
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? {
                        ...b,
                        endDate: newReturnDate,
                        extensionRequested: true,
                        dueTimestamp: b.dueTimestamp + 24 * 3600 * 1000
                    } : b
                )
            })),

            cancelBorrowRequest: (borrowingId) => set((state) => ({
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? { ...b, stage: 'Cancelled' } : b
                )
            })),

            addLenderResource: (resourceData) => set((state) => ({
                resources: [
                    {
                        id: `res-${Date.now()}`,
                        status: 'Available',
                        moderationStatus: 'Approved',
                        rating: 5.0,
                        reviewsCount: 1,
                        distanceKm: 0.5,
                        owner: {
                            name: 'Priya Patel',
                            department: 'Media & Design',
                            trustScore: 98,
                            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                        },
                        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'],
                        location: 'Media Center Block B, Room 204',
                        accessories: ['Power Adapter', 'Carrying Pouch'],
                        borrowingConditions: ['Handle with care'],
                        ...resourceData
                    },
                    ...state.resources
                ]
            })),

            addEquipmentKit: (kitData) => set((state) => ({
                kits: [
                    {
                        id: `kit-${Date.now()}`,
                        status: 'Available',
                        ...kitData
                    },
                    ...state.kits
                ]
            })),

            toggleResourceAvailability: (resourceId) => set((state) => ({
                resources: state.resources.map(r =>
                    r.id === resourceId ? { ...r, status: r.status === 'Available' ? 'Unavailable' : 'Available' } : r
                )
            })),

            createBorrowRequest: (requestData) => set((state) => {
                const newBorrowing = {
                    id: `bor-${Date.now()}`,
                    stage: 'Requested',
                    dueTimestamp: Date.now() + 48 * 3600 * 1000,
                    handoverConfirmed: false,
                    conditionBefore: { body: 'Excellent', screen: 'Excellent', lens: 'Excellent', accessories: 'Complete' },
                    conditionAfter: null,
                    damageReported: false,
                    damageDeduction: 0,
                    settled: false,
                    disputed: false,
                    rated: false,
                    borrowerName: 'Aditya Sharma',
                    ...requestData
                };
                return {
                    borrowings: [newBorrowing, ...state.borrowings],
                    notificationsCount: state.notificationsCount + 1
                };
            }),

            acceptBorrowRequest: (borrowingId) => set((state) => ({
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? { ...b, stage: 'Accepted' } : b
                )
            })),

            confirmHandover: (borrowingId) => set((state) => ({
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? {
                        ...b,
                        stage: 'Borrowed (Active)',
                        handoverConfirmed: true,
                        dueTimestamp: Date.now() + 18 * 3600 * 1000 + 24 * 60 * 1000
                    } : b
                )
            })),

            returnResource: (borrowingId, conditionAfter, damageDeduction = 0) => set((state) => ({
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? {
                        ...b,
                        stage: 'Returned',
                        conditionAfter,
                        damageDeduction,
                        damageReported: damageDeduction > 0
                    } : b
                )
            })),

            reportLenderDamage: (borrowingId, damageType, description, cost) => set((state) => ({
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? {
                        ...b,
                        damageReported: true,
                        damageDeduction: cost,
                        damageNotes: `${damageType}: ${description}`
                    } : b
                )
            })),

            raiseDispute: (borrowingId, reason = 'Disputed damage charge') => set((state) => {
                const targetBorrowing = state.borrowings.find(b => b.id === borrowingId);
                const newDispute = {
                    id: `disp-${Date.now()}`,
                    borrowingId,
                    itemTitle: targetBorrowing ? targetBorrowing.title : 'Shared Resource',
                    borrower: 'Aditya Sharma',
                    owner: 'Priya Patel',
                    amount: targetBorrowing ? targetBorrowing.damageDeduction || 300 : 300,
                    status: 'Under Review',
                    reason,
                    ownerEvidence: 'Body scratch detected near lens mount',
                    borrowerResponse: 'Scratch was pre-existing before handover'
                };
                return {
                    disputes: [newDispute, ...state.disputes],
                    borrowings: state.borrowings.map(b =>
                        b.id === borrowingId ? { ...b, stage: 'Under Review', disputed: true } : b
                    )
                };
            }),

            resolveAdminDispute: (disputeId) => set((state) => {
                const targetDispute = state.disputes.find(d => d.id === disputeId);
                return {
                    disputes: state.disputes.map(d =>
                        d.id === disputeId ? { ...d, status: 'Settled & Closed' } : d
                    ),
                    borrowings: state.borrowings.map(b =>
                        targetDispute && b.id === targetDispute.borrowingId ? { ...b, stage: 'Returned', disputed: false } : b
                    )
                };
            }),

            settleTransaction: (borrowingId) => set((state) => ({
                lenderEarnings: state.lenderEarnings + 200,
                borrowings: state.borrowings.map((b) =>
                    b.id === borrowingId ? { ...b, stage: 'Settled & Refunded', settled: true } : b
                )
            })),

            submitRating: (borrowingId, ratingVal, reviewText) => set((state) => {
                const updatedTrust = Math.min(100, state.userTrustScore + 1);
                return {
                    borrowings: state.borrowings.map((b) =>
                        b.id === borrowingId ? { ...b, stage: 'Completed & Rated', rated: true, ratingScore: ratingVal, reviewText } : b
                    ),
                    userTrustScore: updatedTrust,
                    borrowerPersonalSavings: state.borrowerPersonalSavings + 200,
                    impact: {
                        ...state.impact,
                        successfulExchanges: state.impact.successfulExchanges + 1,
                        resourcesReused: state.impact.resourcesReused + 1,
                        moneySaved: state.impact.moneySaved + 200
                    }
                };
            }),

            resetDemoState: () => set({
                persona: 'borrower',
                demoStep: 0,
                resources: initialResources,
                kits: initialKits,
                borrowings: initialBorrowings,
                disputes: initialDisputes,
                users: initialUsers,
                auditLogs: initialAuditLogs,
                impact: initialImpact,
                savedResourceIds: ['res-1'],
                userTrustScore: 94,
                lenderEarnings: 1450,
                borrowerPersonalSavings: 2840
            })
        }),
        {
            name: 'campus-circular-storage'
        }
    )
);

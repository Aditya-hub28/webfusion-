// Comprehensive mock dataset synthesizing ShareNet, Leihs, Shelf, and AI Smart Match features

export const mockUsers = [
    {
        id: 'u1',
        fullName: 'Aditya Sharma',
        email: 'aditya.sharma@campus.edu',
        role: 'admin',
        college: 'Indian Institute of Technology',
        department: 'Computer Science & Engineering',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        trustScore: 4.95,
        trustLevel: 'Platinum Member',
        totalTransactions: 48,
        successfulReturns: 48,
        disputesInvolved: 0,
        badge: 'Verified Admin'
    },
    {
        id: 'u2',
        fullName: 'Priya Patel',
        email: 'priya.p@campus.edu',
        role: 'student',
        college: 'IIT Dept of Design',
        department: 'Media & Design',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        trustScore: 4.8,
        trustLevel: 'Gold Member',
        totalTransactions: 32,
        successfulReturns: 31,
        disputesInvolved: 0,
        badge: 'Top Lender'
    },
    {
        id: 'u3',
        fullName: 'Rohan Verma',
        email: 'rohan.v@campus.edu',
        role: 'student',
        college: 'School of Robotics',
        department: 'Electrical Engineering',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        trustScore: 4.65,
        trustLevel: 'Silver Member',
        totalTransactions: 19,
        successfulReturns: 18,
        disputesInvolved: 1,
        badge: 'Verified Student'
    }
];

export const mockLocations = [
    { id: 'loc-1', building: 'Media Center Block B', room: 'Lab 204', cabinet: 'Rack 3, Shelf B' },
    { id: 'loc-2', building: 'Innovation Hub', room: 'Robotics Workshop 101', cabinet: 'Tool Locker 5' },
    { id: 'loc-3', building: 'Central Library', room: 'Digital Resource Room', cabinet: 'Locker C-12' },
    { id: 'loc-4', building: 'Hostel Block 4', room: 'Common Equipment Room', cabinet: 'Shelf 1' }
];

export const mockItems = [
    {
        id: 'item-101',
        title: 'Sony Alpha A7 III 4K Camera + 24-70mm Lens',
        category: 'Electronics',
        subcategory: 'Photography & Video',
        description: 'Professional 24.2MP full-frame mirrorless camera with 4K HDR video capabilities. Ideal for film projects and events.',
        dailyRate: 0, // Free borrowing for campus members
        securityDeposit: 1500,
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'],
        owner: mockUsers[1],
        status: 'Available',
        condition: 'Pristine',
        assetTag: 'SHLF-CAM-0091',
        qrCode: 'SHARENET-QR-CAM-0091',
        location: mockLocations[0],
        trustRequirement: 4.5,
        tags: ['camera', 'sony', '4k', 'photography', 'video', 'lens'],
        availableDates: ['2026-08-27', '2026-08-28', '2026-08-29', '2026-08-30'],
        specifications: {
            resolution: '4K HDR',
            sensor: 'Full Frame 24.2MP',
            accessoriesIncluded: '2x Batteries, 128GB SD Card, Charger, Carrying Case'
        }
    },
    {
        id: 'item-102',
        title: 'Arduino & Raspberry Pi Robotics Prototyping Kit',
        category: 'Electronics',
        subcategory: 'Robotics & Microcontrollers',
        description: 'Complete embedded kit containing Raspberry Pi 4 (8GB), Arduino Uno R3, 30+ sensors, servo motors, and breadboards.',
        dailyRate: 0,
        securityDeposit: 800,
        images: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80'],
        owner: mockUsers[0],
        status: 'Available',
        condition: 'Good',
        assetTag: 'SHLF-ROB-0142',
        qrCode: 'SHARENET-QR-ROB-0142',
        location: mockLocations[1],
        trustRequirement: 4.0,
        tags: ['arduino', 'raspberry pi', 'robotics', 'sensors', 'electronics', 'iot'],
        availableDates: ['2026-08-27', '2026-08-28', '2026-08-31'],
        specifications: {
            processor: 'Raspberry Pi 4B 8GB + Arduino Uno',
            sensorsCount: '34 Digital & Analog Sensors',
            accessoriesIncluded: 'Jumper Wires, Motor Driver, OLED Display'
        }
    },
    {
        id: 'item-103',
        title: 'Rode Wireless GO II Compact Dual Microphone System',
        category: 'Electronics',
        subcategory: 'Audio Equipment',
        description: 'Dual channel wireless microphone system for crystal-clear audio recording. Works with cameras and smartphones.',
        dailyRate: 0,
        securityDeposit: 500,
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'],
        owner: mockUsers[1],
        status: 'Available',
        condition: 'Pristine',
        assetTag: 'SHLF-AUD-0054',
        qrCode: 'SHARENET-QR-AUD-0054',
        location: mockLocations[0],
        trustRequirement: 4.2,
        tags: ['audio', 'microphone', 'rode', 'wireless', 'podcast', 'vlog'],
        availableDates: ['2026-08-27', '2026-08-28', '2026-08-29'],
        specifications: {
            range: '200m line of sight',
            batteryLife: '7 hours',
            accessoriesIncluded: '2 Transmitters, 1 Receiver, Lavalier Mics, Cables'
        }
    },
    {
        id: 'item-104',
        title: 'DJI Mavic 3 Pro 4K Drone with Fly More Combo',
        category: 'Electronics',
        subcategory: 'Drones & Aerial',
        description: 'Triple-camera aerial drone with 4K/60fps video capability, 43 min flight time, and omnidirectional obstacle sensing.',
        dailyRate: 0,
        securityDeposit: 3000,
        images: ['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&auto=format&fit=crop&q=80'],
        owner: mockUsers[0],
        status: 'Available',
        condition: 'Pristine',
        assetTag: 'SHLF-DRN-0012',
        qrCode: 'SHARENET-QR-DRN-0012',
        location: mockLocations[2],
        trustRequirement: 4.8,
        tags: ['drone', 'dji', 'aerial', '4k', 'mavic'],
        availableDates: ['2026-08-28', '2026-08-29', '2026-08-30'],
        specifications: {
            camera: 'Hasselblad 4/3 CMOS',
            flightTime: '43 mins per battery',
            accessoriesIncluded: 'Smart Controller, 3 Batteries, ND Filters'
        }
    }
];

export const mockKits = [
    {
        id: 'kit-01',
        name: 'Film Production Master Kit',
        tagline: 'Complete 4K Camera + Wireless Mic + Lighting Studio Pack',
        description: 'All-in-one equipment kit curated for short film projects, documentary shoots, and high-end video creation on campus.',
        category: 'Media Production',
        location: mockLocations[0],
        qrCode: 'SHARENET-KIT-FILM-01',
        totalItemsCount: 4,
        itemsIncluded: [
            'Sony Alpha A7 III 4K Camera',
            'Rode Wireless GO II Dual Mics',
            'Godox SL-60W LED Video Light',
            'Heavy Duty Fluid Head Tripod'
        ],
        trustRequirement: 4.7,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'kit-02',
        name: 'Autonomous Robotics & AI Prototyping Kit',
        tagline: 'Raspberry Pi + Arduino + LiDar Sensor + Motor Drivers',
        description: 'Advanced prototyping suite for robotics competitions, autonomous navigation projects, and IoT research.',
        category: 'Engineering & Robotics',
        location: mockLocations[1],
        qrCode: 'SHARENET-KIT-ROB-02',
        totalItemsCount: 5,
        itemsIncluded: [
            'Raspberry Pi 4 (8GB RAM)',
            '2D RPLIDAR A1 Scanner',
            'Dual Motor Controller 30A',
            'Ultrasonic & Infrared Sensor Suite',
            'Rechargeable LiPo Battery Pack'
        ],
        trustRequirement: 4.4,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'kit-03',
        name: 'Podcast & Audio Broadcast Suite',
        tagline: 'Multi-host Recording Setup with USB Audio Interface',
        description: 'Professional multi-host podcasting equipment kit featuring XLR condenser microphones, boom arms, and headphones.',
        category: 'Audio & Music',
        location: mockLocations[2],
        qrCode: 'SHARENET-KIT-AUD-03',
        totalItemsCount: 4,
        itemsIncluded: [
            'Focusrite Scarlett 4i4 Audio Interface',
            '2x Audio-Technica AT2020 XLR Mics',
            '2x Studio Monitor Headphones',
            'Adjustable Desktop Boom Arms'
        ],
        trustRequirement: 4.2,
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80'
    }
];

export const mockReservations = [
    {
        id: 'res-901',
        itemOrKitName: 'Sony Alpha A7 III 4K Camera + 24-70mm Lens',
        type: 'Item',
        borrower: mockUsers[2],
        owner: mockUsers[1],
        startDate: '2026-08-27',
        endDate: '2026-08-29',
        purpose: 'Annual Campus Cultural Fest Film Coverage',
        status: 'Active Lending',
        pickupLocation: 'Media Center Block B, Lab 204',
        returnDueDate: '2026-08-29 17:00',
        assetTag: 'SHLF-CAM-0091',
        qrCode: 'SHARENET-QR-CAM-0091',
        conditionPreBorrow: 'Pristine (No scratches, all 2 batteries charged)',
        conditionPostBorrow: null
    },
    {
        id: 'res-902',
        itemOrKitName: 'Autonomous Robotics & AI Prototyping Kit',
        type: 'Kit',
        borrower: mockUsers[1],
        owner: mockUsers[0],
        startDate: '2026-08-30',
        endDate: '2026-09-02',
        purpose: 'National Hackathon Project Showcase',
        status: 'Approved & Scheduled',
        pickupLocation: 'Innovation Hub, Robotics Workshop 101',
        returnDueDate: '2026-09-02 18:00',
        assetTag: 'SHLF-KIT-ROB-02',
        qrCode: 'SHARENET-KIT-ROB-02',
        conditionPreBorrow: 'Good (Verified by Lab Tech)',
        conditionPostBorrow: null
    }
];

export const mockConditionLogs = [
    {
        id: 'cond-1',
        assetTag: 'SHLF-CAM-0091',
        itemName: 'Sony Alpha A7 III 4K Camera',
        loggedBy: 'Priya Patel (Owner)',
        timestamp: '2026-08-27 09:30 AM',
        rating: 'Pristine',
        notes: 'Pre-borrow inspection complete. Lens glass clean, sensor spotless, 2 original Sony batteries included.',
        photos: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80']
    }
];

export const mockDisputes = [
    {
        id: 'disp-01',
        itemTitle: 'DSLR Tripod Stand',
        reporterName: 'Rohan Verma',
        respondentName: 'Ankit Mehta',
        reason: 'Minor leg lock loose upon return',
        status: 'Under Admin Review',
        date: '2026-08-25',
        trustScoreImpact: '-0.1 pts pending verification'
    }
];

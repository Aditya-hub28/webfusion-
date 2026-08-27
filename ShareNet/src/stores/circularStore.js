import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const priyaOwner = {
    name: 'Priya Patel',
    department: 'Media & Design',
    trustScore: 98,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
};

const make5Photos = (baseImg, alt1, alt2, alt3, alt4) => [
    baseImg,
    alt1 || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    alt2 || 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
    alt3 || 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
    alt4 || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'
];

const initialResources = [
    // --- 1. ELECTRONICS & TECH (10 Items) ---
    {
        id: 'res-1',
        title: 'Sony Alpha A7 III 4K Mirrorless Camera',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 1.2,
        dailyCharge: 200,
        deposit: 500,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 38,
        images: make5Photos(
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
            'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800'
        ),
        location: 'Media Center Block B, Room 204',
        owner: priyaOwner,
        accessories: ['2x Batteries', '128GB SD Card', 'Camera Strap', 'Carrying Bag'],
        borrowingConditions: ['Return before 6 PM on due date']
    },
    {
        id: 'res-e2',
        title: 'Apple MacBook Pro M2 (16GB RAM, 512GB SSD)',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.5,
        dailyCharge: 350,
        deposit: 1000,
        platformFee: 30,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.95,
        reviewsCount: 42,
        images: make5Photos(
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['96W USB-C Charger', 'Laptop Sleeve'],
        borrowingConditions: ['Do not format system OS']
    },
    {
        id: 'res-e3',
        title: 'Apple iPad Air 5th Gen with Apple Pencil 2',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.7,
        dailyCharge: 180,
        deposit: 600,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 29,
        images: make5Photos(
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800',
            'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800',
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
            'https://images.unsplash.com/photo-1589739900243-4b52cd9b1048?w=800'
        ),
        location: 'Library Block C',
        owner: priyaOwner,
        accessories: ['Apple Pencil 2', 'Smart Folio Case', 'Type-C Charger'],
        borrowingConditions: ['Keep screen protector clean']
    },
    {
        id: 'res-e4',
        title: 'Anker 24,000mAh Power Bank (140W Fast Charge)',
        category: 'Electronics',
        condition: 'Excellent',
        distanceKm: 0.3,
        dailyCharge: 40,
        deposit: 150,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 50,
        images: make5Photos(
            'https://images.unsplash.com/photo-1609592424074-27515cfb2a6a?w=800',
            'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800',
            'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
        ),
        location: 'Media Center Block B',
        owner: priyaOwner,
        accessories: ['100W Braided Cable'],
        borrowingConditions: ['Charge fully before return']
    },
    {
        id: 'res-e5',
        title: 'Wacom Intuos Pro Creative Drawing Tablet',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.6,
        dailyCharge: 120,
        deposit: 400,
        platformFee: 15,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.85,
        reviewsCount: 18,
        images: make5Photos(
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
            'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800',
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800',
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'
        ),
        location: 'Design Studio Lab 4',
        owner: priyaOwner,
        accessories: ['Pro Pen 2', 'Pen Stand', 'Nib Replacements'],
        borrowingConditions: ['Use on clean flat surface']
    },
    {
        id: 'res-e6',
        title: 'Bose QuietComfort 45 Wireless ANC Headphones',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.8,
        dailyCharge: 90,
        deposit: 300,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.92,
        reviewsCount: 31,
        images: make5Photos(
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
            'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Carrying Case', 'Audio Cable', 'Type-C Cable'],
        borrowingConditions: ['Sanitize earcups after use']
    },
    {
        id: 'res-e7',
        title: 'DJI Mini 3 Pro 4K Camera Drone Kit',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 1.1,
        dailyCharge: 300,
        deposit: 800,
        platformFee: 30,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.97,
        reviewsCount: 25,
        images: make5Photos(
            'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800',
            'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
            'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
            'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800',
            'https://images.unsplash.com/photo-1533558701576-23c65e0272fb?w=800'
        ),
        location: 'Media Center Block B',
        owner: priyaOwner,
        accessories: ['DJI RC Controller', '3x Flight Batteries', 'ND Filter Set', 'Hard Case'],
        borrowingConditions: ['Fly only in designated campus open zones']
    },
    {
        id: 'res-e8',
        title: 'Raspberry Pi 4 Model B (8GB RAM) Starter Kit',
        category: 'Electronics',
        condition: 'Excellent',
        distanceKm: 0.4,
        dailyCharge: 50,
        deposit: 200,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.8,
        reviewsCount: 16,
        images: make5Photos(
            'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800'
        ),
        location: 'Robotics Lab Block C',
        owner: priyaOwner,
        accessories: ['64GB SD Card', 'Case with Fan', 'Power Adapter', 'Micro HDMI Cable'],
        borrowingConditions: ['Handle GPIO pins with anti-static care']
    },
    {
        id: 'res-e9',
        title: 'GoPro HERO 11 Black 5.3K Action Camera',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.9,
        dailyCharge: 150,
        deposit: 500,
        platformFee: 15,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.89,
        reviewsCount: 34,
        images: make5Photos(
            'https://images.unsplash.com/photo-1564466809058-bf81182fe921?w=800',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'
        ),
        location: 'Media Center Block B',
        owner: priyaOwner,
        accessories: ['Head Strap', 'Chest Mount', 'Waterproof Housing', '2x Enduro Batteries'],
        borrowingConditions: ['Clean lens housing after outdoor use']
    },
    {
        id: 'res-e10',
        title: 'Elgato Stream Deck MK.2 (15 Macro Keys)',
        category: 'Electronics',
        condition: 'Pristine',
        distanceKm: 0.6,
        dailyCharge: 70,
        deposit: 250,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.87,
        reviewsCount: 20,
        images: make5Photos(
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Desktop Stand', 'USB-C Cable'],
        borrowingConditions: ['Return with original cable']
    },

    // --- 2. EVENT & AV EQUIPMENT (10 Items) ---
    {
        id: 'res-7',
        title: 'Epson Full HD 1080p Portable LED Projector',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 160,
        deposit: 450,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.96,
        reviewsCount: 45,
        images: make5Photos(
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
            'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800',
            'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800',
            'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800'
        ),
        location: 'Management Block Room 104',
        owner: priyaOwner,
        accessories: ['HDMI Cable', 'Remote Control', 'Power Cord'],
        borrowingConditions: ['Keep lens cover on during transport']
    },
    {
        id: 'res-a2',
        title: 'Boya BY-M1 Lavalier Omnidirectional Mic Pair',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 0.3,
        dailyCharge: 40,
        deposit: 150,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.82,
        reviewsCount: 28,
        images: make5Photos(
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'
        ),
        location: 'Media Center Block B',
        owner: priyaOwner,
        accessories: ['2x Foam Windscreens', 'Carrying Pouch'],
        borrowingConditions: ['Handle 6m cables gently without twisting']
    },
    {
        id: 'res-a3',
        title: 'Godox SL-60W 60W LED Video Studio Light',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 0.7,
        dailyCharge: 110,
        deposit: 350,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.91,
        reviewsCount: 37,
        images: make5Photos(
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'
        ),
        location: 'Media Center Studio 1',
        owner: priyaOwner,
        accessories: ['Bowens Mount Reflector', 'Remote Control', 'Light Stand'],
        borrowingConditions: ['Allow COB bulb to cool before packing']
    },
    {
        id: 'res-a4',
        title: '100-Inch Portable Tripod Projection Screen',
        category: 'Event & AV',
        condition: 'Excellent',
        distanceKm: 0.9,
        dailyCharge: 70,
        deposit: 250,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.79,
        reviewsCount: 19,
        images: make5Photos(
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800',
            'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800',
            'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800'
        ),
        location: 'Auditorium Store Room',
        owner: priyaOwner,
        accessories: ['Tripod Stand', 'Carrying Bag'],
        borrowingConditions: ['Do not touch screen matte surface']
    },
    {
        id: 'res-2',
        title: 'Heavy Duty Fluid Head DSLR Tripod',
        category: 'Event & AV',
        condition: 'Excellent',
        distanceKm: 0.8,
        dailyCharge: 50,
        deposit: 200,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.8,
        reviewsCount: 19,
        images: make5Photos(
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
            'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800'
        ),
        location: 'Hostel Block 3, Room 112',
        owner: priyaOwner,
        accessories: ['Quick Release Plate', 'Carrying Case'],
        borrowingConditions: ['Ensure leg locks are tightened properly']
    },
    {
        id: 'res-a6',
        title: 'JBL PartyBox 110 Bluetooth Party Speaker (160W)',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 1.2,
        dailyCharge: 220,
        deposit: 600,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.94,
        reviewsCount: 51,
        images: make5Photos(
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'
        ),
        location: 'Student Club Hub Block D',
        owner: priyaOwner,
        accessories: ['Power Cable', 'Wired Mic'],
        borrowingConditions: ['Keep volume within campus noise regulation levels']
    },
    {
        id: 'res-a7',
        title: 'Soundcraft 8-Channel USB Audio Mixer Console',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 0.8,
        dailyCharge: 130,
        deposit: 400,
        platformFee: 15,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 22,
        images: make5Photos(
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'
        ),
        location: 'Audio Studio Block A',
        owner: priyaOwner,
        accessories: ['Power Adapter', '2x XLR Cables', 'USB Output Cable'],
        borrowingConditions: ['Keep gain knobs centered']
    },
    {
        id: 'res-a8',
        title: 'Neewer Octagon Softbox Lighting Kit (Set of 2)',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 0.5,
        dailyCharge: 95,
        deposit: 300,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.86,
        reviewsCount: 30,
        images: make5Photos(
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800'
        ),
        location: 'Media Center Studio 2',
        owner: priyaOwner,
        accessories: ['2x 2M Light Stands', '2x Softbox Covers', 'Diffuser Cloths'],
        borrowingConditions: ['Fold softboxes carefully after use']
    },
    {
        id: 'res-a9',
        title: 'Chauvet DJ 500W Portable Stage Fog Machine',
        category: 'Event & AV',
        condition: 'Good',
        distanceKm: 1.4,
        dailyCharge: 80,
        deposit: 250,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.75,
        reviewsCount: 15,
        images: make5Photos(
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800'
        ),
        location: 'Cultural Fest Store',
        owner: priyaOwner,
        accessories: ['Wired Remote', '1L Fog Fluid Bottle'],
        borrowingConditions: ['Use only provided water-based fog fluid']
    },
    {
        id: 'res-a10',
        title: 'Wireless Presentation Clicker with Green Laser',
        category: 'Event & AV',
        condition: 'Pristine',
        distanceKm: 0.2,
        dailyCharge: 25,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 44,
        images: make5Photos(
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'
        ),
        location: 'Media Center Block B',
        owner: priyaOwner,
        accessories: ['USB Receiver', 'AAA Battery'],
        borrowingConditions: ['Return USB dongle safely inside clicker slot']
    },

    // --- 3. SPORTS & FITNESS (10 Items) ---
    {
        id: 'res-5',
        title: 'Cosco Kashmir Willow Cricket Bat Match Kit',
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
        images: make5Photos(
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
            'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800',
            'https://images.unsplash.com/photo-1593766788306-28561086694e?w=800',
            'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800'
        ),
        location: 'Sports Complex Locker 14',
        owner: priyaOwner,
        accessories: ['3x Leather Balls', 'Wooden Stumps', 'Leg Guard Pads'],
        borrowingConditions: ['Clean bat grip after use']
    },
    {
        id: 'res-s2',
        title: 'Yonex Astrox Badminton Racket Pair (Strung 26lbs)',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 45,
        deposit: 180,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.91,
        reviewsCount: 39,
        images: make5Photos(
            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
        ),
        location: 'Badminton Court Locker 3',
        owner: priyaOwner,
        accessories: ['Carrying Case', 'Tube of Mavis 350 Shuttles'],
        borrowingConditions: ['Do not drag racket on court floor']
    },
    {
        id: 'res-s3',
        title: 'Nivia Pro Match Football (Size 5 FIFA Approved)',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.3,
        dailyCharge: 30,
        deposit: 120,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 47,
        images: make5Photos(
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
            'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800'
        ),
        location: 'Hostel Ground',
        owner: priyaOwner,
        accessories: ['Ball Pump', 'Inflation Needle'],
        borrowingConditions: ['Return fully inflated']
    },
    {
        id: 'res-s4',
        title: 'Spalding TF-1000 Legacy Indoor Basketball',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.5,
        dailyCharge: 35,
        deposit: 150,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.93,
        reviewsCount: 32,
        images: make5Photos(
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
            'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
            'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800',
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800'
        ),
        location: 'Indoor Basketball Court',
        owner: priyaOwner,
        accessories: ['Mesh Ball Carry Bag'],
        borrowingConditions: ['Use on wooden/synthetic court only']
    },
    {
        id: 'res-s5',
        title: 'Decathlon Table Tennis Racket Set (2 Bats + 6 Balls)',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.2,
        dailyCharge: 30,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.84,
        reviewsCount: 26,
        images: make5Photos(
            'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800',
            'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800',
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
        ),
        location: 'Student Common Room',
        owner: priyaOwner,
        accessories: ['Padded Storage Case', '6x 3-Star Balls'],
        borrowingConditions: ['Keep rubber pads clean']
    },
    {
        id: 'res-s6',
        title: 'Boldfit Heavy Duty Resistance Bands Set (5 Tube Levels)',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 25,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.87,
        reviewsCount: 21,
        images: make5Photos(
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800',
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800'
        ),
        location: 'Hostel Gym Annex',
        owner: priyaOwner,
        accessories: ['Door Anchor', '2x Handles', '2x Ankle Straps', 'Carrying Bag'],
        borrowingConditions: ['Wipe clean after workout session']
    },
    {
        id: 'res-s7',
        title: 'Stag International Volleyball with Net Kit',
        category: 'Sports',
        condition: 'Excellent',
        distanceKm: 0.7,
        dailyCharge: 40,
        deposit: 150,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.8,
        reviewsCount: 17,
        images: make5Photos(
            'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800'
        ),
        location: 'Volleyball Court Store',
        owner: priyaOwner,
        accessories: ['Volleyball Net', 'Boundary Lines', 'Pump'],
        borrowingConditions: ['Roll net neatly back in bag']
    },
    {
        id: 'res-s8',
        title: 'Vector X 10mm Extra Thick Non-Slip Yoga Mat',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.3,
        dailyCharge: 20,
        deposit: 80,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 35,
        images: make5Photos(
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800',
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Carrying Strap'],
        borrowingConditions: ['Sanitize mat after yoga session']
    },
    {
        id: 'res-s9',
        title: 'Decathlon Quechua Anti-Shock Trekking Poles (Pair)',
        category: 'Sports',
        condition: 'Pristine',
        distanceKm: 0.9,
        dailyCharge: 35,
        deposit: 140,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.89,
        reviewsCount: 14,
        images: make5Photos(
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Rubber Baskets', 'Mud Caps'],
        borrowingConditions: ['Collapse locks before returning']
    },
    {
        id: 'res-s10',
        title: 'Kettlebell 12kg Cast Iron Weight',
        category: 'Sports',
        condition: 'Good',
        distanceKm: 0.5,
        dailyCharge: 30,
        deposit: 120,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.76,
        reviewsCount: 12,
        images: make5Photos(
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800',
            'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
            'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800'
        ),
        location: 'Hostel Gym Annex',
        owner: priyaOwner,
        accessories: ['Rubber Protective Base'],
        borrowingConditions: ['Do not drop directly on tiled flooring']
    },

    // --- 4. ACADEMIC & LAB TOOLS (10 Items) ---
    {
        id: 'res-8',
        title: 'Casio FX-991EX Classwiz Scientific Calculator',
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
        images: make5Photos(
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800'
        ),
        location: 'Architecture Studio 2',
        owner: priyaOwner,
        accessories: ['Hard Protective Case'],
        borrowingConditions: ['Return before exam session ends']
    },
    {
        id: 'res-c2',
        title: 'Mini Drafter & Engineering Drawing Board Set',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 30,
        deposit: 120,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 33,
        images: make5Photos(
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800'
        ),
        location: 'Engineering Drawing Hall B',
        owner: priyaOwner,
        accessories: ['A2 Wooden Drawing Board', 'Mini Drafter Clamp', 'Canvas Bag'],
        borrowingConditions: ['Keep scale arms unbent']
    },
    {
        id: 'res-c3',
        title: 'Arduino Uno R3 Ultimate Project Starter Kit',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.6,
        dailyCharge: 45,
        deposit: 180,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 29,
        images: make5Photos(
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800'
        ),
        location: 'Robotics Lab Block C',
        owner: priyaOwner,
        accessories: ['Breadboard', '30x Sensors', 'Jumper Wires', 'LCD Display', 'Component Box'],
        borrowingConditions: ['Return all resistor bands in compartment organizer']
    },
    {
        id: 'res-c4',
        title: 'Digital LCD Vernier Caliper (0-150mm Stainless Steel)',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.3,
        dailyCharge: 25,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.92,
        reviewsCount: 24,
        images: make5Photos(
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800'
        ),
        location: 'Mechanical Workshop 1',
        owner: priyaOwner,
        accessories: ['Hard Plastic Case', 'Spare LR44 Battery'],
        borrowingConditions: ['Turn off digital display after use']
    },
    {
        id: 'res-c5',
        title: 'Soldering Iron Station Kit (60W Temp Controlled)',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.5,
        dailyCharge: 35,
        deposit: 140,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.83,
        reviewsCount: 21,
        images: make5Photos(
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800'
        ),
        location: 'Electronics Lab Block C',
        owner: priyaOwner,
        accessories: ['Soldering Stand', 'Desoldering Pump', 'Lead-Free Solder Wire', '5x Tips'],
        borrowingConditions: ['Clean soldering tip with brass sponge before returning']
    },
    {
        id: 'res-c6',
        title: 'White Cotton Chemistry Lab Coat (Unisex Large)',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.1,
        dailyCharge: 15,
        deposit: 60,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.95,
        reviewsCount: 60,
        images: make5Photos(
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800',
            'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
        ),
        location: 'Chemistry Lab Block A',
        owner: priyaOwner,
        accessories: ['Safety Goggles'],
        borrowingConditions: ['Return washed and ironed']
    },
    {
        id: 'res-c7',
        title: 'Littmann Classic III Medical Stethoscope',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.7,
        dailyCharge: 60,
        deposit: 250,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.97,
        reviewsCount: 38,
        images: make5Photos(
            'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
        ),
        location: 'Biotech Dept Block D',
        owner: priyaOwner,
        accessories: ['Spare Eartips', 'Non-Chill Rim', 'Protective Pouch'],
        borrowingConditions: ['Sanitize earpieces with alcohol wipe']
    },
    {
        id: 'res-c8',
        title: 'Portable USB Digital Oscilloscope 20MHz (2-Channel)',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.8,
        dailyCharge: 85,
        deposit: 300,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.89,
        reviewsCount: 15,
        images: make5Photos(
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800'
        ),
        location: 'Hardware Lab Block C',
        owner: priyaOwner,
        accessories: ['2x Oscilloscope Probes', 'USB PC Cable'],
        borrowingConditions: ['Max input voltage 35V']
    },
    {
        id: 'res-c9',
        title: 'Dissection Kit Stainless Steel (11 Pieces Medical)',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 25,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.86,
        reviewsCount: 19,
        images: make5Photos(
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800',
            'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
        ),
        location: 'Zoology Lab Block D',
        owner: priyaOwner,
        accessories: ['Scalpel Handles', 'Scissors', 'Forceps', 'Storage Leather Case'],
        borrowingConditions: ['Clean and sterilize all blades post lab']
    },
    {
        id: 'res-c10',
        title: '1000x USB Digital Microscope HD with LED Stand',
        category: 'Academic',
        condition: 'Pristine',
        distanceKm: 0.6,
        dailyCharge: 50,
        deposit: 200,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.91,
        reviewsCount: 27,
        images: make5Photos(
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800',
            'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800'
        ),
        location: 'Biology Lab Block D',
        owner: priyaOwner,
        accessories: ['Metal Stand', 'Calibration Ruler', 'USB Cable'],
        borrowingConditions: ['Do not scratch optical lens']
    },

    // --- 5. CAMPING & OUTDOOR (10 Items) ---
    {
        id: 'res-6',
        title: 'Decathlon 4-Person Waterproof Camping Tent & Stove Kit',
        category: 'Camping',
        condition: 'Excellent',
        distanceKm: 2.1,
        dailyCharge: 150,
        deposit: 600,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 22,
        images: make5Photos(
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
            'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800',
            'https://images.unsplash.com/photo-1496545614020-c0fe1357c3a0?w=800'
        ),
        location: 'Hostel Block 1, Room 302',
        owner: priyaOwner,
        accessories: ['4 Sleeping Bags', 'Portable Gas Stove', 'Headlamp'],
        borrowingConditions: ['Ensure tent is dry before packing']
    },
    {
        id: 'res-t2',
        title: 'Wildcraft Camping Sleeping Bag (-5°C Rated)',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.8,
        dailyCharge: 40,
        deposit: 150,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.92,
        reviewsCount: 31,
        images: make5Photos(
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Compression Sack'],
        borrowingConditions: ['Use clean inner liner']
    },
    {
        id: 'res-t3',
        title: 'Quechua Forclaz 60L Waterproof Trekking Backpack',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.6,
        dailyCharge: 60,
        deposit: 250,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.95,
        reviewsCount: 40,
        images: make5Photos(
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Integrated Rain Cover'],
        borrowingConditions: ['Empty all pockets before return']
    },
    {
        id: 'res-t4',
        title: 'Coleman Portable Gas Barbecue Grill Stove',
        category: 'Camping',
        condition: 'Excellent',
        distanceKm: 1.3,
        dailyCharge: 90,
        deposit: 300,
        platformFee: 10,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.83,
        reviewsCount: 18,
        images: make5Photos(
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ),
        location: 'Campus Recreation Ground',
        owner: priyaOwner,
        accessories: ['Grill Tongs', 'Cleaning Brush', '2x Butane Canisters'],
        borrowingConditions: ['Scrub grill grate clean after use']
    },
    {
        id: 'res-t5',
        title: 'Folding Lightweight Camping Chairs (Pair)',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.5,
        dailyCharge: 35,
        deposit: 120,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.87,
        reviewsCount: 25,
        images: make5Photos(
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['2x Shoulder Storage Bags', 'Built-in Cup Holders'],
        borrowingConditions: ['Max weight capacity 110kg per chair']
    },
    {
        id: 'res-t6',
        title: 'LED Rechargeable 1000LM Waterproof Camping Lantern',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.3,
        dailyCharge: 25,
        deposit: 100,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.9,
        reviewsCount: 29,
        images: make5Photos(
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['USB-C Charging Cable', 'Hanging Hook'],
        borrowingConditions: ['Charge battery to 100% before returning']
    },
    {
        id: 'res-t7',
        title: 'Fastrack Heavy Duty Bicycle U-Lock & Cable Set',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.2,
        dailyCharge: 15,
        deposit: 80,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.94,
        reviewsCount: 55,
        images: make5Photos(
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
        ),
        location: 'Bicycle Stand Block A',
        owner: priyaOwner,
        accessories: ['2x Keys', 'Frame Mount Bracket'],
        borrowingConditions: ['Keep spare key safe']
    },
    {
        id: 'res-t8',
        title: 'Stanley Classic 1.4L Vacuum Insulated Flask',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.4,
        dailyCharge: 20,
        deposit: 90,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.96,
        reviewsCount: 33,
        images: make5Photos(
            'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['Insulated Lid Cup'],
        borrowingConditions: ['Rinse with warm water before returning']
    },
    {
        id: 'res-t9',
        title: 'Double Portable Nylon Camping Hammock with Tree Straps',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 0.7,
        dailyCharge: 30,
        deposit: 120,
        platformFee: 5,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.88,
        reviewsCount: 27,
        images: make5Photos(
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
        ),
        location: 'Campus Lawn Area',
        owner: priyaOwner,
        accessories: ['2x Heavy Duty Carabiners', '2x Tree Straps', 'Attached Pouch'],
        borrowingConditions: ['Tie only to sturdy trees']
    },
    {
        id: 'res-t10',
        title: 'Jackery Portable Power Station 300W Solar Generator',
        category: 'Camping',
        condition: 'Pristine',
        distanceKm: 1.5,
        dailyCharge: 200,
        deposit: 600,
        platformFee: 20,
        status: 'Available',
        moderationStatus: 'Approved',
        rating: 4.98,
        reviewsCount: 16,
        images: make5Photos(
            'https://images.unsplash.com/photo-1609592424074-27515cfb2a6a?w=800',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
        ),
        location: 'Hostel Block 2, Room 405',
        owner: priyaOwner,
        accessories: ['AC Wall Charger', 'Car Charger Cable', 'Solar Connector Cable'],
        borrowingConditions: ['Do not expose to rain or moisture']
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
        ],
        images: make5Photos(
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
        )
    },
    {
        id: 'kit-2',
        name: 'Podcast Studio Master Kit',
        tagline: 'Shure Studio Mic + Boya Wireless + Soundcraft 8-Ch Mixer + Boom Arms',
        dailyCharge: 220,
        deposit: 400,
        status: 'Available',
        itemsIncluded: [
            'Boya BY-M1 Lavalier Mics',
            'Soundcraft 8-Channel USB Audio Mixer',
            'Bose QC45 Headphones'
        ],
        images: make5Photos(
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'
        )
    },
    {
        id: 'kit-3',
        name: 'Tournament Cricket Team Match Kit',
        tagline: '2 Kashmir Willow Bats + 3 Leather Balls + Stumps + Full Protective Pads',
        dailyCharge: 120,
        deposit: 300,
        status: 'Available',
        itemsIncluded: [
            'Cosco Kashmir Willow Cricket Bat',
            '3x Match Leather Balls',
            'Leg Guard Pads & Stumps'
        ],
        images: make5Photos(
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
            'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
            'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800',
            'https://images.unsplash.com/photo-1593766788306-28561086694e?w=800',
            'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800'
        )
    },
    {
        id: 'kit-4',
        name: 'Wilderness Camping Trek Kit',
        tagline: '4-Person Tent + 2 Sleeping Bags + 60L Backpack + Portable Stove + Lantern',
        dailyCharge: 250,
        deposit: 500,
        status: 'Available',
        itemsIncluded: [
            'Decathlon 4-Person Camping Tent',
            'Wildcraft Sleeping Bag (-5°C)',
            'Quechua 60L Backpack',
            'Coleman BBQ Grill',
            '1000LM Lantern'
        ],
        images: make5Photos(
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
            'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800',
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
        )
    },
    {
        id: 'kit-5',
        name: 'Hackathon Presentation & AV Kit',
        tagline: 'Epson Full HD Projector + 100" Screen + JBL PartyBox Speaker + Clicker',
        dailyCharge: 310,
        deposit: 600,
        status: 'Available',
        itemsIncluded: [
            'Epson Full HD 1080p Projector',
            '100-Inch Tripod Screen',
            'JBL PartyBox 160W Speaker',
            'Wireless Presentation Clicker'
        ],
        images: make5Photos(
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800',
            'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800',
            'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800'
        )
    },
    {
        id: 'kit-6',
        name: 'Robotics & IoT Prototyping Kit',
        tagline: 'Arduino Uno Starter + Raspberry Pi 4 + Soldering Station + Caliper',
        dailyCharge: 140,
        deposit: 300,
        status: 'Available',
        itemsIncluded: [
            'Arduino Uno R3 Starter Kit',
            'Raspberry Pi 4 Model B (8GB)',
            'Soldering Iron Station Kit',
            'Digital Vernier Caliper'
        ],
        images: make5Photos(
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800',
            'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
            'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800',
            'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?w=800'
        )
    }
];

const initialBorrowings = [
    {
        id: 'bor-101',
        resourceId: 'res-1',
        title: 'Sony Alpha A7 III 4K Mirrorless Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
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
    },
    // --- 5 INCOMING BORROW REQUESTS FOR LENDER (PRIYA PATEL) ---
    {
        id: 'req-101',
        resourceId: 'res-1',
        title: 'Sony Alpha A7 III 4K Mirrorless Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        borrowerName: 'Rohan Verma',
        startDate: '2026-08-28',
        endDate: '2026-08-30',
        stage: 'Requested',
        dailyCharge: 200,
        platformFee: 20,
        deposit: 500,
        handoverConfirmed: false
    },
    {
        id: 'req-102',
        resourceId: 'res-e2',
        title: 'Epson Full HD 1080p Portable Projector',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        borrowerName: 'Neha Gupta',
        startDate: '2026-08-28',
        endDate: '2026-08-29',
        stage: 'Requested',
        dailyCharge: 220,
        platformFee: 20,
        deposit: 400,
        handoverConfirmed: false
    },
    {
        id: 'req-103',
        resourceId: 'res-e6',
        title: 'Bose QuietComfort 45 Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        borrowerName: 'Aniket Roy',
        startDate: '2026-08-29',
        endDate: '2026-09-01',
        stage: 'Requested',
        dailyCharge: 150,
        platformFee: 15,
        deposit: 300,
        handoverConfirmed: false
    },
    {
        id: 'req-104',
        resourceId: 'res-c1',
        title: 'Decathlon 4-Person Waterproof Camping Tent',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        borrowerName: 'Sneha Kulkarni',
        startDate: '2026-08-29',
        endDate: '2026-08-31',
        stage: 'Requested',
        dailyCharge: 250,
        platformFee: 20,
        deposit: 500,
        handoverConfirmed: false
    },
    {
        id: 'req-105',
        resourceId: 'res-s1',
        title: 'Cosco Kashmir Willow Cricket Bat Match Kit',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600',
        ownerName: 'Priya Patel',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        borrowerName: 'Vikram Singh',
        startDate: '2026-08-28',
        endDate: '2026-08-29',
        stage: 'Requested',
        dailyCharge: 120,
        platformFee: 10,
        deposit: 300,
        handoverConfirmed: false
    }
];

const initialDisputes = [
    {
        id: 'DSP-8821',
        itemTitle: 'MacBook Pro M2 (16GB RAM)',
        borrower: 'Rohan Verma',
        owner: 'Priya Patel',
        type: 'Late Return Penalty',
        amount: 150,
        status: 'Under Review (Admin Escrow Hold)',
        reason: 'Item returned 14 hours past the agreed deadline without prior extension notice.',
        evidencePhotos: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'
        ]
    },
    {
        id: 'DSP-8822',
        itemTitle: 'Sony Alpha A7 III 4K Camera',
        borrower: 'Siddharth Nair',
        owner: 'Priya Patel',
        type: 'Lens Body Scratch & Cosmetic Damage',
        amount: 350,
        status: 'Under Review (Admin Escrow Hold)',
        reason: 'Minor scratch on camera lens body detected during digital return inspection.',
        evidencePhotos: [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'
        ]
    },
    {
        id: 'DSP-8823',
        itemTitle: 'Full HD 1080p Portable Projector',
        borrower: 'Karan Mehta',
        owner: 'Priya Patel',
        type: 'Unreturned Asset Escalation (>48h)',
        amount: 500,
        status: 'Under Review (Admin Escrow Hold)',
        reason: 'Borrower overdue by more than 48 hours without answering chat reminders.',
        evidencePhotos: [
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600'
        ]
    }
];

const initialUsers = [
    { id: 'u1', name: 'Aditya Sharma', dept: 'Computer Science', year: '4th Year', trust: 94, exchanges: 47, status: 'Verified', disputes: 0 },
    { id: 'u2', name: 'Priya Patel', dept: 'Media & Design', year: '3rd Year', trust: 98, exchanges: 32, status: 'Verified', disputes: 0 },
    { id: 'u3', name: 'Rohan Verma', dept: 'Electrical Eng.', year: '3rd Year', trust: 89, exchanges: 12, status: 'Verified', disputes: 1 },
    { id: 'u4', name: 'Neha Gupta', dept: 'Mechanical Eng.', year: '2nd Year', trust: 92, exchanges: 18, status: 'Pending Verification', disputes: 0 },
    { id: 'u5', name: 'Vikram Singh', dept: 'Civil Eng.', year: '4th Year', trust: 96, exchanges: 25, status: 'Verified', disputes: 0 }
];

const initialAuditLogs = [];
const initialImpact = {
    moneySaved: 48250,
    resourcesReused: 462,
    successfulExchanges: 3920,
    onTimeReturnsPercent: 94.8,
    wasteAvoidedKg: 317
};

const initialConversations = {
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
            "Please bring your student ID card for verification.",
            "Great, see you tomorrow morning."
        ]
    }
};

const initialNotifications = [
    { id: 1, title: 'Borrow Request Accepted', text: 'Priya Patel accepted your Sony Alpha Camera request. Handover Security Code: 8491', time: '5m ago', type: 'accept' },
    { id: 2, title: 'Return Deadline Reminder', text: 'Return due in 18 hours for Sony Alpha A7 III.', time: '1h ago', type: 'reminder' },
    { id: 3, title: 'Trust Score Increased', text: 'Your campus trust score bunted to 94/100.', time: '1d ago', type: 'trust' }
];

export const useCircularStore = create(
    persist(
        (set, get) => ({
            persona: 'borrower',
            resources: initialResources,
            kits: initialKits,
            borrowings: initialBorrowings,
            disputes: initialDisputes,
            users: initialUsers,
            auditLogs: initialAuditLogs,
            impact: initialImpact,
            savedResourceIds: ['res-1'],
            userTrustScore: 94,
            lenderEarnings: 14500,
            borrowerPersonalSavings: 28450,
            notificationsCount: 3,
            notifications: initialNotifications,
            conversations: initialConversations,

            setPersona: (newPersona) => set({ persona: newPersona }),

            updateLenderResource: (resourceId, updatedData) => set((state) => ({
                resources: state.resources.map(r =>
                    r.id === resourceId ? { ...r, ...updatedData } : r
                )
            })),

            deleteLenderResource: (resourceId) => set((state) => ({
                resources: state.resources.filter(r => r.id !== resourceId)
            })),

            toggleResourceAvailability: (resourceId) => set((state) => ({
                resources: state.resources.map(r =>
                    r.id === resourceId ? { ...r, status: r.status === 'Available' ? 'Unavailable' : 'Available' } : r
                )
            })),

            toggleKitAvailability: (kitId) => set((state) => ({
                kits: state.kits.map(k =>
                    k.id === kitId ? { ...k, status: k.status === 'Available' ? 'Unavailable' : 'Available' } : k
                )
            })),

            deleteEquipmentKit: (kitId) => set((state) => ({
                kits: state.kits.filter(k => k.id !== kitId)
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
                        owner: priyaOwner,
                        images: make5Photos(
                            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
                            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
                            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
                            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
                            'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800'
                        ),
                        location: 'Media Center Block B, Room 204',
                        accessories: ['Power Adapter'],
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
                        images: make5Photos(
                            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
                            'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800',
                            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
                            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
                            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'
                        ),
                        ...kitData
                    },
                    ...state.kits
                ]
            })),

            updateConversations: (updatedConversations) => set({ conversations: updatedConversations }),

            createBorrowRequest: (borrowData) => set((state) => {
                const newBorrowing = {
                    id: `bor-${Date.now()}`,
                    ...borrowData,
                    borrowerName: 'Aditya Sharma',
                    borrowerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                    stage: 'Requested',
                    dueTimestamp: Date.now() + 48 * 3600 * 1000,
                    handoverConfirmed: false,
                    conditionBefore: null,
                    conditionAfter: null,
                    damageReported: false,
                    damageDeduction: 0,
                    settled: false,
                    disputed: false,
                    rated: false
                };
                return {
                    borrowings: [newBorrowing, ...state.borrowings],
                    notificationsCount: state.notificationsCount + 1
                };
            }),

            acceptBorrowRequest: (borrowingId) => set((state) => {
                const securityCode = Math.floor(1000 + Math.random() * 9000).toString();
                const updatedBorrowings = state.borrowings.map((b) =>
                    b.id === borrowingId ? { ...b, stage: 'Accepted', securityCode } : b
                );
                
                const acceptedBorrowing = state.borrowings.find(b => b.id === borrowingId);
                const title = acceptedBorrowing ? acceptedBorrowing.title : 'Sony Alpha A7 III';
                const owner = acceptedBorrowing ? acceptedBorrowing.ownerName : 'Priya Patel';
                
                const newNotification = {
                    id: Date.now(),
                    title: 'Borrow Request Accepted',
                    text: `${owner} accepted your request for ${title}. Handover Security Code: ${securityCode}`,
                    time: 'Just now',
                    type: 'accept'
                };

                let updatedConversations = { ...state.conversations };
                const contactKey = owner.toLowerCase().includes('rohan') ? 'rohan' :
                                   owner.toLowerCase().includes('ananya') ? 'ananya' : 'priya';
                
                if (updatedConversations[contactKey]) {
                    const chat = updatedConversations[contactKey];
                    const welcomeMsg = {
                        sender: owner,
                        text: `Hi! I have accepted your request for "${title}". The Handover Security Code is ${securityCode}. Please enter this code when we meet to confirm pickup!`,
                        time: 'Just now'
                    };
                    updatedConversations[contactKey] = {
                        ...chat,
                        messages: [...chat.messages, welcomeMsg]
                    };
                }

                return {
                    borrowings: updatedBorrowings,
                    notifications: [newNotification, ...state.notifications],
                    notificationsCount: state.notificationsCount + 1,
                    conversations: updatedConversations
                };
            }),

            declineBorrowRequest: (borrowingId) => set((state) => ({
                borrowings: state.borrowings.filter((b) => b.id !== borrowingId)
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

            raiseAdminDispute: (disputeData) => set((state) => {
                const newDisp = {
                    id: `DSP-${Math.floor(1000 + Math.random() * 9000)}`,
                    status: 'Under Review (Admin Escrow Hold)',
                    ...disputeData
                };
                return { disputes: [newDisp, ...state.disputes] };
            }),

            resetDemoState: () => set({
                persona: 'borrower',
                resources: initialResources,
                kits: initialKits,
                borrowings: initialBorrowings,
                disputes: initialDisputes,
                users: initialUsers,
                auditLogs: initialAuditLogs,
                impact: initialImpact,
                savedResourceIds: ['res-1'],
                userTrustScore: 94,
                lenderEarnings: 14500,
                borrowerPersonalSavings: 28450
            })
        }),
        {
            name: 'campus-circular-v4-storage'
        }
    )
);

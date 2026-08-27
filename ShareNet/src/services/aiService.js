// AI Need-Based Discovery Parser & Multi-Resource Kit Bundle Engine

export const parseUserRequirement = (promptText) => {
    const query = (promptText || '').toLowerCase().trim();

    let purpose = 'General Campus Borrowing';
    let requiredResources = ['General Campus Equipment'];
    let estimatedBudget = 'Flexible';
    let date = 'Tomorrow';

    let bundleKit = {
        name: 'Complete Reel Production Kit',
        tagline: 'All-in-one setup: Camera + Fluid Head Tripod + Dual Wireless Mics + Video Light',
        totalItemsCount: 4,
        itemsIncluded: [
            'Sony Alpha A7 III 4K Camera',
            'Heavy Duty Fluid Head Tripod',
            'Rode Wireless GO II Dual Mics',
            'Godox SL-60W LED Video Light'
        ],
        dailyCharge: 280,
        deposit: 500,
        platformFee: 20,
        matchScore: 96
    };

    if (query.includes('reel') || query.includes('video') || query.includes('film') || query.includes('shoot')) {
        purpose = 'Video Production & Reel Creation';
        requiredResources = [
            'Sony Alpha A7 III 4K Camera',
            'Heavy Duty Fluid Head Tripod',
            'Rode Wireless GO II Dual Mics',
            'Godox SL-60W LED Video Light'
        ];
        estimatedBudget = query.includes('300') ? 'Under ₹300/day' : '₹200 - ₹400/day';
    } else if (query.includes('podcast') || query.includes('audio') || query.includes('recording') || query.includes('interview')) {
        purpose = 'Podcast & Audio Recording';
        requiredResources = [
            'Shure SM7B Studio Podcast Mic',
            'Focusrite Solo Audio Interface',
            'Audio-Technica Studio Headphones',
            'Ring Light for Video Podcast'
        ];
        estimatedBudget = 'Under ₹220/day';
        bundleKit = {
            name: 'Complete Studio Podcast Suite',
            tagline: 'Shure Studio Mic + Audio Interface + Studio Headphones + Ring Light',
            totalItemsCount: 4,
            itemsIncluded: [
                'Shure SM7B Studio Podcast Mic',
                'Focusrite Solo Audio Interface',
                'Audio-Technica Studio Headphones',
                'Ring Light for Video Podcast'
            ],
            dailyCharge: 220,
            deposit: 400,
            platformFee: 20,
            matchScore: 95
        };
    } else if (query.includes('presentation') || query.includes('slides') || query.includes('projector') || query.includes('seminar')) {
        purpose = 'Academic Presentation & Seminar';
        requiredResources = [
            'Full HD 1080p Portable Projector',
            'MacBook USB-C Multiport HDMI Adapter',
            'Wireless Presenter Clicker',
            'Bluetooth Speaker System'
        ];
        estimatedBudget = 'Under ₹250/day';
        bundleKit = {
            name: 'Complete Seminar & Presentation Suite',
            tagline: 'Projector + USB-C Adapter + Wireless Clicker + Speaker',
            totalItemsCount: 4,
            itemsIncluded: [
                'Full HD 1080p Portable Projector',
                'MacBook USB-C Multiport HDMI Adapter',
                'Wireless Presenter Clicker',
                'Bluetooth Speaker System'
            ],
            dailyCharge: 220,
            deposit: 400,
            platformFee: 20,
            matchScore: 95
        };
    } else if (query.includes('cricket') || query.includes('sport') || query.includes('match') || query.includes('football')) {
        purpose = 'Campus Sports & Recreation';
        requiredResources = [
            'Kashmir Willow Cricket Bat Kit',
            'Leather Cricket Balls (Pack of 3)',
            'Wooden Stumps with Bails',
            'Protective Leg Guard Pads'
        ];
        estimatedBudget = 'Under ₹150/day';
        bundleKit = {
            name: 'Complete Cricket Match Kit',
            tagline: 'Cricket Bat + 3x Leather Balls + Stumps + Leg Guards',
            totalItemsCount: 4,
            itemsIncluded: [
                'Kashmir Willow Cricket Bat Kit',
                'Leather Cricket Balls (Pack of 3)',
                'Wooden Stumps with Bails',
                'Protective Leg Guard Pads'
            ],
            dailyCharge: 130,
            deposit: 250,
            platformFee: 10,
            matchScore: 94
        };
    } else if (query.includes('camping') || query.includes('tent') || query.includes('outdoor')) {
        purpose = 'Outdoor Camping & Trekking';
        requiredResources = [
            '4-Person Waterproof Camping Tent',
            'Thermal Sleeping Bag (-5C)',
            'Portable Camping Gas Stove',
            'High Power LED Headlamp'
        ];
        estimatedBudget = 'Under ₹350/day';
        bundleKit = {
            name: 'Complete Outdoor Camping Kit',
            tagline: 'Waterproof Tent + Sleeping Bag + Stove + Headlamp',
            totalItemsCount: 4,
            itemsIncluded: [
                '4-Person Waterproof Camping Tent',
                'Thermal Sleeping Bag (-5C)',
                'Portable Camping Gas Stove',
                'High Power LED Headlamp'
            ],
            dailyCharge: 300,
            deposit: 600,
            platformFee: 20,
            matchScore: 96
        };
    }

    return {
        prompt: promptText,
        purpose,
        requiredResources,
        estimatedBudget,
        date,
        bundleKit,
        confidenceScore: 98
    };
};

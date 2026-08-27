// AI Need-Based Discovery Parser & Multi-Resource Kit Bundle Engine

export const parseUserRequirement = (promptText) => {
    const query = (promptText || '').toLowerCase().trim();

    let purpose = 'General Campus Equipment Discovery';
    let requiredResources = ['Campus Equipment'];
    let estimatedBudget = 'Flexible Budget';
    let date = 'Tomorrow';
    let bundleKit = null;

    if (query.includes('reel') || query.includes('video') || query.includes('camera') || query.includes('shoot') || query.includes('film')) {
        purpose = 'Video Production & Reel Creation';
        requiredResources = ['4K Camera', 'Fluid Head Tripod', 'Wireless Mics', 'LED Video Light'];
        estimatedBudget = query.includes('300') ? 'Under ₹300/day' : '₹200 - ₹400/day';
        bundleKit = {
            name: 'Complete Reel Production Kit',
            tagline: 'Camera + Fluid Head Tripod + Dual Wireless Mics + Video Light',
            totalItemsCount: 4,
            itemsIncluded: [
                'Sony Alpha A7 III 4K Camera',
                'Heavy Duty Fluid Head Tripod',
                'Boya BY-M1 Wireless Mics',
                'Godox SL-60W LED Video Light'
            ],
            dailyCharge: 280,
            deposit: 500,
            platformFee: 20,
            matchScore: 98
        };
    } else if (query.includes('podcast') || query.includes('mic') || query.includes('audio') || query.includes('recording') || query.includes('interview')) {
        purpose = 'Podcast & Audio Recording Studio';
        requiredResources = ['Studio Mic', 'Audio Mixer', 'ANC Headphones'];
        estimatedBudget = 'Under ₹250/day';
        bundleKit = {
            name: 'Podcast Studio Master Kit',
            tagline: 'Boya Lavalier Mics + Soundcraft 8-Ch Mixer + Bose QC45 Headphones',
            totalItemsCount: 3,
            itemsIncluded: [
                'Boya BY-M1 Lavalier Mics',
                'Soundcraft 8-Channel USB Audio Mixer',
                'Bose QuietComfort 45 Headphones'
            ],
            dailyCharge: 220,
            deposit: 400,
            platformFee: 20,
            matchScore: 97
        };
    } else if (query.includes('presentation') || query.includes('projector') || query.includes('slides') || query.includes('seminar') || query.includes('clicker')) {
        purpose = 'Academic Presentation & Event AV';
        requiredResources = ['Full HD Projector', '100" Screen', 'Party Speaker', 'Wireless Clicker'];
        estimatedBudget = 'Under ₹350/day';
        bundleKit = {
            name: 'Hackathon Presentation & AV Kit',
            tagline: 'Epson Projector + 100" Screen + JBL Speaker + Clicker',
            totalItemsCount: 4,
            itemsIncluded: [
                'Epson Full HD 1080p Projector',
                '100-Inch Tripod Screen',
                'JBL PartyBox 160W Speaker',
                'Wireless Presentation Clicker'
            ],
            dailyCharge: 310,
            deposit: 600,
            platformFee: 20,
            matchScore: 96
        };
    } else if (query.includes('cricket') || query.includes('bat') || query.includes('sports') || query.includes('match') || query.includes('football') || query.includes('racket')) {
        purpose = 'Campus Sports & Match Equipment';
        requiredResources = ['Willow Cricket Bat', 'Leather Balls', 'Stumps & Pads'];
        estimatedBudget = 'Under ₹150/day';
        bundleKit = {
            name: 'Tournament Cricket Team Match Kit',
            tagline: 'Kashmir Willow Bat + Leather Balls + Stumps + Protective Pads',
            totalItemsCount: 4,
            itemsIncluded: [
                'Cosco Kashmir Willow Cricket Bat',
                '3x Match Leather Balls',
                'Wooden Stumps with Bails',
                'Protective Leg Guard Pads'
            ],
            dailyCharge: 120,
            deposit: 300,
            platformFee: 10,
            matchScore: 96
        };
    } else if (query.includes('camping') || query.includes('tent') || query.includes('outdoor') || query.includes('trekking') || query.includes('sleeping bag')) {
        purpose = 'Outdoor Camping & Trekking Expedition';
        requiredResources = ['4-Person Tent', 'Sleeping Bag', '60L Backpack', 'Gas Stove', 'Lantern'];
        estimatedBudget = 'Under ₹300/day';
        bundleKit = {
            name: 'Wilderness Camping Trek Kit',
            tagline: '4-Person Tent + Sleeping Bag + 60L Backpack + Stove + Lantern',
            totalItemsCount: 5,
            itemsIncluded: [
                'Decathlon 4-Person Camping Tent',
                'Wildcraft Sleeping Bag (-5°C)',
                'Quechua 60L Backpack',
                'Coleman BBQ Grill',
                '1000LM Camping Lantern'
            ],
            dailyCharge: 250,
            deposit: 500,
            platformFee: 20,
            matchScore: 98
        };
    } else if (query.includes('robotics') || query.includes('arduino') || query.includes('raspberry') || query.includes('soldering') || query.includes('caliper') || query.includes('lab') || query.includes('calculator')) {
        purpose = 'Engineering & Academic Prototyping';
        requiredResources = ['Arduino Kit', 'Raspberry Pi 4', 'Soldering Station', 'Digital Caliper'];
        estimatedBudget = 'Under ₹200/day';
        bundleKit = {
            name: 'Robotics & IoT Prototyping Kit',
            tagline: 'Arduino Uno + Raspberry Pi 4 + Soldering Station + Vernier Caliper',
            totalItemsCount: 4,
            itemsIncluded: [
                'Arduino Uno R3 Starter Kit',
                'Raspberry Pi 4 Model B (8GB)',
                'Soldering Iron Station Kit',
                'Digital Vernier Caliper'
            ],
            dailyCharge: 140,
            deposit: 300,
            platformFee: 10,
            matchScore: 97
        };
    } else {
        purpose = `Custom Search for "${promptText}"`;
        requiredResources = [promptText];
        estimatedBudget = 'Flexible Market Rate';
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

// 7-Factor Weighted Smart Matching Algorithm Engine

export const MATCH_FORMULA_METADATA = [
    { factor: 'Availability', weight: 25, description: 'Is resource available on required dates?' },
    { factor: 'Suitability', weight: 25, description: 'Does resource match search query keywords & category?' },
    { factor: 'Distance', weight: 15, description: 'Campus proximity from borrower (km)' },
    { factor: 'Trust Score', weight: 15, description: 'Owner reputation & on-time return rating' },
    { factor: 'Condition', weight: 10, description: 'Physical inspection state (Pristine/Good)' },
    { factor: 'Daily Price', weight: 5, description: 'Affordability vs requested budget' },
    { factor: 'Security Deposit', weight: 5, description: 'Refundable deposit requirement' }
];

export const calculateMatchScore = (resource, parsedNeed) => {
    const rawPrompt = (parsedNeed.prompt || '').toLowerCase();
    const purposeLower = (parsedNeed.purpose || '').toLowerCase();

    const titleLower = (resource.title || '').toLowerCase();
    const categoryLower = (resource.category || '').toLowerCase();
    const locationLower = (resource.location || '').toLowerCase();
    const accessoriesText = (resource.accessories || []).join(' ').toLowerCase();

    // 1. Calculate Keyword / Suitability Score dynamically
    let suitabilityScore = 40; // baseline if no keyword match

    const promptTokens = rawPrompt
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter(t => t.length > 2);

    let matchCount = 0;
    promptTokens.forEach(token => {
        if (titleLower.includes(token)) matchCount += 3;
        else if (categoryLower.includes(token)) matchCount += 2;
        else if (accessoriesText.includes(token)) matchCount += 1.5;
        else if (locationLower.includes(token)) matchCount += 1;
    });

    if (matchCount >= 3) {
        suitabilityScore = 99;
    } else if (matchCount >= 2) {
        suitabilityScore = 95;
    } else if (matchCount >= 1) {
        suitabilityScore = 88;
    } else {
        // Purpose check fallback
        if (purposeLower.includes('video') && (categoryLower.includes('electronics') || categoryLower.includes('event') || titleLower.includes('camera') || titleLower.includes('light') || titleLower.includes('tripod'))) {
            suitabilityScore = 90;
        } else if (purposeLower.includes('podcast') && (titleLower.includes('mic') || titleLower.includes('mixer') || titleLower.includes('headphone'))) {
            suitabilityScore = 92;
        } else if (purposeLower.includes('sports') && categoryLower.includes('sports')) {
            suitabilityScore = 90;
        } else if (purposeLower.includes('camping') && categoryLower.includes('camping')) {
            suitabilityScore = 92;
        } else if (purposeLower.includes('presentation') && (titleLower.includes('projector') || titleLower.includes('screen') || titleLower.includes('clicker'))) {
            suitabilityScore = 94;
        } else if (purposeLower.includes('engineering') && (categoryLower.includes('academic') || titleLower.includes('arduino') || titleLower.includes('raspberry') || titleLower.includes('caliper'))) {
            suitabilityScore = 92;
        }
    }

    // 2. Factor calculations
    let availabilityScore = resource.status === 'Available' ? 100 : 30;
    let distanceScore = Math.max(0, 100 - (parseFloat(resource.distanceKm || 1.2) * 20));
    let trustScore = (resource.owner.trustScore / 100) * 100 || 94;
    let conditionScore = resource.condition === 'Pristine' || resource.condition === 'Excellent' ? 100 :
                        resource.condition === 'Good' ? 85 : 70;
    let priceScore = resource.dailyCharge <= 300 ? 100 : 70;
    let depositScore = resource.deposit <= 500 ? 100 : 75;

    const totalWeightedScore = Math.round(
        availabilityScore * 0.25 +
        suitabilityScore * 0.25 +
        distanceScore * 0.15 +
        trustScore * 0.15 +
        conditionScore * 0.10 +
        priceScore * 0.05 +
        depositScore * 0.05
    );

    return {
        matchPercentage: Math.min(99, Math.max(40, totalWeightedScore)),
        factors: {
            availability: Math.round(availabilityScore),
            suitability: Math.round(suitabilityScore),
            distance: Math.round(distanceScore),
            trust: Math.round(trustScore),
            condition: Math.round(conditionScore),
            price: Math.round(priceScore),
            deposit: Math.round(depositScore)
        },
        reasons: [
            `✓ Keyword suitability match: ${suitabilityScore}%`,
            `✓ Available ${parsedNeed.date || 'Tomorrow'}`,
            `✓ ${resource.distanceKm || '1.2'} km away on campus`,
            `✓ Owner Trust Score ${resource.owner.trustScore}/100`,
            `✓ ${resource.condition} Condition`,
            `✓ ₹${resource.dailyCharge}/day borrowing fee`
        ]
    };
};

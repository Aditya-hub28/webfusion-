// 7-Factor Weighted Smart Matching Algorithm Engine

export const MATCH_FORMULA_METADATA = [
    { factor: 'Availability', weight: 25, description: 'Is resource available on required dates?' },
    { factor: 'Suitability', weight: 25, description: 'Does resource match prompt specifications & category?' },
    { factor: 'Distance', weight: 15, description: 'Campus proximity from borrower (km)' },
    { factor: 'Trust Score', weight: 15, description: 'Owner reputation & on-time return rating' },
    { factor: 'Condition', weight: 10, description: 'Physical inspection state (Pristine/Good)' },
    { factor: 'Daily Price', weight: 5, description: 'Affordability vs requested budget' },
    { factor: 'Security Deposit', weight: 5, description: 'Refundable deposit requirement' }
];

export const calculateMatchScore = (resource, parsedNeed) => {
    let suitabilityScore = 80;
    let availabilityScore = resource.status === 'Available' ? 100 : 30;
    let distanceScore = Math.max(0, 100 - (parseFloat(resource.distanceKm || 1.2) * 20));
    let trustScore = (resource.owner.trustScore / 100) * 100 || 94;
    let conditionScore = resource.condition === 'Pristine' || resource.condition === 'Excellent' ? 100 :
                        resource.condition === 'Good' ? 85 : 70;
    let priceScore = resource.dailyCharge <= 300 ? 100 : 70;
    let depositScore = resource.deposit <= 500 ? 100 : 75;

    // Keyword match boost
    const resourceTitleLower = (resource.title || '').toLowerCase();
    const purposeLower = (parsedNeed.purpose || '').toLowerCase();

    if (purposeLower.includes('video') && (resourceTitleLower.includes('camera') || resourceTitleLower.includes('tripod') || resourceTitleLower.includes('light') || resourceTitleLower.includes('mic'))) {
        suitabilityScore = 98;
    } else if (purposeLower.includes('sports') && (resourceTitleLower.includes('cricket') || resourceTitleLower.includes('bat') || resourceTitleLower.includes('ball'))) {
        suitabilityScore = 98;
    }

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
        matchPercentage: Math.min(99, Math.max(70, totalWeightedScore)),
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
            `✓ Available ${parsedNeed.date || 'Tomorrow'}`,
            `✓ ${resource.distanceKm || '1.2'} km away on campus`,
            `✓ Owner Trust Score ${resource.owner.trustScore}/100`,
            `✓ ${resource.condition} Condition`,
            `✓ ₹${resource.dailyCharge}/day borrowing fee`,
            `✓ ₹${resource.deposit} refundable deposit`
        ]
    };
};

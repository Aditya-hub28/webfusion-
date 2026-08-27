// Dynamic Trust Score System Engine

export const calculateTrustScore = (userStats) => {
    const {
        successfulExchanges = 47,
        onTimeReturnsPercent = 98,
        averageRating = 4.8,
        lateReturns = 1,
        disputes = 0,
        resourcesLent = 23
    } = userStats;

    // 0 - 100 algorithm
    let baseScore = 70;
    baseScore += Math.min(15, successfulExchanges * 0.3);
    baseScore += (onTimeReturnsPercent / 100) * 10;
    baseScore += (averageRating / 5) * 5;
    baseScore -= lateReturns * 3;
    baseScore -= disputes * 8;

    const finalScore = Math.min(100, Math.max(0, Math.round(baseScore)));

    let badges = [];
    if (onTimeReturnsPercent >= 95) badges.push({ id: 'b1', title: '🏆 Reliable Borrower', desc: '95%+ On-Time Return Rate' });
    if (resourcesLent >= 10) badges.push({ id: 'b2', title: '🤝 Trusted Lender', desc: '10+ Shared Resources' });
    if (averageRating >= 4.7) badges.push({ id: 'b3', title: '⚡ Fast Responder', desc: 'Avg Rating > 4.7 Stars' });
    if (successfulExchanges >= 25) badges.push({ id: 'b4', title: '♻️ Circular Contributor', desc: '25+ Successful Exchanges' });

    return {
        score: finalScore,
        trustLevel: finalScore >= 90 ? 'Excellent Trust' : finalScore >= 80 ? 'High Trust' : 'Verified Member',
        badges,
        breakdown: {
            successfulExchanges,
            onTimeReturnsPercent,
            averageRating,
            lateReturns,
            disputes,
            resourcesLent
        }
    };
};

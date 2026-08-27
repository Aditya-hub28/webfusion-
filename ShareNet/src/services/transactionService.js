// Complete Transaction Lifecycle State Machine

export const TRANSACTION_STAGES = {
    REQUESTED: 'Requested',
    ACCEPTED: 'Accepted',
    HANDOVER: 'Handover Pending',
    BORROWED: 'Borrowed (Active)',
    RETURN_DUE: 'Return Due',
    RETURNED: 'Returned',
    SETTLED: 'Settled & Refunded',
    RATED: 'Completed & Rated'
};

export const getNextStage = (currentStage) => {
    switch (currentStage) {
        case TRANSACTION_STAGES.REQUESTED: return TRANSACTION_STAGES.ACCEPTED;
        case TRANSACTION_STAGES.ACCEPTED: return TRANSACTION_STAGES.HANDOVER;
        case TRANSACTION_STAGES.HANDOVER: return TRANSACTION_STAGES.BORROWED;
        case TRANSACTION_STAGES.BORROWED: return TRANSACTION_STAGES.RETURNED;
        case TRANSACTION_STAGES.RETURNED: return TRANSACTION_STAGES.SETTLED;
        case TRANSACTION_STAGES.SETTLED: return TRANSACTION_STAGES.RATED;
        default: return currentStage;
    }
};

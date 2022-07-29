const BOOKING_STATUS = {
    Pending: 'Pending',
    ManualCorrectionNeeded: 'ManualCorrectionNeeded',
    Cancelled: 'Cancelled',
    Rejected: 'Rejected',
    Invalid: 'Invalid',
    Discarded: 'Discarded',
    PendingCancellation: 'PendingCancellation',
    Confirmed: 'Confirmed',
    Completed: 'Completed',
};

const isFinalBookingStatus = (status) => [
    BOOKING_STATUS.Cancelled,
    BOOKING_STATUS.Rejected,
    BOOKING_STATUS.Discarded,
    BOOKING_STATUS.Invalid,
    BOOKING_STATUS.Completed,
].includes(status);

export {
    BOOKING_STATUS,
    isFinalBookingStatus
};

// Helper function to get the formatted date for the specified number of days ago
const getFormattedDate = (daysAgo) => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - daysAgo);

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

module.exports = { getFormattedDate }
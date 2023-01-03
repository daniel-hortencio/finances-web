export const getMonth = (month: number) => {
    if (month < 0 || month > 12) return;

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    return months[month]
} 
export const countDays = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const timeDiff = now.getTime() - eventDate.getTime();
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    return diffDays;
};

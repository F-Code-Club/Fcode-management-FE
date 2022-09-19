export const dateFormat = (date) => {
    let array = date.split('-');
    return `${array[2]}/${array[1]}/${array[0]}`;
};

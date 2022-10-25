export const dateFormat = (date) => {
    let array = date.split(' ');
    return `${array[0]} ${array[2]}  ${array[1]} ${array[3]} ${array[4]}`;
};

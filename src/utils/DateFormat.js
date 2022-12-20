function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
export function formatDate(date) {
    return (
        [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join(
            '/'
        ) +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

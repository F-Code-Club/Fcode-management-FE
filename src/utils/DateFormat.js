export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
export const formatTime = (date) => {
    var newDate = new Date(date);
    return [
        padTo2Digits(newDate.getHours()),
        padTo2Digits(newDate.getMinutes()),
        padTo2Digits(newDate.getSeconds()),
    ].join(':');
};

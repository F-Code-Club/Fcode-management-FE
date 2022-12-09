const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        console.log(reader.result);
    };
    reader.onerror = (error) => {
        console.log('Error: ', error);
    };
};

export default convertToBase64;

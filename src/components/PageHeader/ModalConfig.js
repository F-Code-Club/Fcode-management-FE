export const ButtonModalConfig = (title, content, callback) => {
    return {
        title,
        content,
        onOk: async () => await callback(),
    };
};

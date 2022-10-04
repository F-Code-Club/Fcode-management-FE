const { BaseButton } = require('./style');

const StyledButton = ({ children, ...rest }) => {
    return <BaseButton {...rest}>{children}</BaseButton>;
};

export default StyledButton;

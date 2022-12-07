import StyledButton from './../../../../components/Button/index';

const ActionButton = (props) => {
    const { onClick, className, type, text } = props;
    return (
        <StyledButton type={type} className={className} onClick={onClick}>
            {text}
        </StyledButton>
    );
};

export default ActionButton;

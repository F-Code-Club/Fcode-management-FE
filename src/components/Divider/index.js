import { StyledDivider } from './style';

const Divider = (props) => {
    const { margin, variant, ...rest } = props;
    return <StyledDivider variant={variant} margin={margin} {...rest} />;
};

export default Divider;

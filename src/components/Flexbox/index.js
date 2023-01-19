import { StyledFlexbox } from './style';

const FlexboxWrapper = (Component, props) => {
    const { children, ...rest } = props;
    return <Component {...rest}>{children}</Component>;
};

const Flexbox = (props) => FlexboxWrapper(StyledFlexbox, props);

export default Flexbox;

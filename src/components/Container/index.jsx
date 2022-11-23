import PropTypes from 'prop-types';

import { BaseContainer } from './style';

const StyledContainer = ({ children, ...rest }) => {
    return <BaseContainer {...rest}>{children}</BaseContainer>;
};

StyledContainer.propTypes = {
    padding: PropTypes.string,
    margin: PropTypes.string,
};
StyledContainer.defaultProps = {
    padding: '20px 36px',
    margin: '0',
};
export default StyledContainer;

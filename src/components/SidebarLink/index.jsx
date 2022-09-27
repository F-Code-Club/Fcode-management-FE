import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { actions } from '../PageHeader/slice';

const SidebarLink = ({ child, ...otherProps }) => {
    const dispatch = useDispatch();

    const renderTitle = () => {
        dispatch(actions.changeTitle(child));
    };
    return (
        <Link {...otherProps} onClick={renderTitle}>
            {child}
        </Link>
    );
};

export default SidebarLink;

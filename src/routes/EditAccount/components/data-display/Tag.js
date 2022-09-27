import { Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const ColoredTag = ({ tagName, row }) => {
    const tags = useSelector(selector.tags);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(actions.removeRole({ role: tagName, key: row.key }));
    };

    return (
        <Tag closable color={tags[tagName]} onClose={handleClose}>
            {tagName.toUpperCase()}
        </Tag>
    );
};

export default ColoredTag;

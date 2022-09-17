/* eslint-disable no-unused-vars */
import { Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

const ActivityTable = () => {
    const tags = useSelector(selector.tags);
    const activities = useSelector(selector.activities);

    const dispatch = useDispatch();

    const handleClose = (row, removedTag) => {
        let _activities = activities;
        let _roles = new Set(_activities[row.key].roles);
        _roles.delete(removedTag);
        _activities[row.key].roles = _roles;
        dispatch(actions.setActivities(_activities));
    };

    const columns = [
        {
            title: 'Kỳ',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'activity',
            key: 'activity',
        },
        {
            title: 'Vai trò',
            key: 'roles',
            dataIndex: 'roles',
            render: (_, row) => (
                <>
                    {row.roles.map((tag) => {
                        const color = tags[tag];
                        return (
                            <Tag
                                closable
                                onClose={() => handleClose(row, tag)}
                                color={color}
                                key={tag}
                            >
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];

    return <Table columns={columns} dataSource={activities} />;
};

export default ActivityTable;

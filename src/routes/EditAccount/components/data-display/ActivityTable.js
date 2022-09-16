import { Table, Tag } from 'antd';
import { useSelector } from 'react-redux';

import selector from '../../slice/selectors';

const ActivityTable = () => {
    const tags = useSelector(selector.tags);
    const activities = useSelector(selector.activities);

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
            render: (_, { roles }) => (
                <>
                    {roles.map((tag) => {
                        const color = tags[tag];

                        return (
                            <Tag closable color={color} key={tag}>
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

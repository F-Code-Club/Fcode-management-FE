/* eslint-disable no-unused-vars */
import { Table } from 'antd';
import { useSelector } from 'react-redux';

import selector from '../../slice/selectors';
import { default as Tag } from './Tag';

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
                    return <Tag row={row} tagName={tag} key={tag} />;
                })}
            </>
        ),
    },
];

const ActivityTable = () => {
    const activities = useSelector(selector.activities);
    return <Table columns={columns} dataSource={activities} />;
};

export default ActivityTable;

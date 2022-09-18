import { Table } from 'antd';
import { useSelector } from 'react-redux';

import selector from '../../slice/selectors';
import { default as Tag } from './Tag';

import compareSemester from '@/utils/compareSemester';

const columns = [
    {
        title: 'Kỳ',
        dataIndex: 'semester',
        key: 'semester',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => compareSemester(a.semester, b.semester),
    },
    {
        title: 'Hoạt động',
        dataIndex: 'activity',
        key: 'activity',
        sorter: (a, b) => (a.activity < b.activity ? 1 : -1),
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

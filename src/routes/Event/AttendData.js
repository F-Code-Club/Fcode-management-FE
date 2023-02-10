import { Checkbox } from 'antd';

import { CheckboxAbsent, CheckboxPresent } from './styled';

export const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        width: 500,
        render: (_id, record) => {
            return <span key={`name_${_id}`}>{record.firstName + ' ' + record.lastName}</span>;
        },
    },
    {
        title: 'Có mặt',
        key: 'action_1',
        width: 100,
        align: 'Center',
        filters: [
            {
                text: 'Có mặt',
                value: 'ON_TIME',
            },
            {
                text: 'Trễ',
                value: 'LATE',
            },
        ],
        onFilter: (value, record) => record.state === value,
        render: (_id, record) => (
            <CheckboxPresent>
                <Checkbox
                    key={`ON_TIME_${_id}`}
                    checked={record.state === 'ON_TIME' ? true : false}
                />
            </CheckboxPresent>
        ),
    },
    {
        title: 'Trễ',
        key: 'action_2',
        width: 100,
        align: 'Center',
        render: (_id, record) => (
            <CheckboxAbsent>
                <Checkbox key={`LATE_${_id}`} checked={record.state === 'LATE' ? true : false} />
            </CheckboxAbsent>
        ),
    },
];

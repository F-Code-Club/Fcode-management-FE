import { useEffect } from 'react';

import { Badge, Calendar } from 'antd';

import '../index.css';

const getListData = (value) => {
    let listData;
    let dateValue = value.format('DD/MM/yyyy');
    switch (dateValue) {
        case '16/09/2022':
            listData = [
                {
                    type: 'success',
                    content: 'Họp câu lạc bộ ',
                },
            ];
            break;

        case '14/09/2022':
            listData = [
                {
                    type: 'warning',
                    content: 'This is warning event.',
                },
                {
                    type: 'success',
                    content: 'This is usual event.',
                },
                {
                    type: 'error',
                    content: 'This is error event.',
                },
            ];
            break;

        case '23/09/2022':
            listData = [
                {
                    type: 'success',
                    content: 'Company Tour',
                },
            ];
            break;

        default:
    }

    return listData || [];
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
function MyCalender() {
    useEffect(() => {
        console.log(dateCellRender);
    });
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onSelect={(e) => console.log(e)}
        />
    );
}

export default MyCalender;

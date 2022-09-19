import { useState } from 'react';

import { Calendar } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import '../index.css';
import Detail from './Detail';

const getListData = (value, listOfEvents) => {
    let listData = [];
    let dateValue = value.format('DD/MM/yyyy');

    for (let i = 0; i < listOfEvents.length; i++) {
        if (listOfEvents[i].day === dateValue) {
            if (listData.length < 0) {
                listData = [
                    {
                        type: 'success',
                        content: listOfEvents[i].name,
                        id: listOfEvents[i].id,
                    },
                ];
            } else {
                listData.push({
                    type: 'success',
                    content: listOfEvents[i].name,
                    id: listOfEvents[i].id,
                });
            }
        }
    }
    return listData || [];
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
function MyCalender() {
    const { listOfEvents } = useSelector((state) => state.listOfEvents);
    const [isClicked, setIsClicked] = useState(false);
    const [event, setEvent] = useState({});
    const HandleClick = (e) => {
        for (let i = 0; i < listOfEvents.length; i++) {
            if (listOfEvents[i].id == e.target.id) {
                setEvent(listOfEvents[i]);
            }
        }
        setIsClicked(true);
    };
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
        const listData = getListData(value, listOfEvents);
        return (
            <ul className="events">
                {listData.map((event) => (
                    <li key={event.id}>
                        <EventBox id={event.id} onClick={HandleClick}>
                            {event.content}
                        </EventBox>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {isClicked && <Detail event={event} handle={() => setIsClicked(false)} />}
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </>
    );
}

export default MyCalender;
const EventBox = styled.div`
    background: #45ce7c;
    border-radius: 5px;
    margin: 4px 8px;
    padding: 4px;
    color: White;
`;

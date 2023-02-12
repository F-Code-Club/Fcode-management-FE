import { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/vi';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from 'react-redux';

import { CustomModal, LeftHeader, DetailBody, DetailHeader, Status } from './styled';

import { themes } from '@/theme/theme.js';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const { listOfEvents } = useSelector((state) => state.listOfEvents);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [editedEvent, showEditedEvent] = useState({});
    const [events, setEvents] = useState(listOfEvents);
    let today = new Date();
    useEffect(() => {
        let array = [];
        for (let event of listOfEvents) {
            const newEvent = {
                ...event,
                start: new Date(event.startTime),
                end: new Date(event.endTime),
                title: event.name,
            };
            array.push(newEvent);
        }

        setEvents(array);
    }, [listOfEvents]);

    const handleSelectEvent = (e) => {
        showEditedEvent(e);
        setShowDetailModal(true);
    };
    function ChangeFormateDate(oldDate) {
        var date = new Date(oldDate);

        var newDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ';
        return newDate;
    }
    function changeFormatTime(oldDate) {
        var date = new Date(oldDate);
        var newTime = date.getHours() + ':' + date.getMinutes();
        return newTime;
    }

    const handleEvent = (event) => {
        var backgroundColor = themes.colors.upcoming;
        if (event.state == 'ON_TIME') {
            backgroundColor = themes.colors.primary;
        } else if (event.state == 'LATE') {
            backgroundColor = themes.colors.late;
        }
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            display: 'block',
        };
        return {
            style: style,
        };
    };
    const handleOk = () => {
        setShowDetailModal(false);
    };
    const handleCancel = () => {
        setShowDetailModal(false);
    };

    return (
        <div className="page">
            <CustomModal
                open={showDetailModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
            >
                <DetailHeader>
                    <LeftHeader>
                        <h1>{editedEvent.name}</h1>
                        <div>{editedEvent.point}</div>
                    </LeftHeader>
                    <Status state={editedEvent.state}>
                        {editedEvent.state != null
                            ? editedEvent.state == 'ON_TIME'
                                ? 'Có mặt'
                                : 'Vắng'
                            : 'Sắp diễn ra'}
                    </Status>
                </DetailHeader>
                <hr className="solid"></hr>
                <DetailBody>
                    <div>
                        <h1>Ngày :</h1>
                        <h2>{`${ChangeFormateDate(editedEvent.startTime)} ➭ ${ChangeFormateDate(
                            editedEvent.endTime
                        )}`}</h2>
                    </div>
                    <div>
                        <h1>Thời gian :</h1>
                        <h2>{`${changeFormatTime(editedEvent.startTime)} ➭ ${changeFormatTime(
                            editedEvent.endTime
                        )}`}</h2>
                    </div>
                    <div>
                        <h1>Địa Điểm : </h1>
                        <h2>{`${editedEvent.location}`}</h2>
                    </div>
                    <h1>Ghi Chú :</h1>
                    <h2>{`${editedEvent.description}`}</h2>
                </DetailBody>
            </CustomModal>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                selectable={true}
                onSelectEvent={handleSelectEvent}
                resizable={true}
                style={{ height: '880px' }}
                min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
                max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23)}
                resource="Test ressource"
                eventPropGetter={handleEvent}
                messages={{
                    next: 'Tiếp',
                    previous: 'Trước',
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày',
                }}
            />
        </div>
    );
};

export default MyCalendar;

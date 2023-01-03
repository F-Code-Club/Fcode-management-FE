import { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/vi';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';

import { editEvent } from '../slice';
import Detail from './Detail';

import { themes } from '@/theme/theme.js';
import { formatDate } from '@/utils/DateFormat';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const dispatch = useDispatch();
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
        console.log(array);
        setEvents(array);
    }, [listOfEvents]);

    const handleSelect = () => {};

    const handleSelectEvent = (e) => {
        showEditedEvent(e);
    };
    const onEventDrop = ({ event, start, end }) => {
        let answer = window.confirm('Are you sure you want to  change The Date?');
        if (answer) {
            const updatedEvent = {
                ...event,
                start: start.toString(),
                end: end.toString(),
                startTime: formatDate(start),
                endTime: formatDate(end),
            };
            console.log(updatedEvent);
            setEvents((prevEvents) => {
                const filtered = prevEvents.filter((item) => item.id !== event.id);
                dispatch(editEvent(updatedEvent));
                return [...filtered, updatedEvent];
            });
        }
    };
    const handleEvent = (event) => {
        var backgroundColor = themes.colors.upcoming;
        if (event.state == 'ON_TIME') {
            console.log('3');
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

    return (
        <div className="page">
            {showDetailModal && (
                <Detail handle={() => setShowDetailModal(false)} event={editedEvent} />
            )}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                selectable={true}
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

import { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/vi';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { DndContext } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import { editEvent } from '../slice';
import { ButtonContainer, CustomButton } from '../styled';
import AddEventBox from './AddEventBox';
import Detail from './Detail';
import PopUp from './PopUp';

import { themes } from '@/theme/theme.js';
import { formatDate } from '@/utils/DateFormat';
import { PlusSquareOutlined } from '@ant-design/icons';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const MyCalendar = () => {
    const dispatch = useDispatch();
    const { listOfEvents } = useSelector((state) => state.listOfEvents);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [editedEvent, showEditedEvent] = useState({});
    const [popUp, setpopUp] = useState(false);
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

    const handleSelect = () => {};

    const handleSelectEvent = (e) => {
        setShowAddModal(false);
        setShowDetailModal(true);
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

            setEvents((prevEvents) => {
                const filtered = prevEvents.filter((item) => item.id !== event.id);
                dispatch(editEvent(updatedEvent));
                return [...filtered, updatedEvent];
            });
        }
    };

    return (
        <div className="page">
            <ButtonContainer>
                <CustomButton type="primary" onClick={() => setShowAddModal(true)}>
                    <PlusSquareOutlined />
                </CustomButton>
            </ButtonContainer>
            {popUp && (
                <PopUp
                    text={`Do you really want to change the Event Date ?`}
                    handleClose={() => setpopUp(false)}
                />
            )}
            {showAddModal && <AddEventBox handle={() => setShowAddModal(false)} />}
            {showDetailModal && (
                <Detail handle={() => setShowDetailModal(false)} event={editedEvent} />
            )}
            <DnDCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                selectable={true}
                resizable={true}
                onEventDrop={onEventDrop}
                style={{ height: '70vh' }}
                onSelectSlot={handleSelect}
                onSelectEvent={handleSelectEvent}
                min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
                max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23)}
                resource="Test ressource"
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.isDone === true ? themes.neutro5 : themes.submenu,
                    },
                })}
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

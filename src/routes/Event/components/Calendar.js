import { useState, useEffect } from 'react';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';

import { editEvent } from '../slice';
import { ButtonContainer, CustomButton } from '../styled';
import AddEventBox from './AddEventBox';
import Detail from './Detail';
import PopUp from './PopUp';

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
        for (let i = 0; i < listOfEvents.length; i++) {
            const newEvent = {
                ...listOfEvents[i],
                start: new Date(listOfEvents[i].start),
                end: new Date(listOfEvents[i].end),
            };
            console.log(newEvent);
            array.push(newEvent);
        }
        setEvents(array);
        console.log(listOfEvents);
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
            const updatedEvent = { ...event, start: start.toString(), end: end.toString() };
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
                        backgroundColor: event.isDone === true ? '#ad4ca4' : '#3174ad',
                    },
                })}
            />
        </div>
    );
};

export default MyCalendar;

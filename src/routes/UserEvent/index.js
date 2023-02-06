import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import MyCalendar from './components/Calendar';
import { setEvent } from './slice';
import { Container } from './styled';

import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

function UserEvent() {
    const token = localStorageUtils.getItem('token');
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getALlEvent();
    }, []);
    const getALlEvent = async () => {
        let events = [];
        const path = await productApi.getAllEvent(token);
        const attendances = await productApi.getOwnAttendance(token);
        let res = await path.data.data;
        SetUpdated(true);
        await attendances.data.data.map((item) => {
            events = [];
            res.map((child) => {
                if (child.id == item.eventId) {
                    const newEvent = {
                        ...child,
                        state: item.state,
                    };
                    events.push(newEvent);
                } else {
                    events.push(child);
                }
            });
            res = events;
        });
        dispatch(setEvent(res));
    };

    return <Container>{isUpdated && <MyCalendar />}</Container>;
}

export default UserEvent;

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import MyCalendar from './components/Calendar';
import { setEvent } from './slice';
import { Container } from './styled';

import { token } from '@/utils/data';
import productApi from '@/utils/productApi';

function Event() {
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();

    console.log(token);

    useEffect(() => {
        getALlEvent();
    }, []);
    const getALlEvent = async () => {
        const path = await productApi.getAllEvent(token);
        console.log(path.data.data);
        SetUpdated(true);
        dispatch(setEvent(path.data.data));
    };
    return <Container>{isUpdated && <MyCalendar />}</Container>;
}

export default Event;

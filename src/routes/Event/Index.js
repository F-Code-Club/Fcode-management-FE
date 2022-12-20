import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import MyCalendar from './components/Calendar';
import { setEvent } from './slice';
import { Container } from './styled';

import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

function Event() {
    const token = localStorageUtils.getItem('token');
    console.log(token);
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getALlEvent();
    }, []);
    const getALlEvent = async () => {
        const path = await productApi.getAllEvent(token);
        SetUpdated(true);
        dispatch(setEvent(path.data.data));
    };
    return <Container>{isUpdated && <MyCalendar />}</Container>;
}

export default Event;

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import MyCalendar from './components/Calendar';
import { setEvent } from './slice';
import { Container } from './styled';

import productApi from '@/utils/productApi';

function Event() {
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();
    let token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzA5MjYyNDUsImlhdCI6MTY3MDkyNDQ0NX0._bgmQVY4ZxNOx4iZCXkgrZjothubmXtAN23kvpo33FSnE0mZw6xoC3BjDCvwMxW6UdYm4A_vbNNbQyq29d8lCQ';
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

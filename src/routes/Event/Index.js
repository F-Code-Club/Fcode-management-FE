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
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzA5NjE5NTYsImlhdCI6MTY3MDk2MDE1Nn0.LaQ8k2jQbbyRcQ5dyQ_mmJm7Z40TApVg_O0JWhsLOA2V8n0O7A-2DcRZbjwGI9mduBwz_btxBUgpSTWVlz2M3Q';
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

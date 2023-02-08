import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import MyCalendar from './components/Calendar';
import { setEvent } from './slice';
import { Container, Wrapper } from './styled';

import { toastError } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

function Event() {
    const token = localStorageUtils.getItem('token');
    const [isUpdated, SetUpdated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getALlEvent();
    }, []);
    const getALlEvent = async () => {
        const path = await productApi.getAllEvent(token);
        SetUpdated(true);
        if (path.data.code === 408) {
            toastError('Token hết hạn');
        }
        console.log(path.data.data);
        dispatch(setEvent(path.data.data || []));
    };
    return (
        <Wrapper>
            <Container>{isUpdated && <MyCalendar />}</Container>
        </Wrapper>
    );
}

export default Event;

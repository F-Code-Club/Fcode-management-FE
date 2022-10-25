import { useState } from 'react';

import { notification } from 'antd';
import { useDispatch } from 'react-redux';

import { removeEvent } from '../slice';
import {
    BoxContainer,
    DetailContainer,
    DetailHeader,
    LeftHeader,
    DetailBody,
    Action,
} from '../styled';
import EditBox from './EditBox';

import { dateFormat } from '@/utils/dateFormat';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const openNotification = (type, placement, value, description) => {
    notification.info({
        message: `${value}`,
        description: `${description}`,
        placement,
        duration: 3,
    });
};
function Detail({ event, handle }) {
    const handleNotification = (type, message, description) => {
        openNotification(type, 'bottomRight', message, description);
    };
    const [isEditBoxOpen, setEditBoxOpen] = useState(false);
    const dispatch = useDispatch();
    const handleOpenEditBox = () => {
        setEditBoxOpen(true);
    };
    const handleDeleteEvent = () => {
        let answer = window.confirm('Are you sure you want to  Delete?');
        if (answer) {
            dispatch(removeEvent(event));
            handleNotification(
                'Success',
                'Success!!!',
                'Event has been deleted successfully to Your Calender,Code The Dream!!'
            );
            handle();
        }
    };
    return (
        <BoxContainer>
            <DetailContainer>
                <DetailHeader>
                    <LeftHeader>
                        <h1>{event.title}</h1>
                        <div>{event.point}</div>
                    </LeftHeader>
                    <CloseCircleOutlined onClick={handle} />
                </DetailHeader>
                <hr className="solid"></hr>
                <DetailBody>
                    <h2>{dateFormat(event.start.toString())}</h2>
                    <h2>{dateFormat(event.end.toString())}</h2>
                    <h2>{event.time}</h2>
                    <h2>{event.place}</h2>
                    <br></br>
                    <h2>{event.note}</h2>
                </DetailBody>
                <Action>
                    <div>
                        <EditOutlined onClick={handleOpenEditBox} />
                    </div>
                    <div>
                        <DeleteOutlined onClick={handleDeleteEvent} />
                    </div>
                </Action>
                {isEditBoxOpen && (
                    <EditBox
                        event={event}
                        handle={() => setEditBoxOpen(false)}
                        closeOtherBox={handle}
                    ></EditBox>
                )}
            </DetailContainer>
        </BoxContainer>
    );
}

export default Detail;

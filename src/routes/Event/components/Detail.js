import { useState } from 'react';

import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { removeEvent } from '../slice';
import EditBox from './EditBox';

import { dateFormat } from '@/utils/dateFormat';
import px2vw from '@/utils/px2vw';
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
            console.log('delete');
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
            <Container>
                <Header>
                    <LeftHeader>
                        <h1>{event.title}</h1>
                        <div>{event.point}</div>
                    </LeftHeader>
                    <CloseCircleOutlined onClick={handle} />
                </Header>
                <hr className="solid"></hr>
                <Body>
                    <h2>{dateFormat(event.start.toString())}</h2>
                    <h2>{event.end.toString()}</h2>
                    <h2>{event.time}</h2>
                    <h2>{event.place}</h2>
                    <br></br>
                    <h2>{event.note}</h2>
                </Body>
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
            </Container>
        </BoxContainer>
    );
}

export default Detail;
const BoxContainer = styled.div`
    height: 100vh;
    z-index: 99;
    width: 100vw;
    background: rgba(0, 0, 0, 0.38);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: ${px2vw(340)};
    background: white;
    z-index: 100;
    position: absolute;
    border: 1px solid #45ce7c;
    top: translate(50%, 100%);
    min-height: ${px2vw(270)};
    border-radius: 10px;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        padding: 0 20px;
    }
    h1 {
        margin: 0 !important;
        margin-right: 12px !important;
    }
`;
const Body = styled.div`
    h2 {
        padding: 0 20px;
    }
`;
const Action = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
        width: calc(100% / 2);
        color: #45ce7c;
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${px2vw(40)};
        &:hover {
            background: #e6f8ec;
            color: black;
        }
    }
`;
const LeftHeader = styled.div`
    display: flex;
    align-items: center;
    div {
        text-align: center;
        width: ${px2vw(52)};
        background: #45ce7c;
        border-radius: 10px;
    }
`;

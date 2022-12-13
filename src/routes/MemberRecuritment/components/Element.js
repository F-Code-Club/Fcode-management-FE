import { useState } from 'react';

import { Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';

import { removeMile } from '../slice';
import EditBox from './EditBox';
import {
    MilestoneContainer,
    Hero,
    Time,
    Des,
    LeftSide,
    RightSide,
    ButtonContainer,
    Avatar,
    FirstButton,
    SecondButton,
    Form,
} from './styled';

import { toastSuccess } from '@/components/ToastNotification';
import { GlobalOutlined } from '@ant-design/icons';

function Element({ event }) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const handleOpenEdit = () => {
        setEdit(true);
    };
    const handleCloseButton = () => {
        setEdit(false);
    };
    const handleConfirm = (event) => {
        console.log('yes');
        dispatch(removeMile(event));
        toastSuccess('Sửa cột mốc thành công!!');
    };
    return (
        <MilestoneContainer>
            <LeftSide>
                <Hero>
                    <GlobalOutlined />
                    <h5> {event.title}</h5>
                </Hero>
                <Time>
                    <span>Thời gian diễn ra sự kiện:</span>
                    <br></br>
                    {`${event.startTime}-->${event.endTime}`}
                    <br></br>
                </Time>
                <Des>{event.description}</Des>
                <Form>Link của form : </Form>
            </LeftSide>
            <RightSide>
                <Avatar src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/298917782_2850144668625493_4934864891793808158_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mpP7YyiOqTYAX8M75XW&_nc_ht=scontent.fsgn2-1.fna&oh=00_AfD9vaSFisUWa9RbKDSwZ5lJdwovKurfXsjbijYlwm6Jrg&oe=63955A08" />
                <ButtonContainer>
                    <FirstButton onClick={() => handleOpenEdit()}>Chỉnh sửa</FirstButton>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa cột mốc này ?"
                        okText="Có "
                        cancelText="Không"
                        onConfirm={() => handleConfirm(event)}
                    >
                        <SecondButton>Xóa</SecondButton>
                    </Popconfirm>
                </ButtonContainer>
            </RightSide>
            {edit && <EditBox event={event} handle={handleCloseButton} />}
        </MilestoneContainer>
    );
}

export default Element;

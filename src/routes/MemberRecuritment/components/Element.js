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
    };
    const handleCancle = () => {
        alert('no');
    };
    return (
        <MilestoneContainer>
            <LeftSide>
                <Hero>
                    <GlobalOutlined />
                    <h5> {event.title}</h5>
                </Hero>
                <Time>
                    <span>Thời gian diễn ra sự kiện:</span> {`${event.start}-${event.end}`}
                </Time>
                <Des>{event.note}</Des>
                <Form>Link của form : </Form>
            </LeftSide>
            <RightSide>
                <Avatar src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t39.30808-6/306532790_3219170138299543_3944910915599319713_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=w8_bcFQ32_EAX8TFv7L&_nc_ht=scontent.fsgn2-2.fna&oh=00_AfBlONP4g6MpmQdsG0wQq7nTMzLVF8bQT4v_flx-EU-whA&oe=6380D749" />
                <ButtonContainer>
                    <FirstButton onClick={() => handleOpenEdit()}>Chỉnh sửa</FirstButton>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa cột mốc này ?"
                        okText="Có "
                        cancelText="Không"
                        onConfirm={() => handleConfirm(event)}
                        onCancel={() => handleCancle}
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

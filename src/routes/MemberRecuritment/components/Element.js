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
    CustomModal,
    ElementBox,
    FullDes,
} from './styled';

import { toastSuccess } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import { GlobalOutlined } from '@ant-design/icons';

function Element({ event }) {
    const [showMileStone, setShowMileStone] = useState(false);
    const token = localStorageUtils.getToken();
    const dispatch = useDispatch();
    function ChangeFormatDate(oldDate) {
        var date = new Date(oldDate);
        var newDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ';
        return newDate;
    }

    const [edit, setEdit] = useState(false);
    const handleOpenEdit = (event) => {
        event.stopPropagation();

        setEdit(true);
    };
    const handleCloseButton = () => {
        setEdit(false);
    };
    const handleConfirm = (event) => {
        productApi.removeChallenge(event.id, token);
        dispatch(removeMile(event));
        toastSuccess('Sửa cột mốc thành công!!');
    };
    const handleOk = () => {
        setShowMileStone(false);
    };
    const handleCancel = () => {
        setShowMileStone(false);
    };
    const handlePopConfirm = (event) => {
        event.stopPropagation();
    };
    return (
        <>
            <CustomModal
                open={showMileStone}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                closable={false}
            >
                <ElementBox>
                    <LeftSide>
                        <Hero>
                            <GlobalOutlined />
                            <h5> {event.title}</h5>
                        </Hero>
                        <Time>
                            <span>Thời gian diễn ra sự kiện:</span>
                            <br></br>
                            {`${ChangeFormatDate(event.startTime)}-->${ChangeFormatDate(
                                event.endTime
                            )}`}
                            <br></br>
                        </Time>
                        <FullDes>
                            <span>Nội Dung:</span>
                            {event.description}
                        </FullDes>
                    </LeftSide>
                    <RightSide>
                        <Avatar src="https://images.unsplash.com/photo-1671037028800-34d2839771a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                    </RightSide>
                </ElementBox>
            </CustomModal>
            <MilestoneContainer onClick={() => setShowMileStone(true)}>
                <LeftSide>
                    <Hero>
                        <GlobalOutlined />
                        <h5> {event.title}</h5>
                    </Hero>
                    <Time>
                        <span>Thời gian diễn ra sự kiện:</span>
                        <br></br>
                        {`${ChangeFormatDate(event.startTime)}-->${ChangeFormatDate(
                            event.endTime
                        )}`}
                        <br></br>
                    </Time>
                    <Des>
                        <span>Nội Dung:</span>
                        {event.description}
                    </Des>
                </LeftSide>
                <RightSide>
                    <Avatar src="https://images.unsplash.com/photo-1671037028800-34d2839771a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                    <ButtonContainer>
                        <FirstButton onClick={handleOpenEdit}>Chỉnh sửa</FirstButton>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa cột mốc này ?"
                            okText="Có "
                            cancelText="Không"
                            onClick={handlePopConfirm}
                            onConfirm={() => handleConfirm(event)}
                        >
                            <SecondButton>Xóa</SecondButton>
                        </Popconfirm>
                    </ButtonContainer>
                </RightSide>
            </MilestoneContainer>
            {edit && <EditBox event={event} handle={handleCloseButton} />}
        </>
    );
}

export default Element;

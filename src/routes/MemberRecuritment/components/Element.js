import { useState } from 'react';

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
    ConfirmModal,
    Message,
    MessageHero,
} from './styled';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PublicIcon from '@mui/icons-material/Public';

function Element({ event }) {
    const [showMileStone, setShowMileStone] = useState(false);
    const token = localStorageUtils.getToken();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleConfirm = async (event) => {
        try {
            const res = await productApi.removeChallenge(event.id, token);
            console.log(res);
            switch (res.data.code) {
                case 200:
                    dispatch(removeMile(event));
                    toastSuccess('Xóa cột mốc thành công!!');
                    break;
                case 408:
                    toastError('Token hết hạn !!!');
                    break;
            }
        } catch {
            toastError('Xóa cột mộc không thành công , vui lòng thử lại!!');
        } finally {
            setIsModalOpen(false);
        }
    };
    const handleOk = () => {
        setShowMileStone(false);
    };
    const handleCancel = () => {
        setShowMileStone(false);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };
    const handleOpenConfirm = (event) => {
        event.stopPropagation();
        setIsModalOpen(true);
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
                            <section>
                                <PublicIcon />
                            </section>
                            <h5> {event.title}</h5>
                        </Hero>
                        <Time>
                            <span>Thời gian diễn ra sự kiện: </span>
                            {`${ChangeFormatDate(event.startTime)} - ${ChangeFormatDate(
                                event.endTime
                            )}`}
                        </Time>
                        <FullDes>{event.description}</FullDes>
                    </LeftSide>
                    <RightSide>
                        <Avatar src="https://images.unsplash.com/photo-1671037028800-34d2839771a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                    </RightSide>
                </ElementBox>
            </CustomModal>
            <ConfirmModal
                width={416}
                height={188}
                open={isModalOpen}
                onOk={() => handleConfirm(event)}
                onCancel={handleClose}
                okText={'Xóa'}
                closable={false}
                cancelText={'Quay Lại'}
            >
                <Message>
                    <ExclamationCircleOutlined />
                    <MessageHero>
                        <h1>Bạn có muốn xóa cột mốc này không?</h1>
                        <p>Cột mốc sau khi xóa sẽ không thể khôi phục lại được.</p>
                    </MessageHero>
                </Message>
            </ConfirmModal>
            <MilestoneContainer onClick={() => setShowMileStone(true)}>
                <LeftSide>
                    <Hero>
                        <section>
                            <PublicIcon />
                        </section>
                        <h5> {event.title}</h5>
                    </Hero>
                    <Time>
                        <span>Thời gian diễn ra cột mốc: </span>
                        {`${ChangeFormatDate(event.startTime)} - ${ChangeFormatDate(
                            event.endTime
                        )}`}
                    </Time>
                    <Des>{event.description}</Des>
                </LeftSide>
                <RightSide>
                    <Avatar src="https://images.unsplash.com/photo-1671037028800-34d2839771a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                    <ButtonContainer>
                        <FirstButton onClick={handleOpenEdit}>Chỉnh sửa</FirstButton>
                        <SecondButton onClick={handleOpenConfirm}>Xóa</SecondButton>
                    </ButtonContainer>
                </RightSide>
            </MilestoneContainer>
            {edit && <EditBox event={event} handle={handleCloseButton} />}
        </>
    );
}

export default Element;

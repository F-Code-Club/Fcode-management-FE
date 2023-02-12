import { useState } from 'react';

import { Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';

import { removeEvent } from '../slice';
import {
    BoxContainer,
    DetailContainer,
    DetailHeader,
    LeftHeader,
    DetailBody,
    Action,
    EditButton,
    DeleteButton,
    RightHeader,
    ConfirmModal,
    Message,
    MessageHero,
} from '../styled';
import EditBox from './EditBox';

import { toastSuccess, toastError } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Detail({ event, handle }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorageUtils.getItem('token');
    const [isEditBoxOpen, setEditBoxOpen] = useState(false);
    const dispatch = useDispatch();
    const handleOpenEditBox = () => {
        setEditBoxOpen(true);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };
    const handleHandleConfirm = async (event) => {
        try {
            const res = await productApi.removeEvent(event.id, token);

            switch (res.data.code) {
                case 200:
                    dispatch(removeEvent(event));
                    toastSuccess('Xóa sự kiện thành công!!');
                    break;
                case 408:
                    toastError('Token hết hạn !!!');
                    break;
            }
        } catch {
            toastError('Xóa sự kiện không thành công , vui lòng thử lại!!');
        } finally {
            setIsModalOpen(false);
            handle();
        }
    };

    function ChangeFormateDate(oldDate) {
        var date = new Date(oldDate);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var newDate = day + '-' + month + '-' + date.getFullYear() + ' ';
        return newDate;
    }
    function changeFormatTime(oldDate) {
        var date = new Date(oldDate);
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var newTime = hour + ':' + minute;
        return newTime;
    }

    return (
        <BoxContainer>
            <ConfirmModal
                width={416}
                height={188}
                open={isModalOpen}
                onOk={() => handleHandleConfirm(event)}
                onCancel={handleClose}
                okText={'Xóa'}
                closable={false}
                cancelText={'Quay Lại'}
            >
                <Message>
                    <CloseCircleOutlined />
                    <MessageHero>
                        <h1>Bạn có muốn xoá sự kiện này?</h1>
                    </MessageHero>
                </Message>
            </ConfirmModal>
            <DetailContainer>
                <DetailHeader>
                    <LeftHeader>
                        <h1>{event.name}</h1>
                        <div>{event.point}</div>
                    </LeftHeader>
                    <RightHeader>
                        <CloseCircleOutlined onClick={handle} />
                    </RightHeader>
                </DetailHeader>
                <hr className="solid"></hr>
                <DetailBody>
                    <div className="wrap_place">
                        <h1>Ngày :</h1>
                        <h2>{`${ChangeFormateDate(event.startTime)} ➭ ${ChangeFormateDate(
                            event.endTime
                        )}`}</h2>
                    </div>
                    <div className="wrap_place">
                        <h1>Thời gian :</h1>
                        <h2>{`${changeFormatTime(event.startTime)} ➭ ${changeFormatTime(
                            event.endTime
                        )}`}</h2>
                    </div>
                    <div className="wrap_place">
                        <h1>Địa Điểm : </h1>
                        <h2 className="place">{`${event.location}`}</h2>
                    </div>
                    <h1>Ghi Chú :</h1>
                    <h2>{`${event.description}`}</h2>
                </DetailBody>
                <Action>
                    <EditButton onClick={handleOpenEditBox}>
                        <EditOutlined />
                    </EditButton>
                    <DeleteButton onClick={() => setIsModalOpen(true)}>
                        <DeleteOutlined />
                    </DeleteButton>
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

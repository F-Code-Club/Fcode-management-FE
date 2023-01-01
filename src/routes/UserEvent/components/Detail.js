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
} from '../styled';
import EditBox from './EditBox';

import { toastSuccess } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Detail({ event, handle }) {
    const token = localStorageUtils.getItem('token');
    const [isEditBoxOpen, setEditBoxOpen] = useState(false);
    const dispatch = useDispatch();
    const handleOpenEditBox = () => {
        setEditBoxOpen(true);
    };

    const handleConfirm = async (event) => {
        await productApi.removeEvent(event.id, token);
        dispatch(removeEvent(event));
        handle();
        toastSuccess('Xóa sự kiến thành công!!');
    };
    function ChangeFormateDate(oldDate) {
        var date = new Date(oldDate);

        var newDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ';
        return newDate;
    }
    function changeFormatTime(oldDate) {
        var date = new Date(oldDate);
        var newTime = date.getHours() + ':' + date.getMinutes();
        return newTime;
    }

    return (
        <BoxContainer>
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
                    <div>
                        <h1>Ngày :</h1>
                        <h2>{`${ChangeFormateDate(event.startTime)} ➭ ${ChangeFormateDate(
                            event.endTime
                        )}`}</h2>
                    </div>
                    <div>
                        <h1>Thời gian :</h1>
                        <h2>{`${changeFormatTime(event.startTime)} ➭ ${changeFormatTime(
                            event.endTime
                        )}`}</h2>
                    </div>
                    <div>
                        <h1>Địa Điểm : </h1>
                        <h2>{`${event.location}`}</h2>
                    </div>
                    <h1>Ghi Chú :</h1>
                    <h2>{`${event.description}`}</h2>
                </DetailBody>
                <Action>
                    <EditButton onClick={handleOpenEditBox}>
                        <EditOutlined />
                    </EditButton>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa sự kiện  này ?"
                        okText="Có "
                        cancelText="Không"
                        onConfirm={() => handleConfirm(event)}
                    >
                        <DeleteButton>
                            <DeleteOutlined />
                        </DeleteButton>
                    </Popconfirm>
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

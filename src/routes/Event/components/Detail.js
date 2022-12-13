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
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Detail({ event, handle }) {
    const [isEditBoxOpen, setEditBoxOpen] = useState(false);
    const dispatch = useDispatch();
    const handleOpenEditBox = () => {
        setEditBoxOpen(true);
    };

    const handleConfirm = (event) => {
        dispatch(removeEvent(event));
        handle();
        toastSuccess('Xóa sự kiến thành công!!');
    };
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
                    <h2>{`${event.startTime} - ${event.endTime}`}</h2>

                    <br></br>
                    <h2>{`Địa Điểm : ${event.location}`}</h2>
                    <br></br>
                    <h2>{`Ghi Chú : ${event.description}`}</h2>
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

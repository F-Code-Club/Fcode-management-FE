import { useState } from 'react';

import { Button, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { RenderList } from './components/RenderList';
import { actions } from './slice';
import { selectAnnounce } from './slice/selectors';
import { ContainerAnnouncement } from './style';

import { ConfirmAction } from '@/components/Popup/PopupConfirm';
import { CreateAnnouncement } from '@/components/Popup/PopupEditor';
import { toastError, toastSuccess } from '@/components/ToastNotification';

export const ManageAnnouncement = () => {
    const [state, setState] = useState({
        popupEditor: {
            status: false,
            type: '',
            content: '',
            title: '',
            imgs: [],
            id: '',
            sendAll: false,
        },
        popupConfirm: {
            status: false,
            id: '',
            title: '',
            content: '',
            icon: '',
            buttonValue: '',
        },
    });

    const dispatch = useDispatch();
    const listAnnounce = useSelector(selectAnnounce);

    const handleCreate = async (status, newAnnouncement) => {
        const typeWork = state.popupEditor.type;
        if (status) {
            let addId = 1;
            if (typeWork === 'create') {
                if (listAnnounce.length > 0)
                    listAnnounce.map((todo) => todo.id == addId && (addId = todo.id + 1));
            } else {
                addId = state.popupEditor.id;
                await dispatch(actions.deleteAnnounce(state.popupEditor.id));
            }

            await dispatch(actions.addAnnounce({ ...newAnnouncement, id: addId }));
            toastSuccess(
                `Thông báo đã được ${typeWork === 'create' ? 'tạo' : 'chỉnh sửa'} thành công`
            );
        } else
            toastError(`${typeWork === 'create' ? 'Tạo' : 'Chỉnh sửa'} thông báo không thành công`);
        await setState({
            ...state,
            popupEditor: {
                status: false,
            },
        });
    };

    const handleDelete = async (status) => {
        if (status) {
            await dispatch(actions.deleteAnnounce(state.popupConfirm.id));
            toastSuccess('Thông báo đã được xóa thành công');
        } else toastError('Xóa thông báo không thành công');
        await setState({
            ...state,
            popupConfirm: {
                status: false,
            },
        });
    };

    const handleClick = (action, item) => {
        switch (action) {
            case 'create':
                setState({
                    ...state,
                    popupEditor: {
                        status: true,
                        type: 'create',
                        content: '',
                    },
                });
                break;
            case 'edit':
                setState({
                    ...state,
                    popupEditor: {
                        status: true,
                        type: 'edit',
                        content: item.content,
                        title: item.title,
                        imgs: item.imgs,
                        id: item.id,
                        sendAll: item.sendAll,
                    },
                });
                break;
            case 'delete':
                setState({
                    ...state,
                    popupConfirm: {
                        status: true,
                        id: item.id,
                        title: 'Bạn có chắc muốn xóa thông báo này?',
                        content: 'Thông báo này sẽ được xóa vĩnh viễn.',
                        icon: 'delete',
                        buttonValue: 'Xóa',
                    },
                });
                break;
        }
    };

    return (
        <ContainerAnnouncement>
            <div>
                <h3 style={{ marginBottom: '2rem' }}>
                    Tạo thông báo mới:&emsp;
                    <Button className="btn-edit" onClick={() => handleClick('create', null)}>
                        Nhấn vào đây để tạo
                    </Button>
                </h3>
                <h2>
                    <b>THÔNG BÁO ĐÃ TẠO</b>
                </h2>
            </div>
            <List
                itemLayout="vertical"
                size="large"
                className="list-announcement"
                pagination={{ pageSize: 3 }}
                dataSource={[...listAnnounce].reverse()}
                renderItem={(item) => <RenderList item={item} handleClick={handleClick} />}
            />
            {state.popupEditor.status && (
                <CreateAnnouncement
                    action={handleCreate}
                    type={state.popupEditor.type}
                    title={state.popupEditor.title}
                    content={state.popupEditor.content}
                    imgs={state.popupEditor.imgs}
                    sendAll={state.popupEditor.sendAll}
                />
            )}
            {state.popupConfirm.status && (
                <ConfirmAction
                    title={state.popupConfirm.title}
                    content={state.popupConfirm.content}
                    buttonValue={state.popupConfirm.buttonValue}
                    icon={state.popupConfirm.icon}
                    action={handleDelete}
                />
            )}
        </ContainerAnnouncement>
    );
};

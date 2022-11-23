import { useState } from 'react';

import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../slice';
import { selectAnnounce } from '../slice/selectors';
import { ConfirmAction } from './PopupConfirmResource';
import { CreateAnnouncement } from './Test';

import { toastError, toastSuccess } from '@/components/ToastNotification';

const ModalResource = () => {
    const [modalOpen, setModalOpen] = useState({
        popupEditor: {
            status: false,
            type: '',
            description: '',
            title: '',
            imgs: [],
            id: '',
        },
        popupConfirm: {
            status: false,
            id: '',
            title: '',
            description: '',
            icon: '',
            buttonValue: '',
        },
    });
    const dispatch = useDispatch();
    const listAnnounce = useSelector(selectAnnounce);

    const handleCreate = async (status, newAnnouncement) => {
        const typeWork = modalOpen.popupEditor.type;
        if (status) {
            let addId = 1;
            if (typeWork === 'create') {
                if (listAnnounce.length > 0)
                    listAnnounce.map((todo) => todo.id == addId && (addId = todo.id + 1));
            } else {
                addId = modalOpen.popupEditor.id;
                await dispatch(actions.deleteAnnounce(modalOpen.popupEditor.id));
            }

            await dispatch(actions.addAnnounce({ ...newAnnouncement, id: addId }));
            toastSuccess(
                `Thông báo đã được ${typeWork === 'create' ? 'tạo' : 'chỉnh sửa'} thành công`
            );
        } else
            toastError(`${typeWork === 'create' ? 'Tạo' : 'Chỉnh sửa'} thông báo không thành công`);
        await setModalOpen({
            ...modalOpen,
            popupEditor: {
                status: false,
            },
        });
    };

    const handleDelete = async (status) => {
        if (status) {
            await dispatch(actions.deleteAnnounce(modalOpen.popupConfirm.id));
            toastSuccess('Thông báo đã được xóa thành công');
        } else toastError('Xóa thông báo không thành công');
        await setModalOpen({
            ...modalOpen,
            popupConfirm: {
                status: false,
            },
        });
    };
    const CreateResource = (action, item) => {
        switch (action) {
            case 'create':
                setModalOpen({
                    ...modalOpen,
                    popupEditor: {
                        status: true,
                        type: 'create',
                        content: '',
                    },
                });
                break;
            case 'edit':
                setModalOpen({
                    ...modalOpen,
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
                setModalOpen({
                    ...modalOpen,
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
        <>
            <Button type="primary" onClick={() => CreateResource('create', null)}>
                Vertically centered modal dialog
            </Button>
            {modalOpen.popupEditor.status && (
                <CreateAnnouncement
                    action={handleCreate}
                    type={modalOpen.popupEditor.type}
                    title={modalOpen.popupEditor.title}
                    description={modalOpen.popupEditor.description}
                    imgs={modalOpen.popupEditor.imgs}
                />
            )}
            {modalOpen.popupConfirm.status && (
                <ConfirmAction
                    title={modalOpen.popupConfirm.title}
                    content={modalOpen.popupConfirm.content}
                    buttonValue={modalOpen.popupConfirm.buttonValue}
                    icon={modalOpen.popupConfirm.icon} //op1: 'delete', op2: 'retry'
                    action={handleDelete}
                />
            )}
        </>
    );
};

export default ModalResource;

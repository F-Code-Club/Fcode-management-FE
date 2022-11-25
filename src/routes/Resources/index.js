// import * as Styled from '../Blog/Blog.styled';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { CreateResource } from './components/CreateResource';
import HeaderResource from './components/HeaderResource';
import ListResource from './components/ListResource';
import { ConfirmAction } from './components/PopupConfirmResource';
import { actions } from './slice';
import { selectResources } from './slice/selectors';
import { Wrapper, Container } from './styles';

import { toastError, toastSuccess } from '@/components/ToastNotification';

const ResourcesSection = () => {
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
    const listResources = useSelector(selectResources);
    console.log(listResources);
    const handleCreate = async (status, newAnnouncement) => {
        const typeWork = modalOpen.popupEditor.type;
        if (status) {
            let addId = 1;
            if (typeWork === 'create') {
                if (listResources.length > 0)
                    listResources.map(
                        (resource) => resource.id == addId && (addId = resource.id + 1)
                    );
            } else {
                addId = modalOpen.popupEditor.id;
                await dispatch(actions.deleteResource(modalOpen.popupEditor.id));
            }

            await dispatch(actions.addResource({ ...newAnnouncement, id: addId }));
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
    const handleResourceAction = (action, item) => {
        switch (action) {
            case 'create':
                setModalOpen({
                    ...modalOpen,
                    popupEditor: {
                        status: true,
                        type: 'create',
                        description: '',
                    },
                });
                break;
            case 'edit':
                setModalOpen({
                    ...modalOpen,
                    popupEditor: {
                        status: true,
                        type: 'edit',
                        description: item.description,
                        title: item.title,
                        imgs: item.imgs,
                        id: item.id,
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
                        description: 'Thông báo này sẽ được xóa vĩnh viễn.',
                        icon: 'delete',
                        buttonValue: 'Xóa',
                    },
                });
                break;
        }
    };

    return (
        <>
            <Container>
                <Wrapper>
                    <ListResource handleClick={handleResourceAction} />
                    <HeaderResource handleClick={handleResourceAction} />
                </Wrapper>
                {modalOpen.popupEditor.status && (
                    <CreateResource
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
                        description={modalOpen.popupConfirm.description}
                        buttonValue={modalOpen.popupConfirm.buttonValue}
                        icon={modalOpen.popupConfirm.icon} //op1: 'delete', op2: 'retry'
                        action={handleDelete}
                    />
                )}
            </Container>
        </>
    );
};

export default ResourcesSection;

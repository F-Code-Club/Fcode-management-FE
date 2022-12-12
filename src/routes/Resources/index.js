// import * as Styled from '../Blog/Blog.styled';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { CreateResource } from './components/CreateResource';
import HeaderResource from './components/HeaderResource';
import ListResource from './components/ListResource';
import { ConfirmAction } from './components/PopupConfirmResource';
import { actions, fetchAllSubject } from './slice';
// import { selectResources } from './slice/selectors';
import { Wrapper, Container } from './styles';

import { toastError, toastSuccess } from '@/components/ToastNotification';

// import productApi from '@/utils/productApi';

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
    // const listResources = useSelector(selectResources);

    const handleCreate = async (status) => {
        const typeWork = modalOpen.popupEditor.type;
        if (status) {
            toastSuccess(
                `Tài nguyên đã được ${typeWork === 'create' ? 'tạo' : 'chỉnh sửa'} thành công`
            );
        } else
            toastError(
                `${typeWork === 'create' ? 'Tạo' : 'Chỉnh sửa'} tài nguyên không thành công`
            );
        await setModalOpen({
            ...modalOpen,
            popupEditor: {
                status: false,
            },
        });
    };

    const handleDelete = async (status) => {
        if (status) {
            await dispatch(actions.deleteResource(modalOpen.popupConfirm.id));
            toastSuccess('Tài nguyên đã được xóa thành công');
        } else toastError('Xóa tài nguyên không thành công');
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
                        title: 'Bạn có chắc muốn xóa tài nguyên này?',
                        description: 'Tài nguyên này sẽ được xóa vĩnh viễn.',
                        icon: 'delete',
                        buttonValue: 'Xóa',
                    },
                });
                break;
        }
    };
    useEffect(() => {
        dispatch(fetchAllSubject());
    }, []);
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
                        icon={modalOpen.popupConfirm.icon}
                        action={handleDelete}
                    />
                )}
            </Container>
        </>
    );
};

export default ResourcesSection;

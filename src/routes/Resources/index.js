// import * as Styled from '../Blog/Blog.styled';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../Auth/slice/selector';
import { CreateResource } from './components/CreateResource';
import HeaderResource from './components/HeaderResource';
import ListResource from './components/ListResource';
import { ConfirmAction } from './components/PopupConfirmResource';
import { actions } from './slice';
// import { selectResources } from './slice/selectors';
import { Wrapper, Container } from './styles';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import productApi from '@/utils/apiComponents/productApi';
import usePersistedState from '@/utils/usePersistedState';

const ResourcesSection = () => {
    // const user = useSelector(selectUser);
    // const userPersisted = usePersistedState('user', JSON.stringify(user))[0];
    // let userParse = JSON.parse(userPersisted);
    const [modalOpen, setModalOpen] = useState({
        popupEditor: {
            status: false,
            type: '',
            description: '',
            title: '',
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
    const [data, setData] = useState();
    // const listResources = useSelector(selectResources);

    const handleCreate = async (status, message) => {
        const typeWork = modalOpen.popupEditor.type;

        if (status) {
            toastSuccess(
                `Môn học đã được ${typeWork === 'create' ? 'tạo' : 'chỉnh sửa'} thành công`
            );
        } else
            toastError(
                `${
                    typeWork === 'create' ? 'Tạo' : 'Chỉnh sửa'
                }  không thành công, bạn bị trùng môn học`
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
            toastSuccess('Môn học đã được xóa thành công');
        } else toastError('Xóa môn học không thành công');
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
                        title: 'Bạn có chắc muốn xóa môn học này?',
                        description: 'Môn học này sẽ được xóa vĩnh viễn.',
                        icon: 'delete',
                        buttonValue: 'Xóa',
                    },
                });
                break;
        }
    };
    const fetchAllSubject = async () => {
        const result = await productApi.getAllSubject();
        if (result.data.code === 200) setData(result.data.data);
    };
    useEffect(() => {
        fetchAllSubject();
    }, []);
    return (
        <>
            <Container>
                <Wrapper>
                    <ListResource resource={data} handleClick={handleResourceAction} />
                    <HeaderResource handleClick={handleResourceAction} />
                </Wrapper>
                {modalOpen.popupEditor.status && (
                    <CreateResource
                        fetchAllSubject={fetchAllSubject}
                        action={handleCreate}
                        type={modalOpen.popupEditor.type}
                        title={modalOpen.popupEditor.title}
                        description={modalOpen.popupEditor.description}
                        id={modalOpen.popupEditor.id}
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

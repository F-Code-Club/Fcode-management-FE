import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ConfirmAction } from '../components/PopupConfirmResource';
import { selectResources } from '../slice/selectors';
import { CreateResourceChild } from './components/CreateResourceChild';
import TabsCard from './components/Tabs_card';
import ViewResourceHeader from './components/ViewResourceHeader';
import { actions } from './slice';
import { selectResourceChild } from './slice/selector';
import { ViewResourceContainer, WrapperViewResource } from './styled';

import { toastError, toastSuccess } from '@/components/ToastNotification';

const ViewResource = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState();
    const listResources = useSelector(selectResources);
    const listResourceChildren = useSelector(selectResourceChild);

    useEffect(() => {
        let item = null;
        for (let i = 0; i < listResources.length; i++) {
            if (listResources[i].id == id) {
                item = listResources[i];
                break;
            }
        }
        if (item != null) {
            setState(item);
        } else {
            navigate('/manage-resources');
        }
    }, [id]);
    const [modalOpen, setModalOpen] = useState({
        popupEditor: {
            status: false,
            type: '',
            description: '',
            title: '',
            link: '',
            imgs: [],
            id: '',
        },
        popupConfirm: {
            status: false,
            id: '',
            title: '',
            description: '',
            link: '',
            icon: '',
            buttonValue: '',
        },
    });
    const dispatch = useDispatch();

    const handleCreate = async (status, newResourceChild) => {
        const typeWork = modalOpen.popupEditor.type;

        if (status) {
            let addId = 1;
            if (typeWork === 'create') {
                if (listResourceChildren.length > 0)
                    listResourceChildren.map(
                        (resource) => resource.id == addId && (addId = resource.id + 1)
                    );
            } else {
                addId = modalOpen.popupEditor.id;
                await dispatch(actions.deleteResourceChild(modalOpen.popupEditor.id));
            }
            await dispatch(actions.addResourceChild({ ...newResourceChild, id: addId }));
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
            await dispatch(actions.deleteResourceChild(modalOpen.popupConfirm.id));
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
                        link: '',
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
    return (
        <ViewResourceContainer>
            {state && (
                <WrapperViewResource>
                    <TabsCard />
                    <ViewResourceHeader
                        title={state.title}
                        DescriptionMore={state.description}
                        handleClick={handleResourceAction}
                    />
                </WrapperViewResource>
            )}

            {modalOpen.popupEditor.status && (
                <CreateResourceChild
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
        </ViewResourceContainer>
    );
};
export default ViewResource;

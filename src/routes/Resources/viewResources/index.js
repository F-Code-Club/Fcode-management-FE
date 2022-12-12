import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ConfirmAction } from '../components/PopupConfirmResource';
import { selectIsLoading } from '../slice/selectors';
import { CreateResourceChild } from './components/CreateResourceChild';
import TabsCard from './components/Tabs_card';
import ViewResourceHeader from './components/ViewResourceHeader';
import { actions } from './slice';
import { selectResourceChild } from './slice/selector';
import { ViewResourceContainer, WrapperViewResource } from './styled';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import productApi from '@/utils/apiComponents/productApi';

const ViewResource = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    // const [state, setState] = useState();
    const [resourceChild, setResourceChild] = useState();
    const [subject, setSubject] = useState();
    const listResourceChildren = useSelector(selectResourceChild);

    let tmpNewResource;
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
    const fetchResourceBySubjectId = async () => {
        const result = await productApi.getResourceBySubjectId(id);
        if (result.data.code === 400) {
            await setResourceChild(result.data.data);
            console.log(result.data.message);
        } else await setResourceChild(result.data.data);
        const response = await productApi.getSubjectById(id);
        if (response.data.code === 200) {
            await setSubject(response.data.data);
        }
    };

    useEffect(() => {
        fetchResourceBySubjectId();
    }, [id]);
    const IsLoading = useSelector(selectIsLoading);
    if (IsLoading) {
        return <div>...Loading</div>;
    }
    if (resourceChild === null || resourceChild === undefined) {
        tmpNewResource = [{ title: 'unknown', description: 'unknown', link: 'unknown' }];
    } else tmpNewResource = resourceChild;

    console.log('line 157: ', tmpNewResource);
    return (
        <ViewResourceContainer>
            {tmpNewResource && (
                <WrapperViewResource>
                    <TabsCard resourceChild={tmpNewResource} />
                    <ViewResourceHeader
                        title={subject.semester}
                        DescriptionMore={subject.name}
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

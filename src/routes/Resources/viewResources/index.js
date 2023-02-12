import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ConfirmAction } from '../components/PopupConfirmResource';
import { selectIsLoading } from '../slice/selectors';
import { CreateResourceChild } from './components/CreateResourceChild';
import TabsCard from './components/Tabs_card';
import ViewResourceHeader from './components/ViewResourceHeader';
import { actions } from './slice';
import { ViewResourceContainer, WrapperViewResource } from './styled';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import productApi from '@/utils/apiComponents/productApi';

const ViewResource = () => {
    const { id } = useParams();

    // const navigate = useNavigate();
    // const [state, setState] = useState();
    const [resourceChild, setResourceChild] = useState();
    const [subject, setSubject] = useState();

    let tmpSubject;
    const [modalOpen, setModalOpen] = useState({
        popupEditor: {
            status: false,
            type: '',
            description: '',
            title: '',
            url: '',
            subjectId: '',
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

    const handleCreate = async (status, message) => {
        const typeWork = modalOpen.popupEditor.type;

        if (status) {
            toastSuccess(
                `Tài nguyên đã được ${typeWork === 'create' ? 'tạo' : 'chỉnh sửa'} thành công`
            );
        } else
            toastError(
                `${typeWork === 'create' ? 'Tạo' : 'Chỉnh sửa'} tài nguyên không thành công ${
                    message ? message : ''
                }`
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
                        url: '',
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
                        title: item.contributor,
                        url: item.url,
                        id: item.id,
                        subjectId: item.subjectId,
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

    const fetchResourceBySubjectId = async () => {
        const result = await productApi.getResourceBySubjectId(id);
        if (result.data.code === 400) {
            await setResourceChild(result.data.data);
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

    if (subject === null || subject === undefined) {
        tmpSubject = [{ semester: 'unknown', name: 'unknown' }];
    } else tmpSubject = subject;

    return (
        <ViewResourceContainer>
            {tmpSubject && (
                <WrapperViewResource>
                    <TabsCard resourceChild={resourceChild} handleClick={handleResourceAction} />
                    <ViewResourceHeader
                        title={tmpSubject.semester}
                        DescriptionMore={tmpSubject.name}
                        handleClick={handleResourceAction}
                    />
                </WrapperViewResource>
            )}

            {modalOpen.popupEditor.status && (
                <CreateResourceChild
                    resourceChild={resourceChild}
                    fetchResourceBySubjectId={fetchResourceBySubjectId}
                    subject={id}
                    action={handleCreate}
                    type={modalOpen.popupEditor.type}
                    title={modalOpen.popupEditor.title}
                    description={modalOpen.popupEditor.description}
                    url={modalOpen.popupEditor.url}
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
        </ViewResourceContainer>
    );
};
export default ViewResource;

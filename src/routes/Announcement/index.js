import { useEffect, useState } from 'react';

import { Button, List } from 'antd';

import { RenderList } from './components/RenderList';
import { ContainerAnnouncement } from './style';

import { ConfirmAction } from '@/components/Popup/PopupConfirm';
import { CreateAnnouncement } from '@/components/Popup/PopupEditor';
import { toastError, toastSuccess } from '@/components/ToastNotification';
import { get, post, put, remove } from '@/utils/ApiCaller';

export const ManageAnnouncement = () => {
    const token = localStorage.getItem('token');

    const [state, setState] = useState({
        popupEditor: {
            status: false,
        },
        popupConfirm: {
            status: false,
        },
    });

    const [dataAnnounce, setDataAnnounce] = useState();
    const [reload, setReload] = useState(1);

    useEffect(() => {
        get('/announcement/all', '', { authorization: token })
            .then((res) => setDataAnnounce(res.data.data.reverse()))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
    }, [reload]);

    ////////////////////////////////////////////////////////////////

    //////////////////////////////////
    const handleCreate = (status, newAnnouncement) => {
        const typeWork = state.popupEditor.type;
        if (status) {
            switch (typeWork) {
                case 'create':
                    post(
                        '/announcement',
                        {
                            ...newAnnouncement,
                            mailTitle: newAnnouncement.title,
                            mail:
                                '<b>Thân gửi bạn: ${name} &emsp;&emsp;&emsp; MSSV: ${studentId}</b>' +
                                newAnnouncement.description,
                            location: 'Việt Nam',
                        },
                        {},
                        {
                            authorization: token,
                        }
                    )
                        .then((res) => {
                            if (res.data.code == 200) {
                                setReload(reload + 1);
                                toastSuccess('Thông báo đã được tạo thành công');
                            } else toastError(`Tạo thông báo không thành công ${res.data.message}`);
                        })
                        .catch((error) => {
                            toastError('Tạo thông báo không thành công');
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });

                    break;
                case 'edit':
                    put(
                        '/announcement',
                        {
                            ...newAnnouncement,
                            mailTitle: newAnnouncement.title,
                            mail:
                                '<b>Thân gửi bạn: ${name} &emsp;&emsp;&emsp; MSSV: ${studentId}</b>' +
                                newAnnouncement.description,
                            location: 'Việt Nam',
                            sendEmailWhenUpdate: true,
                        },
                        {},
                        {
                            authorization: token,
                        }
                    )
                        .then((res) => {
                            if (res.data.code == 200) {
                                setReload(reload + 1);
                                toastSuccess('Thông báo đã được chỉnh sửa thành công');
                            } else
                                toastError(
                                    `Chỉnh sửa thông báo không thành công ${res.data.message}`
                                );
                        })
                        .catch((error) => {
                            toastError('Chỉnh sửa thông báo không thành công');
                            // eslint-disable-next-line no-console
                            console.log(error);
                        });
                    break;
            }
        }
        setState({
            ...state,
            popupEditor: {
                status: false,
            },
        });
        document.body.style.overflow = 'unset';
    };

    const handleDelete = (status) => {
        if (status) {
            remove(`/announcement/one/${state.popupConfirm.id}`, '', '', {
                authorization: token,
            })
                .then((res) => {
                    if (res.data.code == 200) {
                        setReload(reload + 1);
                        toastSuccess('Thông báo đã được xóa thành công');
                    } else toastError(`Xóa thông báo không thành công ${res.data.message}`);
                })
                // eslint-disable-next-line no-console
                .catch((err) => console.log(err));
        }
        setState({
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
                        description: '',
                    },
                });
                document.body.style.overflow = 'hidden';

                break;
            case 'edit':
                setState({
                    ...state,
                    popupEditor: {
                        status: true,
                        type: 'edit',
                        description: item.description,
                        title: item.title,
                        imageUrl: item.imageUrl,
                        id: item.id,
                        infoGroup: item.infoGroup,
                        infoUserId: item.infoUserId,
                    },
                });
                document.body.style.overflow = 'hidden';
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
                dataSource={dataAnnounce}
                renderItem={(item) => <RenderList item={item} handleClick={handleClick} />}
            />
            {state.popupEditor.status && (
                <CreateAnnouncement
                    action={handleCreate}
                    type={state.popupEditor.type}
                    title={state.popupEditor.title}
                    description={state.popupEditor.description}
                    imageUrl={state.popupEditor.imageUrl}
                    sendAll={state.popupEditor.sendAll}
                    infoUserId={state.popupEditor.infoUserId}
                    infoGroup={state.popupEditor.infoGroup}
                    id={state.popupEditor.id}
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

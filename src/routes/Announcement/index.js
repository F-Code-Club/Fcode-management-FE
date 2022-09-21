import { useState } from 'react';

import { Avatar, Button, Carousel, Image, List } from 'antd';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NoPhoto from '../../assets/no-photo.jpg';
import { DataSlick } from './components/Slick/slick';
import { actions } from './slice';
import { selectAnnounce } from './slice/selectors';
import { ContainerAnnouncement } from './style';

import { ConfirmAction } from '@/components/Popup/PopupConfirm';
import { CreateAnnouncement } from '@/components/Popup/PopupEditor';
import { PopupSuccess } from '@/components/Popup/PopupSuccess';

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
        popupSuccess: {
            status: false,
            title: '',
            buttonValue: '',
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
    const navigate = useNavigate();

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
        }
        await setState({
            ...state,
            popupEditor: {
                status: false,
            },
            popupSuccess: {
                status: status,
                title: `Thông báo đã được ${
                    typeWork === 'create' ? 'tạo' : 'chỉnh sửa'
                } thành công`,
                buttonValue: 'Đóng',
            },
        });
    };

    const handleDelete = async (status) => {
        if (status) await dispatch(actions.deleteAnnounce(state.popupConfirm.id));

        await setState({
            ...state,
            popupConfirm: {
                status: false,
            },
            popupSuccess: {
                status: status,
                title: 'Thông báo đã được xóa thành công',
                buttonValue: 'Đóng',
            },
        });
    };

    const handleSuccess = async () => {
        await setState({
            ...state,
            popupSuccess: {
                status: false,
            },
        });
    };

    const ImageAnnouncement = (DataImg) => {
        switch (DataImg.length) {
            case 0:
                return (
                    <Image src={NoPhoto} alt="no-image-announcement" style={{ width: '100%' }} />
                );
            case 1:
                return (
                    <Image
                        src={DataImg[0]}
                        alt="image-item-announcement"
                        style={{ width: '100%' }}
                    />
                );
            default:
                return (
                    <Carousel {...DataSlick}>
                        {DataImg.map((todo, key) => (
                            <div key={key}>
                                <Image
                                    src={todo}
                                    alt="image-item-announcement"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ))}
                    </Carousel>
                );
        }
    };

    return (
        <ContainerAnnouncement>
            <div>
                <h3 style={{ marginBottom: '2rem' }}>
                    Tạo thông báo mới:&emsp;
                    <Button
                        className="btn-edit"
                        onClick={() =>
                            setState({
                                ...state,
                                popupEditor: {
                                    status: true,
                                    type: 'create',
                                    content: '',
                                },
                            })
                        }
                    >
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
                renderItem={(item) => (
                    <List.Item key={item.id} extra={ImageAnnouncement(item.imgs)}>
                        <List.Item.Meta
                            avatar={<Avatar size="large" src={item.avatarAdmin} />}
                            title={<h4 style={{ marginBottom: 0 }}>{item.title}</h4>}
                            description={item.nameAdmin}
                        />
                        <Editor
                            editorState={EditorState.createWithContent(
                                convertFromRaw(JSON.parse(item.content))
                            )}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            readOnly="false"
                        />
                        <div className="btn-manage-announcement">
                            <Button
                                className="btn-edit"
                                onClick={() =>
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
                                    })
                                }
                            >
                                Chỉnh sửa
                            </Button>
                            <Button
                                className="btn-view"
                                onClick={() => navigate(`view-announcement/${item.id}`)}
                            >
                                Xem chi tiết
                            </Button>
                            <Button
                                className="btn-delete"
                                onClick={() =>
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
                                    })
                                }
                            >
                                Xóa
                            </Button>
                        </div>
                    </List.Item>
                )}
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
                    icon={state.popupConfirm.icon} //op1: 'delete', op2: 'retry'
                    action={handleDelete}
                />
            )}
            {state.popupSuccess.status && (
                <PopupSuccess
                    title={state.popupSuccess.title}
                    buttonValue={state.popupSuccess.buttonValue}
                    action={handleSuccess}
                />
            )}
        </ContainerAnnouncement>
    );
};

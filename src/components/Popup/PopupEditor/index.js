import { useState } from 'react';

import { Button, Input } from 'antd';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { ConfirmAction } from '../PopupConfirm';
import { UploadImage } from './UploadImg';
import { ContainerEditor, FirstLayer } from './style';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateAnnouncement = (props) => {
    const action = props.action;
    const [newAnnouncement, setNewAnnouncement] = useState({
        avatarAdmin:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkpclgdZQ3ZHBh6xTt4wlROP30NE_GY7MdVw&usqp=CAU',
        nameAdmin: 'Trương Lê Tuấn Kiệt',
        title: props.type === 'edit' ? props.title : '',
        content:
            props.type === 'edit'
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))
                : EditorState.createEmpty(),
        sendAll: props.type === 'edit' ? props.sendAll : '',
        imgs: props.type === 'edit' ? props.imgs : [],
    });
    const [processState, setProcessState] = useState({
        cancel: {
            status: false,
        },
        save: {
            status: false,
        },
    });

    const handleCancelProcess = async (status) => {
        await setProcessState({
            ...processState,
            cancel: {
                status: false,
            },
        });
        if (status) await action(false, null);
    };
    const handleSaveProcess = async (status) => {
        await setProcessState({
            ...processState,
            save: {
                status: false,
            },
        });
        if (status) {
            const convertContent = JSON.stringify(
                convertToRaw(newAnnouncement.content.getCurrentContent())
            );
            await action(true, { ...newAnnouncement, content: convertContent });
        }
    };

    return (
        <ContainerEditor>
            <FirstLayer
                onClick={() =>
                    setProcessState({
                        ...processState,
                        cancel: {
                            status: true,
                        },
                    })
                }
            ></FirstLayer>
            <div className="editor">
                <h3>
                    <span style={{ color: 'red' }}>* </span>
                    Tiêu đề thông báo
                </h3>
                <Input
                    placeholder="THÔNG BÁO HỌP CÂU LẠC BỘ"
                    style={{ marginBottom: '0.5rem' }}
                    value={newAnnouncement.title}
                    onChange={(e) =>
                        setNewAnnouncement({
                            ...newAnnouncement,
                            title: e.target.value,
                        })
                    }
                />
                <h3>
                    <span style={{ color: 'red' }}>* </span>
                    Nội dung thông báo
                </h3>
                <Editor
                    editorState={newAnnouncement.content}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={(value) =>
                        setNewAnnouncement({
                            ...newAnnouncement,
                            content: value,
                        })
                    }
                />
                <UploadImage
                    type={props.type}
                    imgs={props.imgs}
                    onChange={(e) =>
                        setNewAnnouncement({
                            ...newAnnouncement,
                            imgs: e,
                        })
                    }
                />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        name="confirm-send-mail-to-all"
                        style={{ marginRight: '10px' }}
                        checked={newAnnouncement.sendAll}
                        onChange={(e) =>
                            setNewAnnouncement({
                                ...newAnnouncement,
                                sendAll: e.target.checked,
                            })
                        }
                    />
                    <span>Bạn có muốn gửi mail đến toàn CLB</span>
                </div>

                <div className="container-btn">
                    <Button
                        className="save-btn"
                        onClick={() =>
                            setProcessState({
                                ...processState,
                                save: {
                                    status: true,
                                },
                            })
                        }
                    >
                        {props.type === 'edit' ? 'Lưu chỉnh sửa' : 'Tạo thông báo'}
                    </Button>
                </div>
            </div>
            {processState.cancel.status && (
                <ConfirmAction
                    title={`Bạn có chắc muốn hủy việc ${
                        props.type === 'edit' ? 'chỉnh sửa' : 'tạo'
                    } thông báo này không?`}
                    content=""
                    buttonValue="Đồng ý"
                    icon="delete" //op1: 'delete', op2: 'retry'
                    action={handleCancelProcess}
                />
            )}
            {processState.save.status && (
                <ConfirmAction
                    title={`Bạn có chắc muốn lưu việc ${
                        props.type === 'edit' ? 'chỉnh sửa' : 'tạo'
                    } thông báo này không?`}
                    content=""
                    buttonValue="Đồng ý"
                    icon="delete" //op1: 'delete', op2: 'retry'
                    action={handleSaveProcess}
                />
            )}
        </ContainerEditor>
    );
};

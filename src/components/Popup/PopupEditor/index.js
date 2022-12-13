import { useEffect, useState } from 'react';

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
    const [errorMsg, setErrorMsg] = useState({
        title: false,
        content: false,
        first: props.type === 'edit' ? false : true,
    });
    const [statusButton, setStatusButton] = useState();
    const [processState, setProcessState] = useState({
        cancel: {
            status: false,
        },
        save: {
            status: false,
        },
    });

    useEffect(() => {
        setStatusButton(errorMsg.title || errorMsg.content || errorMsg.first);
    }, [errorMsg]);

    const onTitleChange = (e) => {
        const checkValue = e.target.value.trim();
        setNewAnnouncement({
            ...newAnnouncement,
            title: e.target.value,
        });
        setErrorMsg({
            ...errorMsg,
            title: checkValue == null || checkValue == '',
            first: false,
        });
    };
    const onContentChange = (value) => {
        const checkValue = convertToRaw(value.getCurrentContent()).blocks;
        let status = true;
        for (let i = 0; i < checkValue.length; i++) {
            if (checkValue[0].text.trim() !== '') {
                status = false;
                break;
            }
        }
        setNewAnnouncement({
            ...newAnnouncement,
            content: value,
        });
        setErrorMsg({
            ...errorMsg,
            content: status,
        });
    };
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
                    style={errorMsg.title ? { border: '1px solid red' } : {}}
                    value={newAnnouncement.title}
                    onChange={(e) => onTitleChange(e)}
                    onBlur={(e) => onTitleChange(e)}
                    className="title-input"
                />
                {errorMsg.title && <p className="errorMsg">Trường này không được bỏ trống!</p>}
                <h3 style={{ marginTop: '0.5em' }}>
                    <span style={{ color: 'red' }}>* </span>
                    Nội dung thông báo
                </h3>
                <div
                    className="container-editor"
                    style={errorMsg.content ? { border: '1px solid red' } : {}}
                >
                    <Editor
                        editorState={newAnnouncement.content}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={(value) => onContentChange(value)}
                    />
                </div>

                {errorMsg.content && <p className="errorMsg">Trường này không được bỏ trống!</p>}
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
                        disabled={statusButton}
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

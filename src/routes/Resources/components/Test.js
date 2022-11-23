import { useEffect, useState } from 'react';

import { Button, Input } from 'antd';

// import { Editor } from 'react-draft-wysiwyg';
import { ContainerEditor, FirstLayer } from '../styles';
import { ConfirmAction } from './PopupConfirmResource';
import { UploadImage } from './UploadImg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateAnnouncement = (props) => {
    const action = props.action;
    const [newResource, setNewResource] = useState({
        title: props.type === 'edit' ? props.title : '',
        description: props.type === 'edit' ? props.description : '',
        resourceImg: props.type === 'edit' ? props.imgs : [],
    });
    const [errorMsg, setErrorMsg] = useState({
        title: false,
        content: false,
        first: true,
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
        setNewResource({
            ...newResource,
            title: checkValue,
        });
        setErrorMsg({
            ...errorMsg,
            title: checkValue == null || checkValue == '',
            first: false,
        });
    };
    const onContentChange = (e) => {
        const checkValue = e.target.value.trim();
        let status = true;
        // for (let i = 0; i < checkValue.length; i++) {
        //     if (checkValue[0].text.trim() !== '') {
        //         status = false;
        //         break;
        //     }
        // }
        setNewResource({
            ...newResource,
            description: checkValue,
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
            const { description } = newResource;
            await action(true, { ...newResource, description: description });
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
                    Title
                </h3>
                <Input
                    placeholder="title of your resource"
                    style={errorMsg.title ? { border: '1px solid red' } : {}}
                    value={newResource.title}
                    onChange={(e) => onTitleChange(e)}
                    onBlur={(e) => onTitleChange(e)}
                    className="title-input"
                />
                {errorMsg.title && <p className="errorMsg">Trường này không được bỏ trống!</p>}
                <h3 style={{ marginTop: '0.5em' }}>
                    <span style={{ color: 'red' }}>* </span>
                    some description
                </h3>
                <div
                    className="container-editor"
                    style={errorMsg.content ? { border: '1px solid red' } : {}}
                >
                    <Input
                        placeholder="content of your resource"
                        style={errorMsg.title ? { border: '1px solid red' } : {}}
                        value={newResource.title}
                        onChange={(e) => onContentChange(e)}
                        onBlur={(e) => onContentChange(e)}
                        className="title-input"
                    />
                </div>

                {errorMsg.content && <p className="errorMsg">Trường này không được bỏ trống!</p>}
                <UploadImage
                    type={props.type}
                    imgs={props.imgs}
                    onChange={(e) =>
                        setNewResource({
                            ...newResource,
                            imgs: e,
                        })
                    }
                />
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
                    } tài nguyên này không?`}
                    description=""
                    buttonValue="Đồng ý"
                    icon="delete" //op1: 'delete', op2: 'retry'
                    action={handleCancelProcess}
                />
            )}
            {processState.save.status && (
                <ConfirmAction
                    title={`Bạn có chắc muốn lưu việc ${
                        props.type === 'edit' ? 'chỉnh sửa' : 'tạo'
                    } tài nguyên này không?`}
                    content=""
                    buttonValue="Đồng ý"
                    icon="delete" //op1: 'delete', op2: 'retry'
                    action={handleSaveProcess}
                />
            )}
        </ContainerEditor>
    );
};

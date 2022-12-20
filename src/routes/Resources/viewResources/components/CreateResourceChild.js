import { useEffect, useState } from 'react';

import { Button, Input } from 'antd';

import { ConfirmAction } from '../../components/PopupConfirmResource';
// import { Editor } from 'react-draft-wysiwyg';
import { ContainerEditor, FirstLayer } from '../../styles';

import productApi from '@/utils/apiComponents/productApi';
import LocalStorageUtils from '@/utils/localStorageUtils';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateResourceChild = (props) => {
    const action = props.action;
    const subjectId = props.subject;
    const id = props.id;
    // const resourceChild = props.resourceChild;

    const fetchResourceBySubjectId = props.fetchResourceBySubjectId;
    const token = LocalStorageUtils.getToken();
    const [newResourceChild, setNewResourceChild] = useState({
        title: props.type === 'edit' ? props.title : '',
        description: props.type === 'edit' ? props.description : '',
        link: props.type === 'edit' ? props.url : '',
    });
    const [errorMsg, setErrorMsg] = useState({
        title: false,
        description: false,
        link: false,
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
        setStatusButton(errorMsg.title || errorMsg.description || errorMsg.first || errorMsg.link);
    }, [errorMsg]);

    const onTitleChange = (e) => {
        const checkValue = e.target.value;
        setNewResourceChild({
            ...newResourceChild,
            title: checkValue,
        });
        setErrorMsg({
            ...errorMsg,
            title: checkValue == null || checkValue == '',
            first: false,
        });
    };
    const onContentChange = (e) => {
        const checkValue = e.target.value;
        setNewResourceChild({
            ...newResourceChild,
            description: checkValue,
        });
        setErrorMsg({
            ...errorMsg,
            description: checkValue == null || checkValue == '',
            first: false,
        });
    };
    const onLinkChange = (e) => {
        const checkValue = e.target.value;
        setNewResourceChild({
            ...newResourceChild,
            link: checkValue,
        });
        setErrorMsg({
            ...errorMsg,
            link: checkValue == null || checkValue == '',
            first: false,
        });
    };
    const handleCancelProcess = async (status) => {
        await setProcessState({
            ...processState,
            cancel: {
                status: false,
            },
        });
        if (status) await action(false);
    };
    const handleSaveProcess = async (status) => {
        const typeOfWork = props.type;

        await setProcessState({
            ...processState,
            save: {
                status: false,
            },
        });
        if (typeOfWork === 'create') {
            const result = await productApi.createResource(
                {
                    contributor: newResourceChild.title,
                    description: newResourceChild.description,
                    subjectId: subjectId,
                    url: newResourceChild.link,
                },
                token
            );

            if (status && result.data.code === 200) {
                // await productApi.getResourceBySubjectId(id);
                await fetchResourceBySubjectId();

                await action(true);
            } else if (status && result.data.code === 400) {
                await action(false, result.data.message);
            }
        } else if (typeOfWork === 'edit') {
            const result2 = await productApi.updateResource(
                {
                    contributor: newResourceChild.title,
                    description: newResourceChild.description,
                    subjectId: subjectId,
                    url: newResourceChild.link,
                    id: id,
                },
                token
            );

            if (status && result2.data.code === 200) {
                // await productApi.getResourceBySubjectId(id);
                await fetchResourceBySubjectId();

                await action(true);
            } else if (status && result2.data.code === 400) {
                await action(false, result2.data.message);
            }
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
                    Người đóng góp
                </h3>
                <Input
                    placeholder="example"
                    style={errorMsg.title ? { border: '1px solid red' } : {}}
                    value={newResourceChild.title}
                    onChange={(e) => onTitleChange(e)}
                    onBlur={(e) => onTitleChange(e)}
                    className="title-input"
                />
                {errorMsg.title && <p className="errorMsg">Trường này không được bỏ trống!</p>}
                <h3 style={{ marginTop: '0.5em' }}>
                    <span style={{ color: 'red' }}>* </span>
                    Mô tả
                </h3>
                <div
                    className="container-editor"
                    // style={errorMsg.description ? { border: '1px solid red' } : {}}
                >
                    <Input
                        placeholder="example"
                        style={errorMsg.description ? { border: '1px solid red' } : {}}
                        value={newResourceChild.description}
                        onChange={(e) => onContentChange(e)}
                        onBlur={(e) => onContentChange(e)}
                        className="title-input"
                    />
                </div>

                {errorMsg.description && (
                    <p className="errorMsg">Trường này không được bỏ trống!</p>
                )}
                <h3 style={{ marginTop: '0.5em' }}>
                    <span style={{ color: 'red' }}>* </span>
                    Link
                </h3>
                <div
                    className="container-editor"
                    // style={errorMsg.description ? { border: '1px solid red' } : {}}
                >
                    <Input
                        placeholder="example"
                        style={errorMsg.link ? { border: '1px solid red' } : {}}
                        value={newResourceChild.link}
                        onChange={(e) => onLinkChange(e)}
                        onBlur={(e) => onLinkChange(e)}
                        className="title-input"
                    />
                </div>
                {errorMsg.link && <p className="errorMsg">Trường này không được bỏ trống!</p>}

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
                        {props.type === 'edit' ? 'Lưu chỉnh sửa' : 'Thêm tài nguyên'}
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

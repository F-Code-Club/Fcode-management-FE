import { useEffect, useState } from 'react';

import { Button, Checkbox, Dropdown, Input, Select } from 'antd';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

import { ConfirmAction } from '../PopupConfirm';
import { UploadImage } from './UploadImg';
import { ContainerEditor, FirstLayer, optionStyle } from './style';

import { get } from '@/utils/ApiCaller';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateAnnouncement = (props) => {
    const token = localStorage.getItem('token');
    const action = props.action;
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: props.type === 'edit' ? props.title : '',
        description:
            props.type === 'edit'
                ? EditorState.createWithContent(
                      ContentState.createFromBlockArray(
                          htmlToDraft(JSON.parse(props.description)).contentBlocks
                      )
                  )
                : EditorState.createEmpty(),
        imageUrl: props.type === 'edit' ? props.imageUrl : null,
        id: props.type === 'edit' ? props.id : null,
        infoGroup: props.type === 'edit' ? props.infoGroup : '',
        infoUserId: props.type === 'edit' ? props.infoUserId : '',
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
    const optionKhoa = [
        { label: 'K15', value: '15' },
        { label: 'K16', value: '16' },
        { label: 'K17', value: '17' },
        { label: 'K18', value: '18' },
    ];
    const [optionCrew, setOptionCrew] = useState();
    const [checkAll, setCheckAll] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [checkedList, setCheckedList] = useState({
        crew: [],
        khoa: [],
        user: [],
    });

    useEffect(() => {
        setStatusButton(errorMsg.title || errorMsg.content || errorMsg.first);
    }, [errorMsg]);
    useEffect(() => {
        let infoGroup;
        if (props.type === 'edit') {
            if (props.infoGroup && props.infoGroup.length > 0) {
                let dataInfoGroup = props.infoGroup.split('&');
                if (dataInfoGroup.length < 3) dataInfoGroup = ['eventId=', 'crewId=', 'K='];
                infoGroup = {
                    crew: dataInfoGroup[1].substring(7, dataInfoGroup[1].length).split('/'),
                    khoa: dataInfoGroup[2].substring(2, dataInfoGroup[2].length).split('/'),
                };
            }
            let dataInfoUserId;
            if (props.infoUserId) dataInfoUserId = props.infoUserId.split('&');

            setCheckedList({ ...infoGroup, user: dataInfoUserId });
        }

        let data = [];
        get('/member/all', '', { authorization: token })
            .then((res) => {
                res.data.data &&
                    res.data.data.map((user) =>
                        data.push({
                            value: user.id.toString(),
                            label: user.studentId,
                        })
                    );
                setListUser(data);
            })
            .catch((error) => console.log(error));
        let dataCrew = [];
        get('/crew/all', '', { authorization: token })
            .then((res) => {
                res.data.data &&
                    res.data.data.map((crew) =>
                        dataCrew.push({
                            value: crew.id.toString(),
                            label: `${crew.name} level ${crew.level}`,
                        })
                    );
                setOptionCrew(dataCrew);
                if (
                    infoGroup.crew.length == dataCrew.length &&
                    infoGroup.khoa.length == optionKhoa.length
                )
                    setCheckAll(true);
            })
            .catch((error) => console.log(error));
    }, []);

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
            if (checkValue[i].text.trim() !== '') {
                status = false;
                break;
            }
        }
        setNewAnnouncement({
            ...newAnnouncement,
            description: value,
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
            let infoGroup = '';
            if (checkedList.crew && checkedList.crew.length > 0) {
                infoGroup = 'crewId=';
                checkedList.crew.map((crew, index) => {
                    if (index != 0) infoGroup += '/';
                    infoGroup += crew;
                });
            }

            if (checkedList.khoa && checkedList.khoa.length) {
                infoGroup += '&K=';
                checkedList.khoa &&
                    checkedList.khoa.map((khoa, index) => {
                        if (index != 0) infoGroup += '/';
                        infoGroup += khoa;
                    });
            }

            let infoUserId = '';
            checkedList.user &&
                checkedList.user.map((user, index) => {
                    if (index != 0) infoUserId += '&';
                    infoUserId += user;
                });

            const convertContent = JSON.stringify(
                draftToHtml(convertToRaw(newAnnouncement.description.getCurrentContent()))
            );
            await action(true, {
                ...newAnnouncement,
                description: convertContent,
                email: convertContent,
                infoGroup,
                infoUserId,
            });
        }
    };

    const onCrewChange = (list) => {
        setCheckedList({
            ...checkedList,
            crew: list,
        });
        if (list.length === optionCrew.length && checkedList.khoa.length === optionKhoa.length)
            setCheckAll(true);
        else setCheckAll(false);
    };
    const onKhoaChange = (list) => {
        setCheckedList({
            ...checkedList,
            khoa: list,
        });
        if (list.length === optionKhoa.length && checkedList.crew.length === optionCrew.length)
            setCheckAll(true);
        else setCheckAll(false);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(
            e.target.checked
                ? {
                      user: checkedList.user,
                      crew: optionCrew.map((crew) => crew.value),
                      khoa: optionKhoa.map((khoa) => khoa.value),
                  }
                : { user: checkedList.user }
        );
        setCheckAll(e.target.checked);
    };
    const onListUserChange = (list) => {
        setCheckedList({
            ...checkedList,
            user: list,
        });
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
                <CloseOutlined
                    className="close-btn"
                    onClick={() =>
                        setProcessState({
                            ...processState,
                            cancel: {
                                status: true,
                            },
                        })
                    }
                />
                {props.type === 'edit' ? <h2>CHỈNH SỬA THÔNG BÁO</h2> : <h2>TẠO THÔNG BÁO</h2>}
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
                        editorState={newAnnouncement.description}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={(value) => onContentChange(value)}
                    />
                </div>

                {errorMsg.content && <p className="errorMsg">Trường này không được bỏ trống!</p>}
                <div className="checkbox">
                    <UploadImage
                        type={props.type}
                        imageUrl={props.imageUrl}
                        onChange={(e) =>
                            setNewAnnouncement({
                                ...newAnnouncement,
                                imageUrl: e,
                            })
                        }
                    />
                    <div className="container-choose-receiver">
                        <div className="choose-receiver">
                            <h3>Gửi mail đến :</h3>
                            <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                                Tất cả
                            </Checkbox>
                            <div>
                                <Dropdown
                                    overlay={
                                        <Checkbox.Group
                                            options={optionCrew}
                                            value={checkedList.crew}
                                            onChange={onCrewChange}
                                            style={optionStyle}
                                        />
                                    }
                                    placement="bottomLeft"
                                    className="choose-crew"
                                >
                                    <Button>
                                        Crew &emsp; <RightOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                            <div>
                                <Dropdown
                                    overlay={
                                        <Checkbox.Group
                                            options={optionKhoa}
                                            value={checkedList.khoa}
                                            onChange={onKhoaChange}
                                            style={optionStyle}
                                        />
                                    }
                                    placement="bottomLeft"
                                    className="choose-khoa"
                                >
                                    <Button>
                                        Khóa &emsp; <RightOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="choose-individual">
                            <h3>Cá nhân :</h3>
                            <Select
                                mode="multiple"
                                allowClear
                                optionFilterProp="label"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn mssv"
                                value={checkedList.user}
                                onChange={onListUserChange}
                                options={listUser}
                            />
                        </div>
                    </div>
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

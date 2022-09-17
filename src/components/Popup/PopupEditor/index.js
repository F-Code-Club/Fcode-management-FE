import { useState } from 'react';

import { Button, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { ContainerEditor } from './style';

import 'antd/dist/antd.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateAnnouncement = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [imgList, setImgList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setImgList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);

                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <ContainerEditor>
            <div className="first-layer"></div>
            <div className="editor">
                <h3>
                    <span style={{ color: 'red' }}>* </span>
                    Tiêu đề thông báo
                </h3>
                <Input placeholder="THÔNG BÁO HỌP CÂU LẠC BỘ" style={{ marginBottom: '10px' }} />
                <h3>
                    <span style={{ color: 'red' }}>* </span>
                    Nội dung thông báo
                </h3>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={(value) => setEditorState(value)}
                />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        name="confirm-send-mail-to-all"
                        style={{ marginRight: '10px' }}
                    />
                    <span>Bạn có muốn gửi mail đến toàn CLB</span>
                </div>
                <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={imgList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {imgList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>

                <div className="container-btn">
                    <Button>Lưu chỉnh sửa</Button>
                </div>
            </div>
        </ContainerEditor>
    );
};

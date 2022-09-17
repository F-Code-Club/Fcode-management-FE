import { useState } from 'react';

import { Button, Input } from 'antd';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { UploadImage } from './UploadImg';
import { ContainerEditor } from './style';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateAnnouncement = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <ContainerEditor>
            <div className="first-layer"></div>
            <div className="editor">
                <h3>
                    <span style={{ color: 'red' }}>* </span>
                    Tiêu đề thông báo
                </h3>
                <Input placeholder="THÔNG BÁO HỌP CÂU LẠC BỘ" style={{ marginBottom: '0.5rem' }} />
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
                <UploadImage />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        name="confirm-send-mail-to-all"
                        style={{ marginRight: '10px' }}
                    />
                    <span>Bạn có muốn gửi mail đến toàn CLB</span>
                </div>

                <div className="container-btn">
                    <Button className="save-btn">Lưu chỉnh sửa</Button>
                </div>
            </div>
        </ContainerEditor>
    );
};

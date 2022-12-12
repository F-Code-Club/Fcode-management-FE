import { Button, Image, Row, Space } from 'antd';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectCurrentBlog } from '../../slice/selector';
import { Wrapper, ContentBlog, InfoList, InfoItem } from './PersonalDetail.styled';

const PersonalDetailBlog = () => {
    const navigate = useNavigate();

    const blog = useSelector(selectCurrentBlog);
    const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(blog.content)));

    const params = useParams();
    const mode = params.id ? 'view' : 'preview';
    const handleClick = () => {
        if (mode === 'view') navigate(`/personal-blog/edit/${params.id}`);
    };

    return (
        <Wrapper>
            <ContentBlog>
                <h1>{blog.title}</h1>
                <h2>{blog.description}</h2>
                <Editor editorState={editorState} toolbarHidden={true} readOnly="false" />
                <Row justify="center">
                    <Space>
                        <Button type="primary" htmlType="submit" onClick={handleClick}>
                            {mode === 'view' ? 'Chỉnh sửa' : 'Hoàn thành'}
                        </Button>
                        <Button onClick={() => navigate(-1)}>Quay lại</Button>
                    </Space>
                </Row>
            </ContentBlog>
            <InfoList>
                <InfoItem>
                    <strong>Trạng thái:</strong> Đã được duyệt
                </InfoItem>
                <InfoItem>
                    <strong>Ngày tạo:</strong> {blog.createdTime}
                </InfoItem>
                <InfoItem>
                    <strong>Ngày đăng:</strong> {blog.updatedTime}
                </InfoItem>
                <InfoItem>
                    <strong>Thể loại:</strong> F-Code, Tách file, ngôn ngữ C
                </InfoItem>
                <InfoItem>
                    <strong>Ảnh đại hiện:</strong> <Image src={blog.imageUrl} width="200px" />
                </InfoItem>
            </InfoList>
        </Wrapper>
    );
};

export default PersonalDetailBlog;

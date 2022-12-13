import { Button, Image, Row, Space } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectCurrentBlog } from '../../slice/selector';
import { Wrapper, ContentBlog, InfoList, InfoItem } from './PersonalDetail.styled';

import { toastSuccess } from '@/components/ToastNotification';
import { HTMLToEditorState } from '@/utils/DraftJSConversion';
import articleApi from '@/utils/apiComponents/articleApi';

const PersonalDetailBlog = () => {
    const navigate = useNavigate();

    // Convert HTML JSON to Editor state
    const blog = useSelector(selectCurrentBlog).currentBlog;
    const editorState = HTMLToEditorState(blog.content);

    // Get ID of blog
    const params = useParams();
    const blogID = params.id;

    const handleSubmit = async () => {
        if (blogID) {
            // TODO: createdTime and updatedTime will be fixed later
            const newBlog = {
                ...blog,
                location: 'Vietnam',
                createdTime: '2022-12-11',
                updatedTime: '2022-12-20',
                id: parseInt(blogID),
            };
            delete newBlog.category;
            const { data } = await articleApi.updateArticle(newBlog);
            if (data.code === 200) {
                toastSuccess(data.message);
                navigate('/personal-blog');
            }
        } else {
            // TODO: Update memberID and genreID when Login page is done
            const newBlog = {
                ...blog,
                memberId: 1212,
                genreId: 1,
                location: 'Facebook',
            };
            const { data } = await articleApi.createArticle(newBlog);
            if (data.code === 200) {
                toastSuccess(data.message);
                navigate('/personal-blog');
            }
        }
    };

    return (
        <Wrapper>
            <ContentBlog>
                <h1>{blog.title}</h1>
                <h2>{blog.description}</h2>
                <Editor editorState={editorState} toolbarHidden={true} readOnly="false" />
                <Row justify="center">
                    <Space>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            {blogID ? 'Chỉnh sửa' : 'Hoàn thành'}
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

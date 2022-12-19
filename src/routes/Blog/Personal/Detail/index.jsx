import { useEffect, useState } from 'react';

import { Button, Image, Row, Space } from 'antd';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { changeBlog } from '../../slice';
import { selectCurrentBlog } from '../../slice/selector';
import { Wrapper, ContentBlog, InfoList, InfoItem } from './PersonalDetail.styled';

import fallbackImg from '@/assets/fallback.png';
import { toastError, toastSuccess } from '@/components/ToastNotification';
import { HTMLToEditorState } from '@/utils/DraftJSConversion';
import articleApi from '@/utils/apiComponents/articleApi';

const PersonalDetailBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const blog = useSelector(selectCurrentBlog).currentBlog;
    const [editorState, setEditorState] = useState('');

    // Get ID of blog
    const params = useParams();
    const blogID = params.id;

    useEffect(() => {
        if (!Object.values(blog).length) navigate('/personal-blog');
        else if (blog.content) {
            try {
                setEditorState(HTMLToEditorState(blog.content));
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
                toastError('Lỗi khi tải nội dung bài viết, vui lòng liên hệ quản trị viên');
            }
        }
    }, []);

    const handleSubmit = async () => {
        if (!blog.isEdit) {
            navigate(`/personal-blog/edit/${blogID}`);
        } else if (blogID) {
            const newBlog = {
                ...blog,
                location: 'Vietnam',
                createdTime: moment().format('YYYY-MM-DD'),
                updatedTime: moment().format('YYYY-MM-DD'),
                id: parseInt(blogID),
            };
            delete newBlog.category;
            const { data } = await articleApi.updateArticle(newBlog);
            if (data.code === 200) {
                dispatch(changeBlog({}));
                toastSuccess('Chỉnh sửa bài viết thành công');
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
                dispatch(changeBlog({}));
                toastSuccess('Tạo bài viết thành cống');
                navigate('/personal-blog');
            }
        }
    };

    const INFO_LIST = [
        {
            title: 'Trạng thái',
            content: blog.isEdit ? 'Đang chỉnh sửa' : 'Đã được duyệt',
        },
        {
            title: 'Ngày tạo',
            content: blog.createdTime,
        },
        {
            title: 'Ngày chỉnh sửa',
            content: blog.updatedTime,
        },
        // TODO: Uncomment these line when having specific genreID
        // {
        //     title: 'Thể loại',
        //     content: 'F-Code, Tách file, ngôn ngữ C',
        // },
        {
            title: 'Ảnh đại diện',
            content: <Image src={blog.imageUrl} fallback={fallbackImg} width="200px" />,
        },
    ];

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
                {Object.keys(blog).length &&
                    INFO_LIST.map((item) => (
                        <InfoItem key={item.title}>
                            <strong>{item.title}:</strong> {item.content}
                        </InfoItem>
                    ))}
            </InfoList>
        </Wrapper>
    );
};

export default PersonalDetailBlog;

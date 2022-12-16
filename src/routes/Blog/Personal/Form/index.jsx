import { useEffect, useState } from 'react';

import { Button, Form, Input, Space, Row, Image } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { changeBlog } from '../../slice';
import { selectCurrentBlog } from '../../slice/selector';
import * as Styled from './BlogForm.styled';

import { toastSuccess } from '@/components/ToastNotification';
import { EditorStateToHTML, HTMLToEditorState } from '@/utils/DraftJSConversion';
import articleApi from '@/utils/apiComponents/articleApi';

// This form for both CREATE blog and UPDATE blog
const BlogForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // Get blog in redux
    const dispatch = useDispatch();
    const [blog, setBlog] = useState(useSelector(selectCurrentBlog).currentBlog);
    if (typeof blog.content === 'string') {
        setBlog({
            ...blog,
            content: HTMLToEditorState(blog.content),
        });
    }

    // Get id of the blog
    const params = useParams();
    const blogID = params.id;

    // This fileds to set initial value for form
    const [fields, setFields] = useState([]);

    useEffect(() => {
        (async () => {
            let newBlog;
            if (blog.content) {
                newBlog = blog;
            } else if (blogID) {
                const res = await articleApi.getArticleById(blogID);
                newBlog = res.data.data;
            }

            let newArray = [];
            Object.keys(newBlog).forEach((item) => {
                newArray.push({ name: [item], value: newBlog[item] });
            });
            setFields(newArray);

            setBlog({
                ...newBlog,
                content: HTMLToEditorState(newBlog.content),
            });
        })();
    }, []);

    const onFinish = async (values) => {
        let res;
        if (blogID) {
            const newBlog = {
                ...blog,
                ...values,
                content: EditorStateToHTML(blog.content),
                id: parseInt(blogID),
            };
            delete newBlog.genreId;
            delete newBlog.memberId;
            res = await articleApi.updateArticle(newBlog);
            if (res.data.code === 200) {
                toastSuccess('Chỉnh sửa bài viết thành công');
                navigate('/personal-blog');
            }
        } else {
            // TODO: Update memberID and genreID when Login page is done
            const newBlog = {
                ...values,
                content: EditorStateToHTML(blog.content),
                genreId: 1,
                memberId: 1212,
                location: 'Vietnam',
                imageUrl: blog.imageUrl,
            };
            res = await articleApi.createArticle(newBlog);
            if (res.data.code === 200) {
                toastSuccess('Tạo bài viết thành công');
                navigate('/personal-blog');
            }
        }
    };

    const handlePreview = () => {
        let newBlog = {};
        fields.forEach((item) => {
            newBlog[item.name] = item.value;
        });
        dispatch(
            changeBlog({
                ...newBlog,
                content: EditorStateToHTML(blog.content),
                imageUrl: blog.imageUrl,
                isEdit: true,
            })
        );
        if (blogID) navigate(`/personal-blog/preview/${blogID}`);
        else navigate('/personal-blog/preview/');
    };

    const onFinishFailed = (errorInfo) => {
        // eslint-disable-next-line no-console
        console.log('Failed:', errorInfo);
    };

    const FORM_LIST = [
        {
            label: 'Tựa đề bài viết',
            name: 'title',
            rules: [
                {
                    required: true,
                    message: 'Hãy vui lòng nhập tựa đề của bài viết',
                },
            ],
            children: <Input />,
        },
        {
            label: 'Đoạn giới thiệu sơ lược',
            name: 'description',
            rules: [
                {
                    required: true,
                    message: 'Hãy vui lòng nhập đoạn giới thiệu sơ lược của bài viết',
                },
            ],
            children: <Input />,
        },
        {
            label: 'Thể loại',
            name: 'category',
            rules: [
                {
                    required: true,
                    message: 'Hãy vui lòng nhập thể loại của bài viết',
                },
            ],
            tooltip: 'Các tag phân cách với nhau bằng dấu “,”',
            children: <Input />,
        },
        {
            label: 'Nội dung bài viết',
            name: 'content',
            validateStatus: (() => {
                if (blog.content) {
                    // TODO: Hỏi anh Bình. anh Nghĩa validate cái này
                    return EditorStateToHTML(blog.content).trim().toString() != '<p></p>\n'
                        ? 'success'
                        : 'error';
                }
            })(),
            rules: [
                {
                    required: true,
                    message: 'Hãy vui lòng nhập nội dung cúa bài viết',
                },
            ],
            children: (
                <Editor
                    editorState={blog.content}
                    onEditorStateChange={(value) => setBlog({ ...blog, content: value })}
                />
            ),
        },
        {
            label: 'Tác giả bài viết',
            name: 'author',
            rules: [
                {
                    required: true,
                    message: 'Hãy vui lòng nhập tác giả cúa bài viết',
                },
            ],
            children: <Input placeholder="Nguyen Van A" />,
        },
        // {
        //     children: (
        //         <Row gutter={32}>
        //             <Col span={12}>
        //                 <Form.Item label="Phông chữ cho tựa đề">
        //                     <Input />
        //                 </Form.Item>
        //             </Col>
        //             <Col span={12}>
        //                 <Form.Item label="Phông chữ cho nội dung">
        //                     <Input />
        //                 </Form.Item>
        //             </Col>
        //         </Row>
        //     ),
        // },
        {
            label: 'Hình ảnh đại diện',
            name: 'imageUrl',
            rules: [
                {
                    required: true,
                    message: 'Hãy vui lòng nhập URL hình ảnh đại diện cúa bài viết',
                },
            ],
            children: (
                <Input
                    onChange={(e) => setBlog({ ...blog, imageUrl: e.target.value })}
                    placeholder="https://..."
                />
            ),
            extra: (() => {
                return blog.imageUrl && <Image src={blog.imageUrl} width="200px" />;
            })(),
        },
        {
            children: (
                <Row justify="center">
                    <Space>
                        <Button type="primary" onClick={handlePreview}>
                            Xem trước
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Hoàn thành
                        </Button>
                        <Button onClick={() => navigate(-1)}>Hủy</Button>
                    </Space>
                </Row>
            ),
        },
    ];

    return (
        <>
            <Styled.Box>
                <Styled.TitleForm>{blogID ? 'CHỈNH SỬA' : 'TẠO'} BÀI VIẾT</Styled.TitleForm>
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={true}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    fields={fields}
                    onFieldsChange={(_, allFields) => {
                        setFields(allFields);
                    }}
                    scrollToFirstError
                >
                    {FORM_LIST.map((item, idx) => (
                        <Form.Item
                            label={item.label}
                            required
                            name={item.name}
                            hasFeedback
                            rules={item.rules}
                            extra={item.extra}
                            tooltip={item.tooltip}
                            validateStatus={item.validateStatus}
                            key={idx}
                        >
                            {item.children}
                        </Form.Item>
                    ))}
                </Form>
            </Styled.Box>
        </>
    );
};

export default BlogForm;

import { useEffect, useState } from 'react';

import { Button, Form, Input, Space, Row, Image } from 'antd';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { changeBlog } from '../../slice';
import { selectCurrentBlog } from '../../slice/selector';
import * as Styled from './BlogForm.styled';

import { toastSuccess } from '@/components/ToastNotification';
import articleApi from '@/utils/apiComponents/articleApi';

// This form for both CREATE blog and UPDATE blog
const BlogForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // Get blog in redux
    const dispatch = useDispatch();
    const [blog, setBlog] = useState(useSelector(selectCurrentBlog));
    if (typeof blog.content === 'string') {
        setBlog({
            ...blog,
            content: EditorState.createWithContent(convertFromRaw(JSON.parse(blog.content))),
        });
    }

    // Get id of the blog
    const params = useParams();
    const blogID = params.id;

    // Call API to get blog
    const [fields, setFields] = useState([]);

    useEffect(() => {
        (async () => {
            let newArray = [];
            let newBlog;

            if (blog.content) {
                newBlog = blog;
            } else if (blogID) {
                const res = await articleApi.getArticleById(blogID);
                newBlog = res.data.data;
            }

            Object.keys(newBlog).forEach((item) => {
                newArray.push({ name: [item], value: newBlog[item] });
            });
            setFields(newArray);

            setBlog({
                ...newBlog,
                content: EditorState.createWithContent(convertFromRaw(JSON.parse(newBlog.content))),
            });
        })();
    }, [window.location]);

    const onFinish = async (values) => {
        let res;
        if (blogID) {
            const newBlog = {
                ...blog,
                ...values,
                content: JSON.stringify(convertToRaw(blog.content.getCurrentContent())),
            };
            delete newBlog.genreId;
            delete newBlog.memberId;
            console.log(newBlog);
            res = await articleApi.updateArticle(newBlog);
            console.log(res);
            if (res.data.code === 200) {
                toastSuccess(res.data.message);
                navigate('/personal-blog');
            }
        } else {
            const newBlog = {
                ...values,
                content: JSON.stringify(convertToRaw(blog.content.getCurrentContent())),
                genreId: 1,
                memberId: 1212,
                location: 'Vietnam',
                imageUrl: blog.imageUrl,
            };
            res = await articleApi.createArticle(newBlog);
            if (res.data.code === 200) {
                toastSuccess(res.data.message);
                navigate('/personal-blog');
            }
        }
    };

    const handlePreview = () => {
        console.log(fields);
        let newBlog = {};
        fields.forEach((item) => {
            newBlog[item.name] = item.value;
        });
        dispatch(
            changeBlog({
                ...newBlog,
                content: JSON.stringify(convertToRaw(blog.content.getCurrentContent())),
                imageUrl: blog.imageUrl,
            })
        );
        navigate('/personal-blog/preview');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Styled.Box>
                <Styled.Title>TẠO BÀI VIẾT</Styled.Title>
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
                    <Form.Item
                        label="Tựa đề bài viết"
                        required
                        name="title"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy vui lòng nhập tựa đề của bài viết',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đoạn giới thiệu sơ lược"
                        required
                        name="description"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy vui lòng nhập đoạn giới thiệu sơ lược của bài viết',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        tooltip="Các tag phân cách với nhau bằng dấu “,”"
                        // name="category"
                        required
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung bài viết" required name="content">
                        <Editor
                            editorState={blog.content}
                            onEditorStateChange={(value) => setBlog({ ...blog, content: value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả bài viết"
                        required
                        name="author"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy vui lòng nhập tác giả của bài viết',
                            },
                        ]}
                    >
                        <Input placeholder="Nguyen Van A" />
                    </Form.Item>
                    {/* <Row gutter={32}>
                        <Col span={12}>
                            <Form.Item label="Phông chữ cho tựa đề">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phông chữ cho nội dung">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row> */}
                    <Form.Item
                        label="Hình ảnh đại diện"
                        required
                        name="imageUrl"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Hãy vui lòng điền URL hình ảnh đại diện',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => setBlog({ ...blog, imageUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </Form.Item>
                    <Image src={blog.imageUrl} width="200px" />
                    <Form.Item>
                        <Row justify="center">
                            <Space>
                                <Button type="primary" onClick={handlePreview}>
                                    Xem trước
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Hoàn thành
                                </Button>
                                <Button>Hủy</Button>
                            </Space>
                        </Row>
                    </Form.Item>
                </Form>
            </Styled.Box>
        </>
    );
};

export default BlogForm;

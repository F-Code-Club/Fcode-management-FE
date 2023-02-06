import { useEffect, useState } from 'react';

import { Button, Form, Input, Space, Row, Image } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { changeBlog } from '../../slice';
import { selectCurrentBlog } from '../../slice/selector';
import * as Styled from './BlogForm.styled';

import fallbackImg from '@/assets/fallback.png';
import { toastError, toastSuccess } from '@/components/ToastNotification';
import { selectId } from '@/routes/Auth/slice/selector';
import { EditorStateToHTML, HTMLToEditorState } from '@/utils/DraftJSConversion';
import articleApi from '@/utils/apiComponents/articleApi';
import localStorageUtils from '@/utils/localStorageUtils';

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
                const token = localStorageUtils.getToken();
                const res = await articleApi.getArticleById(blogID, token);
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
    console.log('line 64', blog);
    // Get user ID from redux
    const memberId = useSelector(selectId);

    const onFinish = async (values) => {
        let res;
        const token = localStorageUtils.getToken();
        if (blogID) {
            const newBlog = {
                ...blog,
                ...values,
                content: EditorStateToHTML(blog.content),
                id: parseInt(blogID),
            };
            delete newBlog.genreId;
            delete newBlog.memberId;
            res = await articleApi.updateArticle(newBlog, token);
            if (res.data.code === 200) {
                dispatch(changeBlog({}));
                toastSuccess('Chỉnh sửa bài viết thành công');
                navigate('/personal-blog');
            }
        } else {
            // TODO: Update genreID and location
            const newBlog = {
                ...values,
                content: EditorStateToHTML(blog.content),
                genreId: 1,
                memberId,
                location: 'Vietnam',
                imageUrl: blog.imageUrl,
            };
            res = await articleApi.createArticle(newBlog, token);
            if (res.data.code === 200) {
                dispatch(changeBlog({}));
                toastSuccess('Tạo bài viết thành công');
                navigate('/personal-blog');
            }
        }
    };

    const handlePreview = () => {
        const isAllFieldsTouched =
            Object.values(form.getFieldsValue()).every((x) => x) && !!blog.content;
        if (!isAllFieldsTouched) {
            toastError('Hãy hoàn tất form nhé');
            form.submit();
        } else {
            // const isValid = form.getFieldsError().every((item) => !item.errors.length);
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
                    // isValid,
                })
            );
            if (blogID) navigate(`/personal-blog/preview/${blogID}`);
            else navigate('/personal-blog/preview/');
        }
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
                    max: 250,
                    required: true,
                    message: 'Hãy vui lòng nhập tựa đề của bài viết và độ dài không quá 250 ký tự',
                },
            ],
            children: <Input placeholder="EMMET - VIẾT HTML CẤP TỐC" />,
        },
        {
            label: 'Đoạn giới thiệu sơ lược',
            name: 'description',
            rules: [
                {
                    max: 1000,
                    required: true,
                    message:
                        'Hãy vui lòng nhập đoạn giới thiệu sơ lược của bài viết và độ dài không quá 1000 ký tự',
                },
            ],
            children: (
                <Input.TextArea placeholder="Emmet là công cụ hỗ trợ code HTML, CSS nhanh chóng, ngắn gọn mà không cần phải gõ một cách chi tiết toàn bộ cú pháp. Không những thế, đây là công cụ hoàn toàn miễn phí và được tích hợp sẵn trên Visual Studio Code." />
            ),
        },
        {
            label: 'Thể loại',
            name: 'category',
            rules: [
                {
                    max: 250,
                    required: true,
                    message:
                        'Hãy vui lòng nhập thể loại của bài viết và độ dài không quá 250 ký tự',
                },
            ],
            tooltip: 'Các tag phân cách với nhau bằng dấu “,”',
            children: <Input />,
        },
        {
            label: 'Nội dung bài viết',
            name: 'content',
            // * In case of validate content of the blog is error, uncomment these line
            // validateStatus: (() => {
            //     if (blog.content) {
            //         // TODO: Hỏi anh Bình. anh Nghĩa validate cái này
            //         return EditorStateToHTML(blog.content).trim().toString() != '<p></p>\n'
            //             ? 'success'
            //             : 'error';
            //     }
            // })(),
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
                    max: 100,
                    required: true,
                    message: 'Hãy vui lòng nhập tác giả cúa bài viết và độ dài không quá 100 ký tự',
                },
            ],
            children: <Input placeholder="Nguyễn Văn A" />,
        },
        // * In case of the client need the feature to change font style, uncomment these line
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
            extra: blog.imageUrl && (
                <Image src={blog.imageUrl} fallback={fallbackImg} width="200px" />
            ),
        },
        {
            children: (
                <Row justify="center">
                    <Styled.WrapperBtns>
                        <Space>
                            <Button type="primary" onClick={handlePreview}>
                                Xem trước
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Hoàn thành
                            </Button>
                            <Button onClick={() => navigate(-1)}>Hủy</Button>
                        </Space>
                    </Styled.WrapperBtns>
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

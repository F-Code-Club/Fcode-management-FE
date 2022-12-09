import { useState } from 'react';

import { Button, Form, Input, Space, Upload, Row } from 'antd';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import * as Styled from './CreateBlog.styled';

import articleApi from '@/utils/apiComponents/articleApi';
// import convertToBase64 from '@/utils/convertToBase64';
import { PlusOutlined } from '@ant-design/icons';

const CreateBlog = () => {
    const [form] = Form.useForm();
    const [content, setContent] = useState();

    const onFinish = async (values) => {
        const newBlog = {
            ...values,
            content: JSON.stringify(convertToRaw(content.getCurrentContent())),
            genreId: 1,
            memberId: 1212,
            location: 'Vietnam',
            imageUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
            // imageUrl: convertToBase64(values.imageUrl.fileList[0].originFileObj),
        };
        const { data } = await articleApi.createArticle(JSON.stringify(newBlog));
        console.log(data);
    };

    const onContentChange = (value) => {
        // const checkValue = convertToRaw(value.getCurrentContent()).blocks;
        // let status = true;
        // for (let i = 0; i < checkValue.length; i++) {
        //     if (checkValue[0].text.trim() !== '') {
        //         status = false;
        //         break;
        //     }
        // }
        setContent(value);
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
                >
                    <Form.Item label="Tựa đề bài viết" required name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Đoạn giới thiệu sơ lược" required name="description">
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
                            editorState={content}
                            onEditorStateChange={(value) => onContentChange(value)}
                        />
                    </Form.Item>
                    <Form.Item label="Tác giả bài viết" required name="author">
                        <Input />
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
                    <Form.Item label="Hình ảnh đại diện" name="imageUrl">
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="center">
                            <Space>
                                <Button type="primary">Xem trước</Button>
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

export default CreateBlog;

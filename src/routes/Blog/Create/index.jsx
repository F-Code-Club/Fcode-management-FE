import { Button, Form, Input, Space, Upload, Col, Row, Select } from 'antd';
import { Editor } from 'react-draft-wysiwyg';

import * as Styled from './CreateBlog.styled';

import { PlusOutlined } from '@ant-design/icons';

const Create = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        // const newBlog = { ...values, author: 'Hai Dang', }
        console.log(values);
        alert(JSON.stringify(values));
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
                    <Form.Item label="Trạng thái" name="status" required>
                        <Select>
                            <Select.Option value="public">Công khai</Select.Option>
                            <Select.Option value="private">Riêng tư</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        tooltip="Các tag phân cách với nhau bằng dấu “,”"
                        name="category"
                        required
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung bài viết" required name="content">
                        <Editor />
                    </Form.Item>
                    <Row gutter={32}>
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
                    </Row>
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

export default Create;

import { Input, DatePicker, Space, Button, Form } from 'antd';
import styled from 'styled-components';

import px2vw from '@/utils/px2vw';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
function AddEventBox({ handle }) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onDateSelection = (value, dateString) => {
        console.log(dateString);
    };
    return (
        <Container>
            <InputContainer>
                <h1>Tạo Sự Kiện</h1>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        className="input-element"
                        label="Tên sự kiện"
                        name="eventName"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập tên sự kiện',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="input-element"
                        label="Điểm sự kiện"
                        name="eventPoint"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập điểm sự kiện',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="date-element"
                        label="Ngày Giờ "
                        name="date-time"
                        rules={[
                            {
                                type: 'object',
                                required: false,
                                message: 'Hãy nhập thời gian sự kiện',
                            },
                        ]}
                    >
                        <Space direction="vertical" size={12}>
                            <RangePicker showTime onChange={onDateSelection} />
                        </Space>
                    </Form.Item>
                    <Form.Item className="input-element" label="Ghi chú" name="extraNotice">
                        <TextArea rows={4} placeholder="Ghi chú" maxLength={6} />
                    </Form.Item>
                    <ButtonContainer>
                        <CustomButton onClick={handle}>Hủy</CustomButton>
                        <CustomButton type="primary" htmlType="submit">
                            Thêm sự kiện
                        </CustomButton>
                    </ButtonContainer>
                </Form>
            </InputContainer>
        </Container>
    );
}

export default AddEventBox;
const Container = styled.div`
    width: ${px2vw(460)};
    min-height: ${px2vw(550)};
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const InputContainer = styled.div`
    width: 80%;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`;
const CustomButton = styled(Button)`
    margin: 8px 12px;
    background: #45ce7c !important;
    border-color: #45ce7c !important ;
    transition: 0.3s ease all;
    &:hover {
        color: black !important;
        background: #a5e7c0 !important;
        border-color: #a5e7c0 !important ;
    }
`;

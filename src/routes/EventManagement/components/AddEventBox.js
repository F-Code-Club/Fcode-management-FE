import { useState } from 'react';

import { Input, DatePicker, Space, Button, Form, notification } from 'antd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addEvent } from '../slice';

import { dateFormat } from '@/utils/dateFormat';
import px2vw from '@/utils/px2vw';

const openNotification = (type, placement, value, description) => {
    notification.success({
        message: `${value}`,
        description: `${description}`,
        placement,
        duration: 3,
    });
};

const { TextArea } = Input;

const { RangePicker } = DatePicker;
function AddEventBox({ handle }) {
    const dispatch = useDispatch();
    const [dateString, setDateString] = useState([]);
    const handleNotification = (type, message, description) => {
        openNotification(type, 'bottomRight', message, description);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        try {
            let startDate, endDate, time, arrayOftime;
            startDate = dateString[0].split(' ');
            endDate = dateString[1].split(' ');
            arrayOftime = startDate[1].split(':');
            time = `${arrayOftime[0]}:${arrayOftime[1]}`;
            const event = {
                date: `${dateFormat(startDate[0])} - ${dateFormat(endDate[0])}`,
                day: `${dateFormat(startDate[0])}`,
                start: dateString[0],
                end: dateString[1],
                name: values.eventName,
                point: values.eventPoint,
                place: values.eventPlace,
                note: values.extraNotice,
                time: time,
                dateString: dateString,
            };
            dispatch(addEvent(event));
        } catch {
            handleNotification('error', 'Failled!!', 'Something has gone Wrong,Please Try again');
        } finally {
            handleNotification(
                'Success',
                'Success!!!',
                'Event has been added successfully to Your Calender,Code The Dream!!'
            );
            handle();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        handleNotification('Failed');
    };
    const onDateSelection = (value, dateString) => {
        setDateString(dateString);
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
                        className="input-element"
                        label="Địa điểm tổ chức sự kiện"
                        name="eventPlace"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập  địa điểm của  sự kiện',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="date-element" label="Ngày Giờ " name="date-time">
                        <Space direction="vertical" size={12}>
                            <RangePicker showTime onChange={onDateSelection} />
                        </Space>
                    </Form.Item>
                    <Form.Item className="input-element" label="Ghi chú" name="extraNotice">
                        <TextArea rows={4} placeholder="Ghi chú" maxLength={1000} />
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

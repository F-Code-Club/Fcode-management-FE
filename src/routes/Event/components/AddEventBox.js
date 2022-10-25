import { useState } from 'react';

import { Input, DatePicker, Space, Form, notification, InputNumber } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { addEvent } from '../slice';
import {
    BoxContainer,
    AddContainer,
    InputContainer,
    ButtonContainer,
    CustomButton,
} from '../styled';

import { toastError, toastSuccess } from '@/components/ToastNotification';

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
    const [startDay, setStart] = useState(new Date());
    const [endDay, setEnd] = useState(new Date());
    const [dateString, setDateString] = useState([]);
    const handleNotification = (type, message, description) => {
        openNotification(type, 'bottomRight', message, description);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        try {
            const event = {
                start: dateString[0],
                end: dateString[1],
                title: values.eventName,
                point: values.eventPoint,
                place: values.eventPlace,
                note: values.extraNotice,
            };
            dispatch(addEvent(event));
        } catch {
            toastError('Something has gone Wrong,Please Try again');
        } finally {
            toastSuccess('Event has been added successfully to Your Calender,Code The Dream!!');
            handle();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        handleNotification('Failed');
    };
    const onDateSelection = (value, dateString) => {
        setStart(dateString[0]);
        setEnd(dateString[1]);
        setDateString(dateString);
        console.log(dateString);
    };
    return (
        <BoxContainer>
            <AddContainer>
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
                            <InputNumber min={0} max={100} defaultValue={15} />
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
                                <RangePicker
                                    showTime
                                    onChange={onDateSelection}
                                    value={[moment(`${startDay}`), moment(`${endDay}`)]}
                                />
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
            </AddContainer>
        </BoxContainer>
    );
}

export default AddEventBox;

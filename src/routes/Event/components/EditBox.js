import { useState } from 'react';

import { Input, DatePicker, Space, Form, notification } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { editEvent } from '../slice';
import {
    CustomButton,
    BoxContainer,
    EditContainer,
    InputContainer,
    ButtonContainer,
} from '../styled';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
const openNotification = (type, placement, value, description) => {
    notification.success({
        message: `${value}`,
        description: `${description}`,
        placement,
        duration: 3,
    });
};
function EditBox({ event, handle, closeOtherBox }) {
    const handleNotification = (type, message, description) => {
        openNotification(type, 'bottomRight', message, description);
    };
    const [dateString, setDateString] = useState([]);
    const [startDay, setStart] = useState(event.start);
    const [endDay, setEnd] = useState(event.end);
    let id = event.id;
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const event = {
            start: dateString[0],
            end: dateString[1],
            title: values.eventName,
            point: values.eventPoint,
            place: values.eventPlace,
            note: values.extraNotice,
            id: id,
        };
        dispatch(editEvent(event));
        handle();
        handleNotification(
            'Success',
            'Success!!!',
            'Event has been editted successfully to Your Calender,Code The Dream!!'
        );
        closeOtherBox();
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onDateSelection = (value, dateString) => {
        setStart(dateString[0]);
        setEnd(dateString[1]);
        setDateString(dateString);
    };
    return (
        <BoxContainer>
            <EditContainer>
                <InputContainer>
                    <h1>Cập nhật Sự Kiện</h1>
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
                        fields={[
                            {
                                name: ['eventPoint'],
                                value: `${event.point}`,
                            },
                            {
                                name: ['eventName'],
                                value: `${event.title}`,
                            },
                            {
                                name: ['eventPlace'],
                                value: `${event.place}`,
                            },
                            {
                                name: ['evenTime'],
                                value: [moment(`${event.start}`), moment(`${event.end}`)],
                            },
                            {
                                name: ['extraNotice'],
                                value: `${event.note}`,
                            },
                        ]}
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
                        <Form.Item className="date-element" label="Ngày Giờ" name="evenTime">
                            <Space direction="vertical" size={12} name="evenTime">
                                <RangePicker
                                    showTime
                                    onChange={onDateSelection}
                                    value={[moment(`${startDay}`), moment(`${endDay}`)]}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item className="input-element" label="Ghi chú" name="extraNotice">
                            <TextArea rows={4} placeholder="Ghi chú" />
                        </Form.Item>
                        <ButtonContainer>
                            <CustomButton onClick={handle}>Hủy</CustomButton>
                            <CustomButton type="primary" htmlType="submit">
                                Cập nhật sự kiện
                            </CustomButton>
                        </ButtonContainer>
                    </Form>
                </InputContainer>
            </EditContainer>
        </BoxContainer>
    );
}

export default EditBox;

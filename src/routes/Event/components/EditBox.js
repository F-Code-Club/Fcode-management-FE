import { useState } from 'react';

import { Input, DatePicker, Space, Button, Form, notification } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { editEvent } from '../slice';

import { dateFormat } from '@/utils/dateFormat';
import px2vw from '@/utils/px2vw';

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
    console.log(event);
    const [dateString, setDateString] = useState(event.dateString);
    const dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        let SdayAndTime, EdayAndTime;
        SdayAndTime = dateString[0].split(' ');
        EdayAndTime = dateString[1].split(' ');
        let Sdate = SdayAndTime[0].split('-');
        let Stime = SdayAndTime[1].split(':');
        let Edate = EdayAndTime[0].split('-');
        let Etime = EdayAndTime[1].split(':');
        let end = new Date(Edate[0], Edate[1], Edate[2], Etime[0], Etime[1]);
        let start = new Date(Sdate[0], Sdate[1], Sdate[2], Stime[0], Stime[1]);
        const event = {
            date: `${dateFormat(SdayAndTime[0])} - ${dateFormat(EdayAndTime[0])}`,
            day: `${dateFormat(SdayAndTime[0])}`,
            start: dateString[0],
            end: dateString[1],
            title: values.eventName,
            point: values.eventPoint,
            place: values.eventPlace,
            note: values.extraNotice,
            EndDate: end.toString(),
            StartDate: start.toString(),
        };
        dispatch(editEvent(event));
        handle();
        handleNotification(
            'Success',
            'Success!!!',
            'Event has been editted successfully to Your Calender,Code The Dream!!'
        );
        closeOtherBox();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onDateSelection = (value, dateString) => {
        setDateString(dateString);
    };
    return (
        <BoxContainer>
            <Container>
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
                                    value={[moment(`${event.start}`), moment(`${event.end}`)]}
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
            </Container>
        </BoxContainer>
    );
}

export default EditBox;
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
const BoxContainer = styled.div`
    height: 100vh;
    z-index: 99;
    width: 100vw;
    background: rgba(0, 0, 0, 0.38);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

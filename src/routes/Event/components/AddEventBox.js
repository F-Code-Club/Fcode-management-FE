import { useState, useEffect } from 'react';

import { Input, DatePicker, Form, InputNumber } from 'antd';
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
import productApi from '@/utils/productApi';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
function AddEventBox({ handle }) {
    var token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYW9uZHNlMTczMDI0QGZwdC5lZHUudm4iLCJleHAiOjE2NzA5MjYyNDUsImlhdCI6MTY3MDkyNDQ0NX0._bgmQVY4ZxNOx4iZCXkgrZjothubmXtAN23kvpo33FSnE0mZw6xoC3BjDCvwMxW6UdYm4A_vbNNbQyq29d8lCQ';
    const [text, SetText] = useState([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    useEffect(() => {
        SetText({
            Picker: [moment(), moment().add(1, 'days')],
        });
    }, []);
    form.setFieldsValue({
        Picker: text.Picker,
    });
    const onFinish = async (values) => {
        console.log('Success:', values);
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD HH:mm:ss');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD HH:mm:ss');
        const formattedstartDate = startDate.format('YYYY-MM-DD');
        const formatttedEndDate = endDate.format('YYYY-MM-DD');
        try {
            const event = {
                name: values.eventName,
                point: values.eventPoint,
                location: values.eventPlace,
                description: values.extraNotice,
                startTime: formattedstartDate,
                endTime: formatttedEndDate,
                status: 'ACTIVE',
            };
            await productApi.postEvent(event, token);
            console.log(event);
            toastSuccess('Event has been added successfully to Your Calender,Code The Dream!!');
            dispatch(addEvent(event));
        } catch {
            toastError('Something has gone Wrong,Please Try again');
        } finally {
            handle();
        }
    };

    // eslint-disable-next-line arrow-body-style
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onDateSelection = (value, dateString) => {
        console.log(value);
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
                        form={form}
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
                            <InputNumber min={0} max={100} />
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
                        <Form.Item name="Picker" label="Ngày giờ ">
                            <RangePicker
                                disabledDate={disabledDate}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onDateSelection}
                            />
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

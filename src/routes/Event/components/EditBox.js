import { useState, useEffect } from 'react';

import { Input, DatePicker, Form } from 'antd';
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

import { toastError, toastSuccess } from '@/components/ToastNotification';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
function EditBox({ event, handle, closeOtherBox }) {
    const [form] = Form.useForm();
    const [text, SetText] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        SetText({
            Picker: [moment(), moment().add(1, 'days')],
        });
    }, []);
    form.setFieldsValue({
        Picker: text.Picker,
    });
    const onFinish = (values) => {
        console.log('Success:', values);
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD HH:mm:ss');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD HH:mm:ss');
        const formattedstartDate = startDate.format('DD/MM/YYYY');
        const formatttedEndDate = endDate.format('DD/MM/YYYY');
        try {
            const newEvent = {
                start: startDate,
                end: endDate,
                title: values.eventName,
                point: values.eventPoint,
                place: values.eventPlace,
                note: values.extraNotice,
                startDate: formattedstartDate,
                endDate: formatttedEndDate,
                id: event.id,
            };
            console.log(newEvent);
            toastSuccess('Event has been added successfully to Your Calender,Code The Dream!!');
            dispatch(editEvent(newEvent));
        } catch {
            toastError('Something has gone Wrong,Please Try again');
        } finally {
            handle();
            closeOtherBox();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                                name: ['Picker'],
                                value: [
                                    moment(event.start, 'YYYY-MM-DD HH:mm:ss'),
                                    moment(event.end, 'YYYY-MM-DD HH:mm:ss'),
                                ],
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
                        <Form.Item name="Picker" label="Ngày giờ ">
                            <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
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

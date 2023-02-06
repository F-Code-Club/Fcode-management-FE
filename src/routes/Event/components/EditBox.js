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
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
function EditBox({ event, handle, closeOtherBox }) {
    const token = localStorageUtils.getItem('token');
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
    const onFinish = async (values) => {
        console.log('Success:', values);
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD HH:mm:ss');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD HH:mm:ss');
        const formattedstartDate = startDate.format('YYYY-MM-DD HH:mm:ss');
        const formatttedEndDate = endDate.format('YYYY-MM-DD HH:mm:ss');
        try {
            const newEvent = {
                name: values.eventName,
                point: parseInt(values.eventPoint),
                location: values.eventPlace,
                description: values.extraNotice,
                startTime: formattedstartDate,
                endTime: formatttedEndDate,
                id: event.id,
                status: 'ACTIVE',
            };
            const res = await productApi.editEvent(newEvent, token);
            switch (await res.data.code) {
                case 200:
                    toastSuccess('Chỉnh sửa sự kiện thành công!!');
                    dispatch(editEvent(newEvent));
                    break;
                case 400:
                    toastError('Tên sự kiện bị trùng !!!');
                    break;
                case 401:
                    toastError('Token hết hạn !!!');
                    break;
            }
        } catch {
            toastError('Something has gone Wrong,Please Try again');
        } finally {
            handle();
            closeOtherBox();
        }
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
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
                        form={form}
                        fields={[
                            {
                                name: ['eventPoint'],
                                value: `${event.point}`,
                            },
                            {
                                name: ['eventName'],
                                value: `${event.name}`,
                            },
                            {
                                name: ['eventPlace'],
                                value: `${event.location}`,
                            },
                            {
                                name: ['Picker'],
                                value: [
                                    moment(event.startTime, 'YYYY-MM-DD HH:mm:ss'),
                                    moment(event.endTime, 'YYYY-MM-DD HH:mm:ss'),
                                ],
                            },
                            {
                                name: ['extraNotice'],
                                value: `${event.description}`,
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
                            <RangePicker
                                disabledDate={disabledDate}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                            />
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

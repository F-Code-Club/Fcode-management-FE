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
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
function AddEventBox({ handle }) {
    const token = localStorageUtils.getItem('token');
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
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD HH:mm:ss');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD HH:mm:ss');
        const formattedstartDate = startDate.format('YYYY-MM-DD HH:mm:ss');
        const formatttedEndDate = endDate.format('YYYY-MM-DD HH:mm:ss');
        try {
            const event = {
                name: values.eventName,
                point: parseInt(values.eventPoint),
                location: values.eventPlace,
                description: values.extraNotice,
                startTime: formattedstartDate,
                endTime: formatttedEndDate,
                status: 'ACTIVE',
            };
            const res = await productApi.postEvent(event, token);
            switch (await res.data.code) {
                case 200:
                    toastSuccess('Tạo sự kiện thành công!!');
                    dispatch(addEvent(event));
                    break;
                case 400:
                    toastError('Tên sự kiện bị trùng !!!');
                    break;
                case 401:
                    toastError('Token hết hạn !!!');
                    break;
            }
        } catch {
            toastError('Sự kiện thêm thất bại');
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
    const onDateSelection = () => {};
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

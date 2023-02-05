import { useState, useEffect } from 'react';

import { Input, DatePicker, Form, Button, Upload } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { addMile } from '../slice';
import {
    BoxContainer,
    AddContainer,
    InputContainer,
    ButtonContainer,
    CustomButton,
    UploadContainer,
    CancelButon,
    MySwitch,
} from './styled';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function CreateBox({ handle }) {
    const token = localStorageUtils.getToken();
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
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD ');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD ');
        const formattedstartDate = startDate.format('YYYY-MM-DD ');
        const formatttedEndDate = endDate.format('YYYY-MM-DD ');
        try {
            const event = {
                start: startDate,
                end: endDate,
                startTime: formattedstartDate,
                endTime: formatttedEndDate,
                title: values.eventName,
                description: values.description,
                status: 'ACTIVE',
            };
            const res = await productApi.postChallange(event, token);
            switch (await res.data.code) {
                case 200:
                    toastSuccess('Tạo cột mốc thành công!!');
                    break;
                case 400:
                    toastError('Tên cột mốc bị trùng !!!');
                    break;
                case 401:
                    toastError('Token hết hạn !!!');
                    break;
            }
            dispatch(addMile(event));
        } catch {
            toastError('Tạo cột mốc không  thành công!!');
        } finally {
            handle();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toastError(errorInfo);
    };
    const onDateSelection = (value) => {
        SetText({
            Picker: [value[0], value[1]],
        });
    };

    // eslint-disable-next-line arrow-body-style
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    };
    return (
        <BoxContainer>
            <AddContainer>
                <InputContainer>
                    <h1>Tạo Cột Mốc</h1>
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
                            className="input-element custom-form-item"
                            label={<span style={{ display: 'block' }}>Tên cột mốc</span>}
                            name="eventName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên cột mốc',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Picker"
                            label="Ngày giờ "
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên cột mốc',
                                },
                            ]}
                        >
                            <RangePicker
                                disabledDate={disabledDate}
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onDateSelection}
                            />
                        </Form.Item>
                        <Form.Item
                            className="input-element"
                            label="Thông tin chi tiết"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên cột mốc',
                                },
                            ]}
                        >
                            <TextArea rows={4} placeholder="Thông tin chi tiết" maxLength={1000} />
                        </Form.Item>
                        <ButtonContainer>
                            <CancelButon onClick={handle}>Hủy</CancelButon>
                            <CustomButton type="primary" htmlType="submit">
                                Xác nhận
                            </CustomButton>
                        </ButtonContainer>
                    </Form>
                </InputContainer>
            </AddContainer>
        </BoxContainer>
    );
}

export default CreateBox;

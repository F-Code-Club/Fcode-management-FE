import { useState, useEffect } from 'react';

import { Input, DatePicker, Form, Button, Upload } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { editMile } from '../slice';
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
function EditBox({ handle, event }) {
    const token = localStorageUtils.getToken();
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
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD');
        const formattedstartDate = startDate.format('YYYY-MM-DD');
        const formatttedEndDate = endDate.format('YYYY-MM-DD');

        try {
            const newEvent = {
                startTime: formattedstartDate,
                endTime: formatttedEndDate,
                title: values.eventName,
                description: values.description,
                id: event.id,
                status: 'ACTIVE',
            };
            dispatch(editMile(newEvent));
            productApi.editChallenge(newEvent, token);
            toastSuccess('Sửa cột mốc thành công!!');
        } catch {
            toastError('Sửa cột mốc không thành công!!');
        } finally {
            handle();
        }
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    const onFinishFailed = () => {
        toastError('Không thể sửa cột mốc , vui lòng thử lại !!');
    };
    const onDateSelection = () => {};
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                toastSuccess(`${info.file.name} được thêm thành công !!`);
            } else if (info.file.status === 'error') {
                toastError(`${info.file.name} thêm không thành công , vui lòng thử lại.`);
            }
        },
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    };
    return (
        <BoxContainer>
            <AddContainer>
                <InputContainer>
                    <h1>CHỈNH SỬA CỘT MỐC </h1>
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
                                name: ['eventName'],
                                value: `${event.title}`,
                            },
                            {
                                name: ['eventForm'],
                                value: `${event.form || ''}`,
                            },
                            {
                                name: ['Picker'],
                                value: [
                                    moment(event.startTime, 'YYYY-MM-DD HH:mm:ss'),
                                    moment(event.endTime, 'YYYY-MM-DD HH:mm:ss'),
                                ],
                            },
                            {
                                name: ['description'],
                                value: `${event.description}`,
                            },
                        ]}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            className="input-element"
                            label="Tên cột mốc"
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
                                Thêm sự kiện
                            </CustomButton>
                        </ButtonContainer>
                    </Form>
                </InputContainer>
            </AddContainer>
        </BoxContainer>
    );
}

export default EditBox;

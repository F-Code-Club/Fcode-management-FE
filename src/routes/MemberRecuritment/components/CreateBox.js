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
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function CreateBox({ handle }) {
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
    const onFinish = (values) => {
        const startDate = moment(values.Picker[0], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
        const endDate = moment(values.Picker[1], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
        try {
            const event = {
                start: startDate,
                end: endDate,
                title: values.eventName,
                description: values.description,
                form: values.eventForm,
            };
            console.log(event);
            dispatch(addMile(event));
        } catch {
            toastError('Tạo cột mốc không  thành công!!');
        } finally {
            toastSuccess('Tạo cột mốc thành công!!');
            handle();
        }
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        toastError('Không thể thêm cột mốc , vui lòng thử lại !!');
    };
    const onDateSelection = (value, dateString) => {
        SetText({
            Picker: [value[0], value[1]],
        });
        console.log(value);
        console.log(dateString);
    };
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
    // eslint-disable-next-line arrow-body-style
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
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
                        <Form.Item
                            className="input-element"
                            label="Link form để đăng ký nếu có"
                            name="eventForm"
                        >
                            <Input />
                        </Form.Item>
                        <UploadContainer>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Bấm để tải ảnh lên</Button>
                            </Upload>
                            <MySwitch defaultChecked onChange={onChange} />
                        </UploadContainer>

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

export default CreateBox;

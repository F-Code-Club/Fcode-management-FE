import { useEffect, useState } from 'react';

import { Avatar, Col, Row, Space, Card, Typography, Button, Modal, Form } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    InputBio,
    InputFacebook,
    InputFullName,
    InputPersonalEmail,
    InputEmailFPT,
    SelectBirthdate,
    SelectMajor,
    FullName,
    SelectPosition,
    InputStudentId,
    InputPhone,
    SelectRole,
} from './components';
import { actions } from './slice';
import selector from './slice/selectors';
import { Container } from './style';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import getGutter from '@/utils/getGutter';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import useTheme from '@/utils/useTheme';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import { EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const EditAccount = () => {
    const token = localStorageUtils.getItem('token');
    const [form] = Form.useForm();
    const [isUpdated, setUpdated] = useState(false);
    const dispatch = useDispatch();
    const setTheme = useTheme();
    const avatar = useSelector(selector.avatar);
    const joinDate = useSelector(selector.joinDate);
    const role = useSelector(selector.role);
    const roles = useSelector(selector.roles);
    // const fullName = useSelector(selector.fullName);
    const position = useSelector(selector.position);
    const positions = useSelector(selector.positions);
    const info = useSelector(selector.info);
    const { id } = useParams();
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            setTheme(false);
        }
        setAccount();
    }, []);
    const getAccountById = async (id) => {
        const path = await productApi.getAccountById(id, token);
        return path.data.data;
    };
    const setAccount = async () => {
        const response = await getAccountById(id);
        dispatch(actions.setAccount(response));
        dispatch(actions.getAccount());
        setUpdated(true);
    };
    const UpdateInfo = async () => {
        dispatch(actions.getAccount());
        const response = await productApi.putAccountByAdmin(info, token);
        if (response.data.code == 200) {
            toastSuccess(response.data.message);
        } else {
            toastError(response.data.message);
        }
    };
    const confirm = () => {
        Modal.confirm({
            maskClosable: true,
            title: 'Bạn có muốn thay đổi thông tin tài khoản?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tài khoản sau khi đổi sẽ không còn còn lưu trữ thông tin trước đó được nữa.',
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
            onOk: () => {
                UpdateInfo();
            },
        });
    };

    return (
        <Container>
            {isUpdated && (
                <Space direction="vertical" size={getGutter(1)} style={{ display: 'flex' }}>
                    <Row gutter={getGutter(1)}>
                        <Col span={7} className="left-side">
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{ display: 'flex' }}
                                className="pos-sticky"
                            >
                                <Card style={{ width: '100%', height: '100%' }} loading={false}>
                                    <Avatar size={160} src={avatar} />
                                    <FullName />
                                    <Title
                                        level={5}
                                        style={{
                                            marginTop: 0,
                                        }}
                                    >
                                        {roles[role]}
                                    </Title>
                                    <Text>
                                        Ngày tham gia: {moment(joinDate).format('DD/MM/yyyy')}
                                    </Text>
                                    <Text>Chức vụ: {positions[position]}</Text>
                                </Card>
                                <Space size="middle" className="full-fill">
                                    <Button block>Huỷ thay đổi</Button>
                                    <Button type="primary" block onClick={() => confirm()}>
                                        Xác nhận
                                    </Button>
                                </Space>
                            </Space>
                        </Col>
                        <Col span={17} className="right-side">
                            <Card style={{ width: '100%', height: '100%' }} loading={false}>
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{ display: 'flex' }}
                                >
                                    <Title
                                        level={4}
                                        style={{
                                            marginTop: 0,
                                        }}
                                    >
                                        Thông tin cơ bản
                                    </Title>
                                    <Form form={form} name="form1">
                                        <Row gutter={[getGutter(1), getGutter(1)]}>
                                            <Col span={24}>
                                                <InputFullName />
                                            </Col>
                                            <Col span={12}>
                                                <Title level={5}>Ngày sinh</Title>
                                                <SelectBirthdate />
                                            </Col>
                                            <Col span={12}>
                                                <Title level={5}>Crew</Title>
                                                <SelectMajor />
                                            </Col>
                                            <Col span={12}>
                                                <Title level={5}>MSSV</Title>
                                                <InputStudentId />
                                            </Col>
                                            <Col span={12}>
                                                <Title level={5}>Role</Title>
                                                <SelectRole />
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5}>Chức vụ</Title>
                                                <SelectPosition />
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5}>Số Điện Thoại</Title>
                                                <InputPhone />
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5}>Email FPT</Title>
                                                <InputEmailFPT />
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5}>Email liên kết</Title>
                                                <InputPersonalEmail />
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5}>Facebook</Title>
                                                <InputFacebook />
                                            </Col>
                                            <Col span={24}>
                                                <Title level={5}>Bio</Title>
                                                <InputBio />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Space>
            )}
        </Container>
    );
};

export default EditAccount;

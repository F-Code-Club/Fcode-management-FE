import { useEffect, useState } from 'react';

import { Avatar, Col, Row, Space, Card, Typography, Button } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

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
import { UploadImage } from './components/uploadAva';
import { actions } from './slice';
import selector from './slice/selectors';
import {
    Container,
    EditButton,
    AvatarContainer,
    StyledForm,
    InfoContainer,
    Label,
    MyModal,
} from './style';

import { toastSuccess, toastError } from '@/components/ToastNotification';
import getGutter from '@/utils/getGutter';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import useTheme from '@/utils/useTheme';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

// import { EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const EditAccount = () => {
    const token = localStorageUtils.getItem('token');
    const [isUpdated, setUpdated] = useState(false);
    const dispatch = useDispatch();
    const setTheme = useTheme();
    const [form] = StyledForm.useForm();
    const avatar = useSelector(selector.avatar);
    const joinDate = useSelector(selector.joinDate);
    const role = useSelector(selector.role);
    const fullName = useSelector(selector.fullName);
    const phone = useSelector(selector.phone);
    const position = useSelector(selector.position);
    const info = useSelector(selector.info);
    const roles = useSelector(selector.roles);
    const positions = useSelector(selector.positions);
    const personalEmail = useSelector(selector.personalEmail);
    const emailFPT = useSelector(selector.emailFPT);
    const studentId = useSelector(selector.studentId);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            setTheme(false);
        }
        setAccount();
    }, []);
    const getPersonalAccount = async () => {
        const path = await productApi.getPersonalAccount(token);
        return path.data.data;
    };
    const setAccount = async () => {
        const response = await getPersonalAccount();
        dispatch(actions.setAccount(response));
        dispatch(actions.getAccount());
        setUpdated(true);
    };
    const UpdateInfo = async () => {
        dispatch(actions.getAccount());
        const response = await productApi.updateOwnAccount(info, token);
        if (response.data.code == 200) {
            toastSuccess('Sửa thông tin thành công ');
        } else {
            toastError(response.data.message);
        }
    };
    const handleFinish = () => {
        UpdateInfo();
    };

    const handleFinishFailed = () => {
        toastError(' Hãy nhập tất cả các field !!');
    };
    const confirm = () => {
        MyModal.confirm({
            maskClosable: true,
            title: 'Bạn có muốn thay đổi thông tin tài khoản?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tài khoản sau khi đổi sẽ không còn còn lưu trữ thông tin trước đó được nữa.',
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
            onOk: () => {
                form.submit();
                // openNotification();
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
                                style={{ display: 'flex', borderRadius: '10px' }}
                                className="pos-sticky"
                            >
                                <Card
                                    style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                    loading={false}
                                >
                                    <AvatarContainer>
                                        <Avatar size={160} src={avatar} />
                                        <EditButton
                                            type="primary"
                                            shape="circle"
                                            onClick={() => setLoading(true)}
                                        >
                                            <EditOutlined />
                                        </EditButton>
                                    </AvatarContainer>
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
                        <Col span={16} className="right-side">
                            <Card
                                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                loading={false}
                            >
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{ display: 'flex' }}
                                >
                                    <Title
                                        style={{
                                            marginTop: 0,
                                            fontFamily: 'Inter',
                                            fontWeight: '700px',
                                            fontSize: '16px',
                                            lineHeight: '175%',
                                            fontStyle: 'normal',
                                            color: '#000000',
                                        }}
                                    >
                                        Thông tin cơ bản
                                    </Title>
                                    <InfoContainer>
                                        <StyledForm
                                            form={form}
                                            name="form1"
                                            initialValues={{
                                                phone: phone,
                                                personalEmail: personalEmail,
                                                emailFPT: emailFPT,
                                                fullName: fullName,
                                                studentId: studentId,
                                            }}
                                            onFinish={handleFinish}
                                            onFinishFailed={handleFinishFailed}
                                        >
                                            <Row gutter={[getGutter(1), getGutter(1)]}>
                                                <Col span={24}>
                                                    <Label level={5}>Họ và tên</Label>
                                                    <InputFullName />
                                                </Col>
                                                <Col span={12}>
                                                    <Label level={5}>Ngày sinh</Label>
                                                    <SelectBirthdate />
                                                </Col>
                                                <Col span={12}>
                                                    <Label level={5}>Crew</Label>
                                                    <SelectMajor />
                                                </Col>
                                                <Col span={12}>
                                                    <Label level={5}>MSSV</Label>
                                                    <InputStudentId />
                                                </Col>
                                                <Col span={12}>
                                                    <Label level={5}>Role</Label>
                                                    <SelectRole />
                                                </Col>
                                                <Col span={24}>
                                                    <Label level={5}>Chức vụ</Label>
                                                    <SelectPosition />
                                                </Col>
                                                <Col span={24}>
                                                    <Label level={5}>Số Điện Thoại</Label>
                                                    <InputPhone />
                                                </Col>
                                                <Col span={24}>
                                                    <Label level={5}>Email FPT</Label>
                                                    <InputEmailFPT />
                                                </Col>
                                                <Col span={24}>
                                                    <Label level={5}>Email liên kết</Label>
                                                    <InputPersonalEmail />
                                                </Col>
                                                <Col span={24}>
                                                    <Label level={5}>Facebook</Label>
                                                    <InputFacebook />
                                                </Col>
                                                <Col span={24}>
                                                    <Label level={5}>Bio</Label>
                                                    <InputBio />
                                                </Col>
                                            </Row>
                                        </StyledForm>
                                    </InfoContainer>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                    <UploadImage loading={loading} setLoading={setLoading} />
                </Space>
            )}
        </Container>
    );
};

export default EditAccount;

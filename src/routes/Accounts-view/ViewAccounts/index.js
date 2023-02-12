import { useEffect, useState } from 'react';

import { Avatar, Col, Row, Space, Card, Typography } from 'antd';
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
import BlogTable from './components/Table';
import { actions } from './slice';
import selector from './slice/selectors';
import { Container, Titled, Header, Info } from './style';

import getGutter from '@/utils/getGutter';
import localStorageUtils from '@/utils/localStorageUtils';
import productApi from '@/utils/productApi';
import useTheme from '@/utils/useTheme';
import {
    IdcardOutlined,
    UserOutlined,
    CalendarFilled,
    PhoneFilled,
    MailFilled,
    FacebookFilled,
} from '@ant-design/icons';

// import { EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ViewAccount = () => {
    const token = localStorageUtils.getItem('token');
    const [isUpdated, setUpdated] = useState(false);
    const dispatch = useDispatch();
    const setTheme = useTheme();
    const avatar = useSelector(selector.avatar);
    const joinDate = useSelector(selector.joinDate);
    const role = useSelector(selector.role);
    const roles = useSelector(selector.roles);
    const bio = useSelector(selector.bio);
    const birthdate = useSelector(selector.birthdate);
    // const fullName = useSelector(selector.fullName);
    const studentId = useSelector(selector.studentId);
    const position = useSelector(selector.position);
    const phone = useSelector(selector.phone);
    const positions = useSelector(selector.positions);
    const personalEmail = useSelector(selector.personalEmail);
    const facebook = useSelector(selector.facebook);
    const emailFPT = useSelector(selector.emailFPT);
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
                            </Space>
                        </Col>
                        <Col span={17} className="right-side">
                            <Card style={{ width: '100%', height: '100%' }} loading={false}>
                                <Space
                                    direction="vertical"
                                    size="middle"
                                    style={{ display: 'flex' }}
                                >
                                    <Titled
                                        level={4}
                                        style={{
                                            marginTop: 0,
                                        }}
                                    >
                                        Thông tin cá nhân
                                    </Titled>

                                    <Row gutter={[getGutter(1), getGutter(1)]}>
                                        <Col span={24}>
                                            <Header>Bio</Header>
                                            <Info>{bio}</Info>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <IdcardOutlined />
                                                <Info>{studentId}</Info>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <UserOutlined />
                                                <Info>{roles[role]}</Info>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <CalendarFilled />
                                                <Info>{birthdate}</Info>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <PhoneFilled />
                                                <Info>{phone}</Info>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <MailFilled />
                                                <Info>{personalEmail}</Info>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row>
                                                <FacebookFilled />
                                                <Info>{facebook || 'Không Có'}</Info>
                                            </Row>
                                        </Col>
                                        <Col span={24}>
                                            <Header>Blog</Header>
                                            <BlogTable id={id} />
                                        </Col>
                                    </Row>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Space>
            )}
        </Container>
    );
};

export default ViewAccount;

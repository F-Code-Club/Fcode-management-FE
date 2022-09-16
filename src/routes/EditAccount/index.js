import { Col, Row, Space } from 'antd';

import { Container, HeroImage } from './style';

import getGutter from '@/utils/getGutter';

const EditAccount = () => {
    return (
        <Container>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <HeroImage />
                <Row gutter={getGutter(1)}>
                    <Col span={7}>col</Col>
                    <Col span={17}>col</Col>
                </Row>
            </Space>
        </Container>
    );
};

export default EditAccount;

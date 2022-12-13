import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;
const CommentTitle = (props) => {
    const { title, time, content } = props;
    return (
        <div>
            <Row gutter={12} align>
                <Col>
                    <Title type="secondary" level={5}>
                        {title}
                    </Title>
                </Col>
                <Col>
                    <Title disabled level={5}>
                        {time}
                    </Title>
                </Col>
            </Row>
            <Text>{content}</Text>
        </div>
    );
};

export default CommentTitle;

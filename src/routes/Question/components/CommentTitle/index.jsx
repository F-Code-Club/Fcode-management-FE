import { Typography, Row, Col } from 'antd';

const { Title, Text } = Typography;
const CommentTitle = (props) => {
    const { title, time } = props;
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
            <Text>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes
                beautifully and efficiently.
            </Text>
        </div>
    );
};

export default CommentTitle;

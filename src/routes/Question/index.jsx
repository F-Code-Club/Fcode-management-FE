import { useState, useEffect } from 'react';

import { List, Avatar, Row, Col, Typography, Modal, Input } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Link } from 'react-router-dom';

import StyledButton from './../../components/Button/index';
import CommentTitle from './components/CommentTitle';
import IconText from './components/IconText';
import ActionButton from './components/button/index';
import * as questionConfig from './question.config';
import { StyledContent, Wrapper } from './style';

import { toastSuccess, toastWarning } from '@/components/ToastNotification';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const questionContainerHeight = 705;
const { TextArea } = Input;

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [latestComments, setLatestComments] = useState([]);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [answer, setAnswer] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const fetchQuestions = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        // fetch data from randomuser.me
        await fetch('https://randomuser.me/api/?results=10')
            .then((res) => res.json())
            .then((data) => {
                setQuestions(questions.concat(data.results));
                setLoading(false);
            });
        setLatestComments(questions.slice(0, 4));
    };
    // handle for scroll
    const onScroll = (e, height) => {
        const currentScroll = Math.floor(e.currentTarget.scrollHeight - e.currentTarget.scrollTop);
        if (currentScroll === height) {
            fetchQuestions();
        }
    };
    // handle for modal
    const handleAnswerModal = () => {
        // todo: call api for answer question
        if (answer.length > 0) {
            // Toast.success('Trả lời thành công');
            console.log('selected answer: ' + selectedQuestion);
            toastSuccess(answer);
            setIsAnswerModalOpen(false);
        } else {
            toastWarning('Vui lòng nhập câu trả lời');
        }
        setAnswer('');
    };
    const handleModalCancel = () => {
        setIsAnswerModalOpen(false);
    };
    // handle for button
    const answersQuestion = (id) => {
        setSelectedQuestion(id);
        setIsAnswerModalOpen({
            ...isAnswerModalOpen,
            answerModal: true,
        });
    };
    const reportQuestion = (id) => {
        setSelectedQuestion(id);
        Modal.confirm({
            ...questionConfig.confirmModal,
            onOk: () => {
                // todo: call api for report question
                console.log('OK ' + id);
                Modal.success(questionConfig.okModal);
            },
        });
    };
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <Wrapper>
            <Row gutter={30}>
                <Col span={14}>
                    <Title level={3}>Câu hỏi chờ trả lời </Title>
                    <List itemLayout="vertical">
                        <StyledContent>
                            <VirtualList
                                data={questions}
                                height={questionContainerHeight}
                                itemHeight={300}
                                itemKey="email"
                                onScroll={(e) => onScroll(e, questionContainerHeight)}
                            >
                                {(item) => (
                                    <List.Item
                                        key={item.email}
                                        actions={[
                                            <ActionButton
                                                key="question-action-answer"
                                                type="primary"
                                                id={item.email}
                                                text="Trả lời"
                                                onClick={() => answersQuestion(item.email)}
                                            />,
                                            <ActionButton
                                                key="question-action-answer"
                                                type="danger"
                                                id={item.email}
                                                text="Báo cáo vi phạm"
                                                onClick={() => reportQuestion(item.email)}
                                            />,
                                        ]}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.picture.large} />}
                                            title={item.name.first}
                                            description={item.email}
                                        />
                                        {/* TODO: change to content when calling api */}
                                        <Text>Hello mi fen, chao ca nha iu cua kem</Text>
                                    </List.Item>
                                )}
                            </VirtualList>
                        </StyledContent>
                    </List>
                </Col>
                <Col span={10}>
                    <Title level={3}>Bình luận gần đây </Title>
                    <StyledContent height={945}>
                        <List
                            itemLayout="vertical"
                            dataSource={latestComments}
                            renderItem={(item) => (
                                <StyledContent hidePadding>
                                    <List.Item
                                        key={item.email}
                                        actions={[
                                            <IconText
                                                Icon={LikeOutlined}
                                                text="156"
                                                key="list-vertical-star-o"
                                            />,
                                            <IconText
                                                Icon={DislikeOutlined}
                                                text="156"
                                                key="list-vertical-like-o"
                                            />,
                                            <Link to="/home" key="list-vertical-message">
                                                Reply to
                                            </Link>,
                                        ]}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.picture.large} />}
                                            title={
                                                <CommentTitle
                                                    title={item.name.first}
                                                    time="2 day ago"
                                                />
                                            }
                                        />
                                        {/* TODO: change to content when calling api */}
                                    </List.Item>
                                </StyledContent>
                            )}
                        ></List>
                    </StyledContent>
                </Col>
            </Row>
            <Modal
                title="Nhập câu trả lời"
                open={isAnswerModalOpen.answerModal}
                onOk={handleAnswerModal}
                onCancel={handleModalCancel}
                footer={
                    <Row justify="center">
                        <StyledButton type="primary" onClick={handleAnswerModal}>
                            Gửi câu trả lời
                        </StyledButton>
                    </Row>
                }
            >
                <TextArea
                    showCount
                    maxLength={100}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={'Ghi câu trả lời của bạn ở đây'}
                    rows={4}
                    autoSize={{ minRows: 4, maxRows: 4 }}
                />
            </Modal>
        </Wrapper>
    );
};

export default QuestionManagement;
